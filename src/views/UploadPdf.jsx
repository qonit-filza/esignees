import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

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
    });
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
        </div>
      </section>
    </>
  );
}

export default UploadPdf;
