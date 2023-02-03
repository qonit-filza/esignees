import React, { useRef } from "react";
import SignatureCanvas from "react-signature-canvas";

const SignaturePad = () => {
  const sigPad = useRef({});

  const clear = () => {
    sigPad.current.clear();
  };

  const save = () => {
    const dataUrl = sigPad.current.toDataURL();
    console.log(dataUrl);
  };

  return (
    <div className="signature-pad">
      <div
        style={{ border: "solid", borderRadius: 10, width: 525, height: 225 }}
      >
        <SignatureCanvas
          ref={sigPad}
          canvasProps={{ width: 500, height: 200, className: "signcanvas" }}
        />
      </div>
      <button onClick={clear}>Clear</button>
      <button onClick={save}>Save</button>
    </div>
  );
};

export default SignaturePad;
