import { useSelector } from 'react-redux';
import { localeDate, localeDateTime } from '../helpers/dateHelper';

export default function DocumentInfo() {
  const { documentDetail } = useSelector((state) => state);

  return (
    <>
      <div className="overflow-y-auto scrollbar h-[80vh] pr-4">
        {documentDetail?.histories?.map((el, i) => {
          return (
            <div
              className=" mt-4 rounded-xl border-2 overflow-hidden"
              key={`histories-${i}`}
            >
              <div className="bg-sky-100 p-2 text-theme-3 tracking-wide">
                <p>{localeDate(el.createdAt)}</p>
              </div>
              <div className="flex justify-between mt-2 px-4">
                <div>
                  <p className="text-sm mb-2 text-theme-3">Title</p>
                  <p>{el.metaTitle}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm mb-2 text-theme-3">Upload Date</p>
                  <p>{localeDateTime(el.createdAt)}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm mb-2 text-theme-3">Sender</p>
                  <p>{el.User.name}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm mb-2 text-theme-3">Receiver</p>
                  <p>{el.receiver}</p>
                </div>
              </div>
              <div className="mt-2 px-4 pb-4">
                <p className="text-sm text-theme-3">Message</p>
                <p>{el.message}</p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
