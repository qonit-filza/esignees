import axios from 'axios';
import React, { useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';
const access_token = localStorage.getItem('access_token');

const SignaturePad = () => {
  const sigPad = useRef({});

  const clear = () => {
    sigPad.current.clear();
  };

  const save = async () => {
    const dataUrl = sigPad.current.toDataURL();

    const { data } = await axios.post(
      'http://localhost:3000/signatures',
      {
        signatureImage: dataUrl,
      },
      {
        headers: {
          access_token,
        },
      }
    );

    console.log(data);
  };

  return (
    <div className="signature-pad w-full">
      <div
        style={{ border: 'solid', borderRadius: 10, width: 525, height: 225 }}
      >
        <SignatureCanvas
          ref={sigPad}
          canvasProps={{ width: 500, height: 200, className: 'signcanvas' }}
        />
      </div>
      <button onClick={clear}>Clear</button>
      <button onClick={save}>Save</button>
    </div>
  );
};

export default SignaturePad;
