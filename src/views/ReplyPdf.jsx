import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const access_token = localStorage.getItem('access_token');

function ReplyPdf() {
  const { replyDocument, documentDetail } = useSelector((state) => state);
  const [formValue, setFormValue] = useState({
    message: '',
    privateKey: '',
  });
  const navigate = useNavigate();

  const handleFormOnChange = (e) => {
    let newValue = { ...formValue };
    newValue[e.target.name] = e.target.value;
    setFormValue(newValue);
  };

  const onSendPdf = async () => {
    const formData = new FormData();
    formData.append('docName', documentDetail.docName);
    formData.append('messageId', documentDetail.messageId);
    formData.append(
      'message',
      documentDetail.previousMessage + '!@#$%' + formValue.message
    );
    formData.append('privateKey', formValue.privateKey);
    formData.append('file', replyDocument, documentDetail.docName);

    const { data } = await axios.put(
      `http://localhost:3000/sents/${documentDetail.messageId}`,
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data', access_token },
      }
    );
    console.log(data);
    navigate('/inbox');
  };

  return (
    <>
      <section className=" flex w-full mt-64">
        <div className=" m-auto w-[30rem] border p-4 flex flex-col gap-5">
          <h1 className=" font-bold text-2xl mb-5">Sign document</h1>

          {/* <input type="file" onChange={handleFileChange} /> */}
          <div className="mb-6">
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
            Send
          </button>
        </div>
      </section>
    </>
  );
}

export default ReplyPdf;
