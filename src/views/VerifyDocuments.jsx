import { useState } from 'react';
import images from '../assets/img/authentication_img.png';
import NavbarPublic from '../components/NavbarPublic';
import axios from 'axios';
import { localeDateTime } from '../helpers/dateHelper';
import Footer from '../components/Footer';
import Swal from 'sweetalert2';
const access_token = localStorage.getItem('access_token');

export default function VerifyDocumentPage() {
  const [file, setFile] = useState({});
  const [results, setResults] = useState('');
  const [invalidDocError, setInvalidDocError] = useState('');

  const checkFileName = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      setResults('');
      setInvalidDocError('');
    }
  };

  const handleVerification = async () => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const { data } = await axios.post(
        'http://localhost:3000/verify-document',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data', access_token },
        }
      );
      setResults(data.detail);
    } catch (error) {
      if (error.response.status === 400) {
        setInvalidDocError(error.response.data.message);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `${error.response.data.message}`,
        });
      }
    }
  };

  return (
    <>
      <NavbarPublic />
      <div className="flex flex-col items-center justify-center h-[80vh] w-[35vw] mx-auto gap-6">
        <div className="text-center tracking-wide text-4xl">
          <p>Document Signature Verification</p>
        </div>
        <div className="w-full flex items-center justify-center">
          <img src={images} alt="" className="w-[60%]" />
        </div>

        <div className="w-full">
          <input
            onChange={checkFileName}
            type="file"
            name=""
            id="img_upload"
            className="hidden"
          />
          <label
            htmlFor="img_upload"
            className="flex rounded-full bg-white overflow-hidden border-2 items-center h-fit justify-between shadow-sm hover:bg-sky-50"
          >
            <div className="break-normal overflow-hidden px-4 text-lg">
              {!file.name ? <p>Choose Your File</p> : <p>{file.name}</p>}
            </div>
            <div className="bg-theme-3 px-3 py-2 text-white text-md">
              Upload File
            </div>
          </label>
        </div>

        {results ? (
          <button
            disabled
            className="bg-green-500 py-2 w-full rounded-full text-xl text-white tracking-wide "
          >
            Document Verified - {results.length}
            {results.length > 1 ? ' Signatures' : ' Signature'} Found
          </button>
        ) : invalidDocError ? (
          <button
            disabled
            className="bg-red-400 py-2 w-full rounded-full text-xl text-white tracking-wide"
          >
            {invalidDocError}
          </button>
        ) : (
          <button
            onClick={handleVerification}
            className="bg-green-500 py-2 w-full rounded-full text-xl text-white tracking-wide hover:bg-green-400 shadow-sm"
          >
            Verify
          </button>
        )}

        {results && (
          <div className="w-full">
            <div className=" flex flex-col justify-between px-4 w-full gap-2">
              {results.map((el) => (
                <div className={'flex flex-row w-full justify-between'}>
                  <div>Signed by {el.signedBy}</div>
                  <div> {el.signedByEmail}</div>
                  <div>{localeDateTime(el.signedDate)}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
