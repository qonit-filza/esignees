import { useState } from "react";
import images from "../assets/img/authentication_img.png";
import logo from "../assets/img/logo-3.png"

export default function VerifyDocumentPage() {
  const [fileName, setFileName] = useState("");

  const checkFileName = (e) => {
    setFileName(e.target.files[0].name);
  };
  return (
    <>
      <nav className="pt-8 pb-6 px-12 flex shadow-md items-center justify-between">
        <img src={logo} alt="esignee_logo" className="w-32 cursor-pointer"/>
        <div className="">
            <ul className="flex gap-6">
                <li className="cursor-pointer hover:font-semibold">Home</li>
                <li className="cursor-pointer hover:font-semibold">Verify Documents</li>
                <li className="cursor-pointer hover:font-semibold">Sign In</li>
            </ul>
        </div>
      </nav>
      <div className="flex flex-col items-center justify-center h-[80vh] w-[35vw] mx-auto gap-6">
        <div className="text-center tracking-wide text-4xl">
          <p>Document Signature Verification</p>
        </div>
        <div className="w-full flex items-center justify-center">
          <img src={images} alt="" className="w-[60%]"/>
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
              {!fileName ? <p>Choose Your File</p> : <p>{fileName}</p>}
            </div>
            <div className="bg-theme-3 px-3 py-2 text-white text-md">
              Upload File
            </div>
          </label>
        </div>

        <button className="bg-green-400 py-2 w-full rounded-full text-xl text-white tracking-wide hover:bg-green-300 shadow-sm">
          Verify
        </button>
      </div>
    </>
  );
}
