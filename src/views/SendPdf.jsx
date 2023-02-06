import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const access_token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjc1NTg1NDQzfQ.T4KUl26vYa5j0PXEmLjlVBQyZnBcT_SrcOw_JNX-T0g";

function SendPdf({ hideShowSendPdf, closeSendPdf }) {
  const { pdf, originalName, signedPdf } = useSelector((state) => state);

  const [formValue, setFormValue] = useState({
    email: "",
    message: "",
    privateKey: "",
  });

  const handleFormOnChange = (e) => {
    let newValue = { ...formValue };
    newValue[e.target.name] = e.target.value;
    setFormValue(newValue);
  };

  const onSendPdf = async () => {
    closeSendPdf();

    const formData = new FormData();
    formData.append('docName', originalName);
    formData.append('email', formValue.email);
    formData.append('message', formValue.message);
    formData.append('status', 'ongoing');
    formData.append('privateKey', formValue.privateKey);
    formData.append('file', signedPdf, originalName);

    const { data } = await axios.post("http://localhost:3000/sents", formData, {
      headers: { "Content-Type": "multipart/form-data", access_token },
    });
    console.log("masuk");
  };

  const handleClose = (e) => {
    if (e.target.id == "modalContainer") closeSendPdf();
  };

  if (!hideShowSendPdf) return null;

  return (
    <>
      <section
        onClick={handleClose}
        id="modalContainer"
        className=" flex items-center justify-center h-screen bg-slate-100 absolute inset-0 bg-opacity-50 z-10"
      >
        <div className="m-auto w-[30rem] border px-4 py-5 flex flex-col gap-2 bg-white rounded-xl">
          <h1 className="font-semibold text-2xl text-center">Send document</h1>

          {/* <input type="file" onChange={handleFileChange} /> */}
          <div className="mb-6">
            <label
              htmlFor="document"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Document
            </label>
            <input
              disabled
              type="text"
              id="document"
              name="document"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={originalName}
            />
            <label
              htmlFor="privateKey"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Private Key
            </label>
            <input
              type="text"
              id="privateKey"
              name="privateKey"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={formValue.privateKey}
              onChange={handleFormOnChange}
            />
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Recipient Email
            </label>
            <input
              onChange={handleFormOnChange}
              value={formValue.email}
              type="text"
              id="email"
              name="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />

            <label
              htmlFor="message"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Message
            </label>
            <input
              onChange={handleFormOnChange}
              value={formValue.message}
              type="text"
              id="message"
              name="message"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>

          <button
            onClick={onSendPdf}
            type="button"
            className="bg-theme-3 px-4 py-2 rounded-lg text-sky-50 font-semibold hover:text-white hover:bg-sky-400"
          >
            SEND
          </button>
        </div>
      </section>
    </>
  );
}

export default SendPdf;
