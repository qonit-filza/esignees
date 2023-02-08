import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import UserPreview from "./UserPreview";

export default function Navbar() {
  const navigate = useNavigate()
  const { pathname } = useLocation();
  const { documentDetail } = useSelector((state) => state.documents);

  let pageTitle =
    pathname.charAt(1).toUpperCase() + pathname.slice(2) || "Dashboard";

  let defaultClass =
    "flex justify-between items-center fixed left-[240px] right-0 mx-8 mt-6 top-2";

  if (pageTitle.includes("Upload/options")) {
    pageTitle = "Select Your Upload Options";
  }
  if (pageTitle.includes("Upload/documents")) {
    pageTitle = "Upload Your Document Here";
  }
  if (pageTitle.includes("Upload/preview")) {
    pageTitle = "Document Preview";
  }

  if (pageTitle.includes("Inbox/") || pageTitle.includes("Sent/")) {
    pageTitle = documentDetail.docName;
  }

  return (
    <>
      <section className={defaultClass}>
        <div>
          <p className="text-3xl font-semibold">{pageTitle}</p>

          {pageTitle == "Contacts" ? (
            <p>Here is the infromation about all your contacts</p>
          ) : (
            ""
          )}
          {/* <p>Here is the information about all your documents</p> */}
        </div>

        <div className="flex items-center gap-4">
          <span className="material-symbols-outlined">search</span>
          <span className="material-symbols-outlined">notifications</span>
          <div onClick={() => {navigate('/accounts')}}>
            <UserPreview />
          </div>
        </div>
      </section>
    </>
  );
}
