import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

const access_token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjc1NTg1NDQzfQ.T4KUl26vYa5j0PXEmLjlVBQyZnBcT_SrcOw_JNX-T0g';

function SendPdf() {
  const { pdf, originalName, signedPdf } = useSelector((state) => state);

  const [formValue, setFormValue] = useState({
    email: '',
    message: '',
    privateKey: '',
  });

  const handleFormOnChange = (e) => {
    let newValue = { ...formValue };
    newValue[e.target.name] = e.target.value;
    setFormValue(newValue);
  };

  const onSendPdf = async () => {
    const formData = new FormData();
    formData.append('docName', originalName);
    formData.append('email', formValue.email);
    formData.append('message', formValue.message);
    formData.append('status', 'waiting'); // completed -> self sign, completed-waiting -> with other, waiting -> request other
    formData.append('privateKey', formValue.privateKey);
    formData.append('file', signedPdf, originalName);

    const { data } = await axios.post('http://localhost:3000/sents', formData, {
      headers: { 'Content-Type': 'multipart/form-data', access_token },
    });
    console.log(data);
  };

  return (
    <>
      <section className=" flex w-full mt-64">
        <div className=" m-auto w-[30rem] border p-4 flex flex-col gap-5">
          <h1 className=" font-bold text-2xl mb-5">Send document</h1>

          {/* <input type="file" onChange={handleFileChange} /> */}
          <div className="mb-6">
            <label
              htmlFor="document"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Document
            </label>
            <input
              disabled
              type="text"
              id="document"
              name="document"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              value={originalName}
            />
            <label
              htmlFor="privateKey"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Private Key
            </label>
            <input
              type="text"
              id="privateKey"
              name="privateKey"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              value={formValue.privateKey}
              onChange={handleFormOnChange}
            />
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Recipient Email
            </label>
            <input
              onChange={handleFormOnChange}
              value={formValue.email}
              type="text"
              id="email"
              name="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />

            <label
              htmlFor="message"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Message
            </label>
            <input
              onChange={handleFormOnChange}
              value={formValue.message}
              type="text"
              id="message"
              name="message"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>

          <button
            onClick={onSendPdf}
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

export default SendPdf;
