export default function UploadOptionModal({ showState, openCloseModal }) {
  if (!showState) return null;
  return (
    <>
      <div className="absolute inset-0 bg-slate-400 flex justify-center items-center bg-opacity-50 z-10">
        <div className="bg-white w-fit h-fit shadow-lg rounded-xl flex justify-center p-6 pt-8 text-center relative">
          <button onClick={() => openCloseModal()} className="absolute top-2 right-2 text-red-400 hover:text-red-600">
            <span className="material-symbols-outlined">cancel</span>
          </button>
          <div className="cursor-pointer rounded-xl p-3 hover:bg-sky-100 hover:text-theme-3 w-32">
            <span className="text-6xl material-symbols-outlined">person</span>
            <p>Tanda Tangani Sendiri</p>
          </div>
          <div className="cursor-pointer rounded-xl p-3 hover:bg-sky-100 hover:text-theme-3 w-32">
            <span className="text-6xl material-symbols-outlined">
              group_add
            </span>
            <p>Tanda Tangan Pihak Lain</p>
          </div>
          <div className="cursor-pointer rounded-xl p-3 hover:bg-sky-100 hover:text-theme-3 w-32">
            <span className="text-6xl material-symbols-outlined">
              contact_mail
            </span>
            <p>Undang Pihak Lain</p>
          </div>
        </div>
      </div>
    </>
  );
}
