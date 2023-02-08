import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
const access_token = localStorage.getItem('access_token');

function ReplyPdf({ hideShowReplyPdf, closeReplyPdf, replyPdfType }) {
  const { replyDocument, documentDetail } = useSelector(
    (state) => state.documents
  );
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
    try {
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
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `${err.response.data.message}`,
      });
    }
  };

  const onRejectPdf = async () => {
    try {
      const { data } = await axios.put(
        `http://localhost:3000/sents/${documentDetail.messageId}/reject`,
        {
          message: documentDetail.previousMessage + '!@#$%' + formValue.message,
        },
        {
          headers: {
            access_token,
          },
        }
      );
      console.log(data);
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `${err.response.data.message}`,
      });
    }
  };

  const handleReplyReject = () => {
    if (replyPdfType === 'sign') {
      onSendPdf();
    } else {
      onRejectPdf();
    }
  };

  const handleClose = (e) => {
    if (e.target.id == 'modalContainer') closeReplyPdf();
  };

  if (!hideShowReplyPdf) return null;

  return (
    <>
      <section
        onClick={handleClose}
        id="modalContainer"
        className=" flex items-center justify-center h-screen bg-slate-100 absolute inset-0 bg-opacity-50 z-10"
      >
        <div className="m-auto w-[30rem] border px-4 py-5 flex flex-col gap-2 bg-white rounded-xl">
          <h1 className="font-semibold text-2xl text-center">
            {replyPdfType === 'sign' ? 'Send document' : 'Reject document sign'}
          </h1>

          <div className="flex flex-col gap-5">
            {replyPdfType === 'sign' && (
              <div>
                <label
                  htmlFor="privateKey"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Private Key
                </label>
                <input
                  type="text"
                  id="privateKey"
                  name="privateKey"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  value={formValue.privateKey}
                  onChange={handleFormOnChange}
                />
              </div>
            )}

            <div>
              <label
                htmlFor="message"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Message
              </label>
              <input
                onChange={handleFormOnChange}
                value={formValue.message}
                type="text"
                id="message"
                name="message"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              />
            </div>
            <button
              onClick={handleReplyReject}
              type="button"
              className={`px-4 py-2 rounded-lg text-sky-50 font-semibold hover:text-white ${
                replyPdfType === 'sign'
                  ? 'bg-theme-3 hover:bg-sky-400'
                  : 'bg-red-500 hover:bg-red-600'
              }`}
            >
              {replyPdfType === 'sign' ? 'SEND BACK' : 'REJECT'}
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default ReplyPdf;
