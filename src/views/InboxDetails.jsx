import { useState } from "react";
import DocumentInfo from "../components/DocumentInfo";
import ViewPdf from "../views/ViewPdf";
export default function DocumentDetails() {
  const [showInfo, setShowInfo] = useState(false);
  const seletView = () => {
    setShowInfo(!showInfo)
  }
  return (
    <>
      <div className="flex gap-2">
        <button onClick={() => setShowInfo(false)}  className={!showInfo ? "flex items-center border-2 px-4 py-1 rounded-xl gap-1 hover:bg-sky-100 hover:text-theme-2 bg-sky-100 text-theme-2" : "flex items-center border-2 px-4 py-1 rounded-xl gap-1 text-theme-3 hover:bg-sky-100 hover:text-theme-2" }>
          <span className="material-symbols-outlined">description</span>
          <p>Document</p>
        </button>
        <button onClick={() => setShowInfo(true)}   className={showInfo ? "flex items-center border-2 px-4 py-1 rounded-xl gap-1 hover:bg-sky-100 hover:text-theme-2 bg-sky-100 text-theme-2" : "flex items-center border-2 px-4 py-1 rounded-xl gap-1 text-theme-3 hover:bg-sky-100 hover:text-theme-2" }>
          <span className="material-symbols-outlined">lightbulb</span>
          <p>Information</p>
        </button>
      </div>

      {showInfo ? (
        <DocumentInfo/>
      ) : (
        <div className="border-2 h-[80vh] overflow-y-auto scoll mt-4 rounded-xl bg-sky-50">
          <ViewPdf />
        </div>
      )}
    </>
  );
}
