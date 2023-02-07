export default function RegisterCompany({
  showState,
  back,
  handleOnChange,
  handleSubmit,
}) {
  if (!showState) return null;
  return (
    <>
      <div className="rounded-xl flex justify-center gap-8">
        <div className="w-[24rem] flex flex-col gap-2">
          <div>
            <p className="text-sm">Company Name</p>
            <input
              onChange={(e) => {
                handleOnChange(e);
              }}
              type="text"
              id="companyName"
              className="border-2 px-3 py-2 rounded-xl w-full outline-none border-slate-300 placeholder:text-sm"
              placeholder="Enter Your Company Name"
            />
          </div>
          <div>
            <p className="text-sm">Legal Name</p>
            <input
              onChange={(e) => {
                handleOnChange(e);
              }}
              type="text"
              id="companyLegalName"
              className="border-2 px-3 py-2 rounded-xl w-full outline-none border-slate-300 placeholder:text-sm"
              placeholder="Enter Your Legal Name"
            />
          </div>

          <div>
            <p className="text-sm">Address</p>
            <textarea
              onChange={(e) => {
                handleOnChange(e);
              }}
              id="address"
              className="border-2 px-3 py-2 rounded-xl w-full outline-none border-slate-300 placeholder:text-sm h-32"
              placeholder="Enter Your Address"
            ></textarea>
          </div>
          <div>
            <p className="text-sm">Email</p>
            <input
              onChange={(e) => {
                handleOnChange(e);
              }}
              type="text"
              id="companyEmail"
              className="border-2 px-3 py-2 rounded-xl w-full outline-none border-slate-300 placeholder:text-sm"
              placeholder="Enter Your Email"
            />
          </div>

          <div>
            <p className="text-sm">Phone Number</p>
            <input
              onChange={(e) => {
                handleOnChange(e);
              }}
              type="text"
              id="companyPhoneNumber"
              className="border-2 px-3 py-2 rounded-xl w-full outline-none border-slate-300 placeholder:text-sm"
              placeholder="Enter Your Phone Number"
            />
          </div>
          <div>
            <p className="text-sm">Industry</p>
            <input
              onChange={(e) => {
                handleOnChange(e);
              }}
              type="text"
              id="industry"
              className="border-2 px-3 py-2 rounded-xl w-full outline-none border-slate-300 placeholder:text-sm"
              placeholder="Enter Your Industry"
            />
          </div>
          <div>
            <p className="text-sm">Company Size</p>
            <select
              onChange={(e) => {
                handleOnChange(e);
              }}
              id="companySize"
              className="border-2 px-3 py-2 rounded-xl w-full outline-none border-slate-300 placeholder:text-sm"
            >
              <option value="">50</option>
              <option value="">100</option>
              <option value="">200</option>
              <option value="">300</option>
            </select>
          </div>
        </div>
      </div>
      <button
        onClick={handleSubmit}
        className="bg-theme-3 rounded-xl w-[24rem] text-white font-semibold text-xl py-2 hover:bg-sky-400 shadow-md mt-4"
      >
        REGISTER COMPANY
      </button>
      <button
        onClick={back}
        className="bg-red-400 rounded-xl w-[24rem] text-white font-semibold text-xl py-2 hover:bg-red-300 shadow-md"
      >
        BACK
      </button>
    </>
  );
}
