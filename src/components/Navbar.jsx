import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import UserPreview from "./UserPreview";

export default function Navbar() {
  const { pathname } = useLocation();
  const pageTitle = pathname.charAt(1).toUpperCase() + pathname.slice(2) || 'Dashboard'

  return (
    <>
      <section className="flex justify-between items-center  fixed left-[240px] right-0 mx-6 mt-6">
        <div>
          <p className="text-3xl font-semibold">{pageTitle}</p>
          <p>Here is the information about all your documents</p>
        </div>

        <div className="flex items-center gap-4">
          <span className="material-symbols-outlined">search</span>
          <span className="material-symbols-outlined">notifications</span>
          <UserPreview />
        </div>
      </section>
    </>
  );
}
