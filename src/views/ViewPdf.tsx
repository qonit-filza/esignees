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
import React from 'react';
import Navbar from '../components/Navbar';
import { useSelector } from 'react-redux';
import { tempppp } from '../helpers/template';

function ViewPdf() {
  const designerRef = useRef<HTMLDivElement | null>(null);
  const designer = useRef<Designer | null>(null);
  const { pdf } = useSelector((state) => state);

  function customRead(input: any) {
    const fr = new FileReader();
    fr.readAsText(input);
    fr.addEventListener('load', () => {
      const res = fr.result;
      console.log(res);
    });
  }

  //! original hooks
  useEffect(() => {
    let template: Template = getTemplate();
    try {
      // const templateString = localStorage.getItem('template');
      const templateString = JSON.stringify(pdf);
      const templateJson = templateString
        ? JSON.parse(templateString)
        : getTemplate();
      checkTemplate(templateJson);
      template = templateJson as Template;
    } catch {
      localStorage.removeItem('template');
    }

    getFontsData().then((font) => {
      if (designerRef.current) {
        designer.current = new Designer({
          domContainer: designerRef.current,
          template,
        });
        designer.current.onSaveTemplate(onSaveTemplate);
      }
    });

    // return () => {
    //   if (designer.current) {
    //     designer.current.destroy();
    //   }
    // };
  }, [designerRef]);

  // useEffect(() => {
  //   //
  //   console.log(pdf);

  //   readFile(pdf, 'dataURL').then(async (basePdf) => {
  //     if (designer.current) {
  //       designer.current.updateTemplate(
  //         Object.assign(cloneDeep(renderPdf(pdf)), {
  //           basePdf,
  //         })
  //       );
  //     }
  //   });
  // }, [designerRef]);

  const onChangeBasePDF = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target && e.target.files) {
      console.log(e.target.files[0]);
      readFile(e.target.files[0], 'dataURL').then(async (basePdf) => {
        if (designer.current) {
          designer.current.updateTemplate(
            Object.assign(cloneDeep(designer.current.getTemplate()), {
              basePdf,
            })
          );
        }
      });
    }
  };

  //   const cleanRender = () => {
  //     let template: Template = tempppp;
  //     const data = JSON.stringify(tempppp);
  //     getTemplateFromJsonFile(tempppp)
  //       .then((t) => {
  //         if (designer.current) {
  //           designer.current.updateTemplate(t);
  //         }
  //       })
  //       .catch((e) => {
  //         alert(`Invalid template file.
  // --------------------------
  // ${e}`);
  //       });
  //   };

  const onViewFromServer = async () => {
    try {
      const { data } = await axios.get('http://localhost:5001/view', {
        responseType: 'blob',
      });

      const { data: data2 } = await axios.get('http://localhost:5001/view', {
        responseType: 'arraybuffer',
      });

      const data3 = Buffer.from(data2, 'binary').toString('base64');

      console.log(data);
      console.log(data3);

      readFile(data, 'dataURL').then(async (basePdf) => {
        if (designer.current) {
          designer.current.updateTemplate(
            Object.assign(cloneDeep(designer.current.getTemplate()), {
              basePdf,
            })
          );
        }
      });

      // const file = new Blob([data], { type: 'application/pdf' });

      // const fileURL = URL.createObjectURL(file);
      // window.open(fileURL);
    } catch (error) {
      console.log(error);
    }
  };

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

  const onLoadTemplate = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target && e.target.files) {
      console.log(e.target.files);
      getTemplateFromJsonFile(e.target.files[0])
        .then((t) => {
          if (designer.current) {
            designer.current.updateTemplate(t);
          }
        })
        .catch((e) => {
          alert(`Invalid template file.
--------------------------
${e}`);
        });
    }
  };

  const onDownloadTemplate = () => {
    if (designer.current) {
      downloadJsonFile(designer.current.getTemplate(), 'template');
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

  const onResetTemplate = () => {
    if (designer.current) {
      designer.current.updateTemplate(getTemplate());
      localStorage.removeItem('template');
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

  const appendSignaute = async () => {
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
          'http://localhost:5001/img-signature'
        );

        const blob = new Blob(pdf.basePdf);

        readFile(blob, 'dataURL').then(async (basePdf) => {
          if (designer.current) {
            designer.current.updateTemplate(
              Object.assign(cloneDeep(addSignature(blob, imgDataUrl)), {
                basePdf,
              })
            );
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div>
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <strong>Designer</strong>
        <span style={{ margin: '0 1rem' }}>:</span>
        <label style={{ width: 180 }}>
          Change BasePDF
          <input
            type="file"
            accept="application/pdf"
            onChange={onChangeBasePDF}
          />
        </label>
        <span style={{ margin: '0 1rem' }}>/</span>
        <label style={{ width: 180 }}>
          Load Template
          <input
            type="file"
            accept="application/json"
            onChange={onLoadTemplate}
          />
        </label>
        <span style={{ margin: '0 1rem' }}>/</span>
        <button onClick={onDownloadTemplate}>Download Template</button>
        <button onClick={cleanRenderServer}>Render server</button>
        <button onClick={appendSignaute}>add Signature</button>
        {/* <button onClick={cleanRender}>Clean render</button> */}
        <span style={{ margin: '0 1rem' }}>/</span>
        <button onClick={() => onSaveTemplate()}>Save Template</button>
        <span style={{ margin: '0 1rem' }}>/</span>
        <button onClick={onResetTemplate}>Reset Template</button>
        <span style={{ margin: '0 1rem' }}>/</span>
        <button onClick={onGeneratePDF}>Generate PDF</button>
        <button onClick={onSendPdf}>Send PDF</button>
      </header>
      <Navbar />

      <div className="m-14" ref={designerRef} />
    </div>
  );
}

export default ViewPdf;
