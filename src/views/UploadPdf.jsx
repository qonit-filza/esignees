import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

function UploadPdf() {
  const [file, setFile] = useState('');
  const navigate = useNavigate();
  const dispatcher = useDispatch();
  const { state } = useLocation();
  const { type } = state;

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
    navigate('/upload/preview', { state: { type } });
  };

  return (
    <>
      <section className="flex items-center justify-center h-[80vh]">
        <div className="w-[27rem] h-[14rem] p-4 flex flex-col gap-3 bg-white rounded-xl items-center justify-center">
          <div className="border-2 p-4 rounded-xl flex items-center justify-center">
            <input
              id="upload_pdf"
              type="file"
              onChange={handleFileChange}
              className="text-sm "
            />
          </div>
          <div></div>
          <div className="flex gap-2">
            <button
              onClick={() => {
                navigate('/upload/options');
              }}
              type="button"
              className="bg-theme-3 px-4 py-1 rounded-lg text-white hover:text-theme-2 hover:bg-sky-400"
            >
              Back
            </button>
            <button
              onClick={navigateRenderPdf}
              type="button"
              className="bg-theme-3 px-4 py-1 rounded-lg text-white hover:text-theme-2 hover:bg-sky-400"
            >
              Next
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default UploadPdf;
