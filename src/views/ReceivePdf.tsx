import { useEffect, useRef, useState } from 'react';
import { Designer, Template, checkTemplate } from '@pdfme/ui';
import { generate } from '@pdfme/generator';
import ReplyPdf from '../components/ReplyPdf';
import { getTemplate, cloneDeep } from '../helpers/pdfHelper';
import axios from 'axios';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toDataURL } from '../helpers/imageHelper.js';
import { toast } from 'react-toastify';
const baseUrl = 'https://api-esignees.ghzytp.site';
const access_token = localStorage.getItem('access_token');

function ReceivePdf() {
  const designerRef = useRef<HTMLDivElement | null>(null);
  const designer = useRef<Designer | null>(null);
  const { documentDetail } = useSelector((state: any) => state.documents);
  const dispatcher = useDispatch();
  const [pdfLoad, setPdfLoad] = useState('');

  let showActionButton;
  const { page, isCompleted, isRejected } = documentDetail;

  if (page === 'inbox') {
    showActionButton = isCompleted || isRejected ? false : true;
  } else {
    showActionButton = false;
  }

  useEffect(() => {
    if (!pdfLoad) return;
    let template: Template = getTemplate();
    try {
      const pdfReceived = {
        schemas: [],
        basePdf: pdfLoad,
      };

      const templateString = JSON.stringify(pdfReceived);
      const templateJson = templateString
        ? JSON.parse(templateString)
        : getTemplate();
      checkTemplate(templateJson);
      template = templateJson as Template;
    } catch {
      localStorage.removeItem('template');
    }

    if (designerRef.current) {
      designer.current = new Designer({
        domContainer: designerRef.current,
        template,
      });
    }
  }, [pdfLoad]);

  useEffect(() => {
    cleanRenderServer();
  }, [documentDetail]);

  function blobToDataURL(blob: Blob, callback: Function) {
    var a = new FileReader();
    a.onload = function (e) {
      callback(e.target?.result);
    };
    a.readAsDataURL(blob);
  }

  const cleanRenderServer = async () => {
    try {
      if (!documentDetail?.documentId) return;
      const { data } = await axios.get(
        `${baseUrl}/documents/${documentDetail.documentId}`,
        {
          headers: {
            access_token,
          },
          responseType: 'blob',
        }
      );

      blobToDataURL(data, (dataURL: string) => {
        setPdfLoad(dataURL);
      });
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  const downloadFile = async () => {
    try {
      if (!documentDetail?.documentId) return;

      const { data } = await axios.get(
        `${baseUrl}/documents/${documentDetail.documentId}`,
        {
          responseType: 'blob',
          headers: {
            access_token,
          },
        }
      );

      const file = new Blob([data], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  //generate visual signed docs and store on redux
  const onSendPdf = async () => {
    if (designer.current) {
      const template = designer.current.getTemplate();
      const inputs = template.sampledata ?? [];
      // const font = await getFontsData();
      const pdf = await generate({ template, inputs, options: {} });
      const blob = new Blob([pdf.buffer], { type: 'application/pdf' });

      dispatcher({
        type: 'pdf/setReplyDocument',
        payload: blob,
      });

      // navigate('/reply');
      handleReplyPdf();
    }
  };

  const onAppendSignature = async () => {
    if (designer.current) {
      try {
        const { data } = await axios.get(`${baseUrl}/signatures`, {
          headers: {
            access_token,
          },
        });

        toDataURL(data.signature, (dataUrl: string) => {
          if (designer.current) {
            designer.current.updateTemplate(
              Object.assign(cloneDeep(designer.current.getTemplate()), {
                schemas: [
                  {
                    signature: {
                      type: 'image',
                      position: { x: 90, y: 100 },
                      width: 45,
                      height: 30,
                    },
                  },
                ],
                sampledata: [{ signature: dataUrl }],
                columns: ['signature'],
              })
            );
          }
        });
      } catch (error: any) {
        toast.error(error.response.data.message);
      }
    }
  };

  const [showReplyPdf, setShowReplyPdf] = useState(false);
  const [replyPdfType, setReplyPdfType] = useState('sign');

  const handleReplyPdf = () => {
    setReplyPdfType('sign');
    setShowReplyPdf(!showReplyPdf);
  };

  const handleRejectPdf = () => {
    setReplyPdfType('reject');
    setShowReplyPdf(!showReplyPdf);
  };

  return (
    <div>
      <div className=" mx-14 mt-14 mb-4 flex justify-end">
        {showActionButton && (
          <button
            onClick={onAppendSignature}
            type="button"
            className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
          >
            Add Signature
          </button>
        )}

        <button
          onClick={downloadFile}
          type="button"
          className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
        >
          Download
        </button>

        {showActionButton && (
          <>
            <button
              onClick={handleRejectPdf}
              type="button"
              className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 "
            >
              Reject
            </button>

            <button
              onClick={onSendPdf}
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 "
            >
              Send Back
            </button>
          </>
        )}
      </div>
      <div className="m-14 mt-0" ref={designerRef} />
      <ReplyPdf
        hideShowReplyPdf={showReplyPdf}
        closeReplyPdf={handleReplyPdf}
        replyPdfType={replyPdfType}
      />
    </div>
  );
}

export default ReceivePdf;
