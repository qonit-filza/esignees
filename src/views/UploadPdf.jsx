import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import Navbar from '../components/Navbar';

function UploadPdf() {
  const navigate = useNavigate();

  const [file, setFile] = useState('');
  const [formVal, setFormVal] = useState({
    publicKey: '',
    signature: '',
  });
  const [signature, setSignature] = useState('');
  const dispatcher = useDispatch();
  const { pdf } = useSelector((state) => state);

  useEffect(() => {
    if (!file) return;
    blobToDataURL(file, (res) => {
      dispatcher({
        type: 'pdf/setPdf',
        payload: res,
      });
    });
  }, [file]);

  const handleFormOnChange = (e) => {
    const newValue = { ...formVal };
    newValue[e.target.name] = e.target.value;
    setFormVal(newValue);
  };

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleFileOnUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('name', 'dokumen');
      formData.append('file', file);

      console.log(formData);

      const { data } = await axios.post(
        'http://localhost:5001/upload',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const uploadAndSign = async () => {
    try {
      const formData = new FormData();
      formData.append('name', 'dokumen');
      formData.append('file', file);

      console.log(formData);

      const { data } = await axios.post(
        'http://localhost:5001/sign-pdf',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );
      console.log(data);
      setSignature(data);
    } catch (error) {
      console.log(error);
    }
  };

  const verifyPdf = async () => {
    try {
      const formData = new FormData();
      formData.append('name', 'dokumen');
      formData.append('file', file);

      const { data } = await axios.post(
        'http://localhost:5001/verify-pdf',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const verifyPdfWithBody = async () => {
    try {
      const formData = new FormData();
      formData.append('publicKey', formVal.publicKey);
      formData.append('signature', formVal.signature);
      formData.append('file', file);

      const { data } = await axios.post(
        'http://localhost:5001/verify-pdf-with-body',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDownload = async () => {
    const { data } = await axios.get('http://localhost:5001/view', {
      responseType: 'blob',
    });

    const file = new Blob([data], { type: 'application/pdf' });

    const fileURL = URL.createObjectURL(file);
    window.open(fileURL);
  };

  function blobToDataURL(blob, callback) {
    var a = new FileReader();
    a.onload = function (e) {
      callback(e.target?.result);
    };
    a.readAsDataURL(blob);
  }

  const navigateRenderPdf = () => {
    // blobToDataURL(file, (res) => {
    //   console.log(res);
    //   dispatcher({
    //     type: 'pdf/setPdf',
    //     payload: res,
    //   });
    // });

    navigate('/render');
  };

  return (
    <>
      <Navbar />
      <section className=" flex w-screen h-screen">
        <div className=" m-auto w-1/2 border p-4">
          <h1 className=" mx-auto pb-10 font-bold text-2xl">Upload Document</h1>

          <input type="file" onChange={handleFileChange} />

          <form>
            <input
              onChange={handleFormOnChange}
              value={formVal.publicKey}
              type="text"
              name="publicKey"
              placeholder="publicKey"
            ></input>
            <input
              onChange={handleFormOnChange}
              value={formVal.signature}
              type="text"
              name="signature"
              placeholder="signature"
            ></input>
          </form>

          {/* <div>{file && `${file.name} - ${file.type}`}</div> */}

          <button
            className=" border bg-black text-white px-2 py-2 rounded-full mt-5 w-36 hover:bg-gray-500"
            onClick={navigateRenderPdf}
          >
            Next
          </button>

          <button onClick={verifyPdfWithBody}>verify</button>
          {/* <button onClick={handleDownload}>View</button> */}

          {/* {signature && (
          <div className=" flex w-96 flex-wrap border overflow-y-auto">
            <div className=" border w-48">{signature.signature}</div>
          </div>
        )} */}
        </div>
      </section>
    </>
  );
}

export default UploadPdf;
