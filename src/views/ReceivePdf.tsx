import { useEffect, useRef, useState } from 'react';
import { Designer, Template, checkTemplate } from '@pdfme/ui';
import { generate } from '@pdfme/generator';
import ReplyPdf from '../components/ReplyPdf';
import {
  getFontsData,
  getTemplate,
  readFile,
  cloneDeep,
  getTemplateFromJsonFile,
  downloadJsonFile,
  renderPdf,
  addSignature,
} from '../helpers/pdfHelper';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { toDataURL } from '../helpers/imageHelper.js'; //!fix later
import { useNavigate } from 'react-router-dom';
const access_token = localStorage.getItem('access_token');

function ReceivePdf() {
  const designerRef = useRef<HTMLDivElement | null>(null);
  const designer = useRef<Designer | null>(null);
  const { pdf, originalName } = useSelector((state: any) => state);
  const dispatcher = useDispatch();
  const navigate = useNavigate();
  const { documentDetail } = useSelector((state: any) => state);
  const [isLoading, setIsLoading] = useState(true);
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
        `http://localhost:3000/documents/${documentDetail.documentId}`,
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
    } catch (error) {
      console.log(error);
    }
  };

  const downloadFile = async () => {
    try {
      if (!documentDetail?.documentId) return;

      const { data } = await axios.get(
        `http://localhost:3000/documents/${documentDetail.documentId}`,
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
    } catch (error) {
      console.log(error);
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

  const onSaveTemplate = (template?: Template) => {
    if (designer.current) {
      localStorage.setItem(
        'template',
        JSON.stringify(template || designer.current.getTemplate())
      );
      alert('Saved!');
    }
  };

  const onGeneratePDF = async () => {
    if (designer.current) {
      const template = designer.current.getTemplate();
      const inputs = template.sampledata ?? [];
      // const font = await getFontsData();
      const pdf = await generate({ template, inputs, options: {} });
      const blob = new Blob([pdf.buffer], { type: 'application/pdf' });
      // console.log(pdf);
      console.log(originalName);

      // customRead(blob);

      window.open(URL.createObjectURL(blob));
    }
  };

  const onSendPdf2 = async () => {
    if (designer.current) {
      const template = designer.current.getTemplate();
      const inputs = template.sampledata ?? [];
      // const font = await getFontsData();
      const pdf = await generate({ template, inputs, options: {} });
      const blob = new Blob([pdf.buffer], { type: 'application/pdf' });

      const formData = new FormData();
      formData.append('docName', originalName);
      formData.append('file', blob, originalName);

      const { data } = await axios.post(
        'http://localhost:5001/sign-pdf',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );
      console.log(data);
    }
  };

  const onAppendSignature = async () => {
    if (designer.current) {
      try {
        // const { data } = await axios.get('http://localhost:5001/view', {
        //   responseType: 'blob',
        // });

        // const { data: img } = await axios.get(
        //   'http://localhost:5001/img-signature',
        //   {
        //     responseType: 'blob',
        //   }
        // );

        // let imgDataUrl = '';
        // blobToDataURL(img, (res: string) => {
        //   imgDataUrl = res;
        // });

        // const { data: imgDataUrl } = await axios.get(
        //   'http://localhost:5001/signature-dataurl'
        // );

        const { data } = await axios.get('http://localhost:3000/signatures', {
          headers: {
            access_token,
          },
        });

        toDataURL(data.signature, (dataUrl: string) => {
          //*works-2
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

        //*works
        // if (designer.current) {
        //   designer.current.updateTemplate(
        //     Object.assign(cloneDeep(addSignature(pdf.basePdf, imgDataUrl)))
        //   );
        // }

        //*experimental
        // if (designer.current) {
        //   const newTemplate = cloneDeep(designer.current.getTemplate());
        //   const emptyObjIndex = newTemplate.sampledata.find((el: object) => {
        //     return !Object.keys(el).length;
        //   });
        //   newTemplate.sampledata.splice(emptyObjIndex, 1);
        //   console.log({ previous: newTemplate });

        //   newTemplate.columns?.push('signature');

        //   // if (newTemplate.sampledata.length === 1) {
        //   //   newTemplate.sampledata = [{ signature: imgDataUrl }];
        //   // } else {
        //   newTemplate.sampledata?.push({ signature: imgDataUrl });
        //   // }

        //   newTemplate.schemas?.push({
        //     signature: {
        //       type: 'image',
        //       position: { x: 90, y: 100 },
        //       width: 24.15,
        //       height: 37.42,
        //     },
        //   });

        //   console.log({ new: newTemplate });

        //   designer.current.updateTemplate(newTemplate);
        // }

        // console.log(pdf.basePdf);

        // const blob = new Blob(pdf.basePdf);

        // readFile(blob, 'dataURL').then(async (basePdf) => {
        //   if (designer.current) {
        //     designer.current.updateTemplate(
        //       Object.assign(cloneDeep(addSignature(blob, imgDataUrl)), {
        //         basePdf,
        //       })
        //     );
        //   }
        // });
      } catch (error) {
        console.log(error);
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
