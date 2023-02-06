import { useNavigate } from 'react-router-dom';

export default function UploadOption() {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex justify-center items-center h-[80vh]">
        <div className=" w-fit h-fit border-2 rounded-xl flex justify-center p-6 text-center ">
          <div
            onClick={() => {
              navigate('/upload/documents', { state: { type: 'selfSign' } });
            }}
            className="cursor-pointer rounded-xl p-3 hover:bg-sky-100 hover:text-theme-3 w-32"
          >
            <span className="text-6xl material-symbols-outlined">person</span>
            <p>Tanda Tangani Sendiri</p>
          </div>
          <div
            onClick={() => {
              navigate('/upload/documents', { state: { type: 'signRequest' } });
            }}
            className="cursor-pointer rounded-xl p-3 hover:bg-sky-100 hover:text-theme-3 w-32"
          >
            <span className="text-6xl material-symbols-outlined">
              group_add
            </span>
            <p>Tanda Tangan Pihak Lain</p>
          </div>
          <div
            onClick={() => {
              navigate('/upload/documents', {
                state: { type: 'signWithOther' },
              });
            }}
            className="cursor-pointer rounded-xl p-3 hover:bg-sky-100 hover:text-theme-3 w-32"
          >
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
