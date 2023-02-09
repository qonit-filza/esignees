import { useEffect, useState } from 'react';
import axios from 'axios';
import React, { useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { toast } from 'react-toastify';
// const baseUrl = 'http://localhost:3000';
const baseUrl = 'https://api-esignees.ghzytp.site';

const access_token = localStorage.getItem('access_token');

function ModalEditSignature({
  hideShowEditSignature,
  closeEditSignature,
  editSignatureType,
  refetchUser,
}) {
  const sigPad = useRef({});
  const [isDrawSign, setIsDrawSign] = useState(false);
  const [file, setFile] = useState('');

  const clear = () => {
    sigPad.current.clear();
  };

  const save = () => {
    if (isDrawSign) {
      if (editSignatureType === 'Add') {
        addSignature();
      } else {
        editSignature();
      }
    } else {
      if (editSignatureType === 'Add') {
        uploadSignature();
      } else {
        uploadEditSignature();
      }
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const addSignature = async () => {
    try {
      const dataUrl = sigPad.current.toDataURL();

      const { data } = await axios.post(
        `${baseUrl}/signatures`,
        {
          signatureImage: dataUrl,
        },
        {
          headers: {
            access_token,
          },
        }
      );

      await refetchUser();
      closeEditSignature();
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const editSignature = async () => {
    try {
      const dataUrl = sigPad.current.toDataURL();

      const { data } = await axios.put(
        `${baseUrl}/signatures`,
        {
          signatureImage: dataUrl,
        },
        {
          headers: {
            access_token,
          },
        }
      );

      await refetchUser();
      closeEditSignature();
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const uploadSignature = async () => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const { data } = await axios.post(
        `${baseUrl}/signatures/upload`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data', access_token },
        }
      );

      await refetchUser();
      closeEditSignature();
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const uploadEditSignature = async () => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const { data } = await axios.put(
        `${baseUrl}/signatures/upload`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data', access_token },
        }
      );

      await refetchUser();
      closeEditSignature();
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleClose = (e) => {
    if (e.target.id == 'modalContainer') closeEditSignature();
  };

  if (!hideShowEditSignature) return null;

  return (
    <>
      <section
        onClick={handleClose}
        id="modalContainer"
        className=" flex items-center justify-center h-screen bg-slate-100 absolute inset-0 bg-opacity-50 z-10"
      >
        <div className="m-auto w-[35rem] border px-4 py-5 flex flex-col gap-2 bg-white rounded-xl">
          <div className=" flex flex-row gap-2">
            <h1
              className="
          font-semibold text-2xl text-center my-auto
          "
            >
              {editSignatureType} Signature
            </h1>
            <span
              onClick={() => setIsDrawSign(!isDrawSign)}
              className=" my-auto cursor-pointer
            bg-gray-400 rounded-full text-xs text-white px-2 py-1
            "
            >
              {isDrawSign ? 'Change to upload' : 'Change to draw'}
            </span>
          </div>

          {isDrawSign ? (
            <div className=" relative">
              <div
                style={{
                  border: 'solid',
                  borderRadius: 10,
                  width: 525,
                  height: 225,
                }}
              >
                <SignatureCanvas
                  ref={sigPad}
                  canvasProps={{
                    width: 500,
                    height: 200,
                    className: 'signcanvas',
                  }}
                />
              </div>

              <button
                className=" absolute top-2 right-2 bg-gray-400 rounded-full text-xs text-white px-2 py-1"
                onClick={clear}
              >
                Clear
              </button>
            </div>
          ) : (
            <div className="border-2 w-full p-2 rounded-xl mt-2 border-theme-1">
              <input onChange={handleFileChange} type="file" />
            </div>
          )}

          <div className="flex flex-col gap-5">
            <button
              onClick={save}
              type="button"
              className="px-4 py-2 rounded-lg text-sky-50 font-semibold hover:text-white bg-theme-3 hover:bg-sky-400 mt-2"
            >
              SAVE
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default ModalEditSignature;
