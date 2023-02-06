import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import SendPdf from "./SendPdf";
// import axios from 'axios';
// import { toDataURL } from '../helpers/imageHelper';

function UploadPdf({ showFromState, backToOption }) {
  const [file, setFile] = useState("");
  const navigate = useNavigate();
  const dispatcher = useDispatch();

  useEffect(() => {
    if (!file) return;
    blobToDataURL(file, (res) => {
      dispatcher({
        type: "pdf/setPdf",
        payload: res,
      });

      dispatcher({
        type: "pdf/setOriginalName",
        payload: file.name.replace(".pdf", ""),
      });
    });

    const date = new Date();

    console.log(date.toLocaleString("ID-id"));
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
    navigate("/upload/preview");
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
              onClick={() => {navigate('/upload/options')}}
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
