import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const imageMimeType = /image\/(png|jpg|jpeg)/i;

export default function RegisterUser({
  showState,
  handleOnChange,
  handleOnChangeKtp,
  handleSubmitUser,
}) {
  const [ktpImg, setKtpImg] = useState(null);
  const [ktpDataURL, setKtpDataURL] = useState(null);

  const changeHandler = (e) => {
    const file = e.target.files[0];
    if (!file.type.match(imageMimeType)) {
      alert("Image mime type is not valid");
      return;
    }
    setKtpImg(file);
  };

  useEffect(() => {
    let fileReader,
      isCancel = false;
    if (ktpImg) {
      fileReader = new FileReader();
      fileReader.onload = (e) => {
        const { result } = e.target;
        if (result && !isCancel) {
          setKtpDataURL(result);
        }
      };
      fileReader.readAsDataURL(ktpImg);
    }
    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    };
  }, [ktpImg]);

  if(showState) return null
  return (
    <>
      <div className="rounded-xl flex justify-center gap-8">
        <div className="w-[24rem] flex flex-col gap-2">
          <div>
            <p className="text-sm">Full Name</p>
            <input
              onChange={(e) => {
                handleOnChange(e);
              }}
              type="text"
              id="name"
              className="border-2 px-3 py-2 rounded-xl w-full outline-none border-slate-300 placeholder:text-sm"
              placeholder="Enter Your Full Name"
            />
          </div>
          <div>
            <p className="text-sm">NIK</p>
            <input
              onChange={(e) => {
                handleOnChange(e);
              }}
              type="text"
              id="ktpId"
              className="border-2 px-3 py-2 rounded-xl w-full outline-none border-slate-300 placeholder:text-sm"
              placeholder="NIK"
            />
          </div>

          <div>
            <p className="text-sm">Email</p>
            <input
              onChange={(e) => {
                handleOnChange(e);
              }}
              type="text"
              id="email"
              className="border-2 px-3 py-2 rounded-xl w-full outline-none border-slate-300 placeholder:text-sm"
              placeholder="Enter Your Email"
            />
          </div>
          <div>
            <p className="text-sm">Job Title</p>
            <input
              onChange={(e) => {
                handleOnChange(e);
              }}
              type="text"
              id="jobTitle"
              className="border-2 px-3 py-2 rounded-xl w-full outline-none border-slate-300 placeholder:text-sm"
              placeholder="Enter Your Job Title"
            />
          </div>

          <div>
            <p className="text-sm">Phone Number</p>
            <input
              onChange={(e) => {
                handleOnChange(e);
              }}
              type="text"
              id="phone"
              className="border-2 px-3 py-2 rounded-xl w-full outline-none border-slate-300 placeholder:text-sm"
              placeholder="Enter Your Phone Number"
            />
          </div>
          <div>
            <p className="text-sm">Password</p>
            <input
              onChange={(e) => {
                handleOnChange(e);
              }}
              type="password"
              id="password"
              className="border-2 px-3 py-2 rounded-xl w-full outline-none border-slate-300 placeholder:text-sm"
              placeholder="Enter Your Password"
            />
          </div>
          <div>
            <p className="text-sm">Invite Code</p>
            <input
              onChange={(e) => {
                handleOnChange(e);
              }}
              type="text"
              id="companyInviteCode"
              className="border-2 px-3 py-2 rounded-xl w-full outline-none border-slate-300 placeholder:text-sm"
              placeholder="Enter Your Invite Code (optional)"
            />
          </div>
        </div>
        <div className="w-[24rem] flex flex-col gap-2">
          <div className="mt-2">
            <input
              onChange={(e) => {
                changeHandler(e);
                handleOnChangeKtp(e);
              }}
              type="file"
              id="ktpPic"
              className="hidden"
              accept="image/*"
            />
            <label
              htmlFor="ktpPic"
              className="bg-theme-3 px-4 py-1 rounded-xl text-white hover:bg-sky-400 mt-2"
            >
              Upload KTP
            </label>
            {ktpDataURL ? (
              <div className="border-2 mt-4 h-60 rounded-xl p-1">
                <div className="rounded-xl overflow-hidden h-full">
                  <img src={ktpDataURL} alt="preview" className="mx-auto" />
                </div>
              </div>
            ) : (
              <div className="border-2 mt-4 rounded-xl h-60 flex items-center justify-center">
                KTP
              </div>
            )}
          </div>
        </div>
      </div>
      <button
        onClick={handleSubmitUser}
        className="bg-theme-3 rounded-xl w-[50rem] text-white font-semibold text-xl py-2 hover:bg-sky-400 shadow-md mt-4"
      >
        REGISTER USER
      </button>
    </>
  );
}
