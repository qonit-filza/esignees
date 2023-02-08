import { useEffect, useRef, useState } from 'react';
import { Designer, Template, checkTemplate } from '@pdfme/ui';
import { generate } from '@pdfme/generator';
import SendPdf from './SendPdf';
import { getTemplate, cloneDeep } from '../helpers/pdfHelper';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { toDataURL } from '../helpers/imageHelper.js';
import { useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import React from 'react';
const access_token = localStorage.getItem('access_token');

function ViewPdf() {
  const designerRef = useRef<HTMLDivElement | null>(null);
  const designer = useRef<Designer | null>(null);
  const { pdf } = useSelector((state: any) => state.documents);
  const dispatcher = useDispatch();
  const { state } = useLocation();
  const { type } = state;

  useEffect(() => {
    let template: Template = getTemplate();
    try {
      const templateString = JSON.stringify(pdf);
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
      designer.current.onSaveTemplate(onSaveTemplate);
    }

    // return () => {
    //   if (designer.current) {
    //     designer.current.destroy();
    //   }
    // };
  }, [designerRef]);

  const onSaveTemplate = (template?: Template) => {
    if (designer.current) {
      localStorage.setItem(
        'template',
        JSON.stringify(template || designer.current.getTemplate())
      );
      alert('Saved!');
    }
  };

  //generate visual signed docs and store on redux
  const onSendPdf = async () => {
    if (designer.current) {
      const template = designer.current.getTemplate();
      const inputs = template.sampledata ?? [];
      // const font = await getFontsData();
      console.log(template);
      const pdf = await generate({ template, inputs });
      console.log(pdf);
      const blob = new Blob([pdf.buffer], { type: 'application/pdf' });

      dispatcher({
        type: 'pdf/setSignedPdf',
        payload: blob,
      });

      // navigate('/send');
      handleSendPdf();
    }
  };

  const onAppendSignature = async () => {
    if (designer.current) {
      try {
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
      } catch (error) {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `${error.response.data.message}`,
        });
      }
    }
  };

  const [showSendPdf, setShowSendPdf] = useState(false);

  const handleSendPdf = () => {
    setShowSendPdf(!showSendPdf);
  };

  return (
    <div className="h-[80vh] overflow-y-auto rounded-xl border-2 ">
      <SendPdf
        hideShowSendPdf={showSendPdf}
        closeSendPdf={handleSendPdf}
        type={type}
      />
      <div className=" mx-14 mt-14 mb-4 flex justify-end">
        {(type === 'selfSign' || type === 'signWithOther') && (
          <button
            onClick={onAppendSignature}
            type="button"
            className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
          >
            Add Signature
          </button>
        )}
        <button
          onClick={onSendPdf}
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 "
        >
          Send
        </button>
      </div>
      <div className="m-14 mt-0" ref={designerRef} />
    </div>
  );
}

export default ViewPdf;
