import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// import axios from 'axios';
// import { toDataURL } from '../helpers/imageHelper';

function UploadPdf() {
  const [file, setFile] = useState('');
  const navigate = useNavigate();
  const dispatcher = useDispatch();

  useEffect(() => {
    if (!file) return;
    blobToDataURL(file, (res) => {
      dispatcher({
        type: 'pdf/setPdf',
        payload: res,
      });

      dispatcher({
        type: 'pdf/setOriginalName',
        payload: file.name.replace('.pdf', ''),
      });
    });

    const date = new Date();

    console.log(date.toLocaleString('ID-id'));
  }, [file]);

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  function blobToDataURL(blob, callback) {
    var a = new FileReader();
    a.onload = function (e) {
      callback(e.target?.result);
    };
    a.readAsDataURL(blob);
  }

  const navigateRenderPdf = () => {
    navigate('/render');
  };

  // const testButton = async () => {
  //   try {
  //     const { data } = await axios.get('http://localhost:3000/signatures', {
  //       headers: {
  //         access_token:
  //           'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjc1NTEwOTE5fQ.r44hV91Xu1HXoNCzHFHJpZEuEDX63lUX2M5O7ipGkMs',
  //       },
  //     });
  //     toDataURL(data.signature, (dataUrl) => console.log(dataUrl));
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <>
      <section className=" flex w-full mt-64">
        <div className=" m-auto w-[30rem] border p-4 flex flex-col gap-5">
          <h1 className=" font-bold text-2xl mb-5">Upload Document</h1>

          <input type="file" onChange={handleFileChange} />

          <button
            onClick={navigateRenderPdf}
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 w-20 "
          >
            Next
          </button>

          {/* <button
            onClick={testButton}
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 w-20 "
          >
            Test
          </button> */}
        </div>
      </section>
    </>
  );
}

export default UploadPdf;
