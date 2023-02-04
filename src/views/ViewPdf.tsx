import { useEffect, useRef } from 'react';
import { Designer, Template, checkTemplate } from '@pdfme/ui';
import { generate } from '@pdfme/generator';
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
import { useSelector } from 'react-redux';

function ViewPdf() {
  const designerRef = useRef<HTMLDivElement | null>(null);
  const designer = useRef<Designer | null>(null);
  const { pdf } = useSelector((state: any) => state);

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

  function blobToDataURL(blob: Blob, callback: Function) {
    var a = new FileReader();
    a.onload = function (e) {
      callback(e.target?.result);
    };
    a.readAsDataURL(blob);
  }

  const cleanRenderServer = async () => {
    try {
      const { data } = await axios.get('http://localhost:5001/view', {
        responseType: 'blob',
      });

      readFile(data, 'dataURL').then(async (basePdf) => {
        if (designer.current) {
          designer.current.updateTemplate(
            Object.assign(cloneDeep(renderPdf(data)), {
              basePdf,
            })
          );
        }
      });
    } catch (error) {
      console.log(error);
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
      console.log(blob);

      // customRead(blob);

      window.open(URL.createObjectURL(blob));
    }
  };

  const onSendPdf = async () => {
    if (designer.current) {
      const template = designer.current.getTemplate();
      const inputs = template.sampledata ?? [];
      // const font = await getFontsData();
      const pdf = await generate({ template, inputs, options: {} });
      const blob = new Blob([pdf.buffer], { type: 'application/pdf' });

      const formData = new FormData();
      formData.append('name', 'dokumen');
      formData.append('file', blob);

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

        const { data: imgDataUrl } = await axios.get(
          'http://localhost:5001/signature-dataurl'
        );

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
              sampledata: [{ signature: imgDataUrl }],
              columns: ['signature'],
            })
          );
        }

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

  return (
    <div>
      <div className=" mx-14 mt-14 mb-4 flex justify-end">
        <button
          onClick={onAppendSignature}
          type="button"
          className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
        >
          Add Signature
        </button>
        <button
          onClick={onGeneratePDF}
          type="button"
          className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
        >
          Download
        </button>
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
