import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import logo from "../assets/img/logo-3.png";
import UploadOptionModal from "./UploadOptionModal";

export default function Sidebar() {
  const activeClass = "border-r-[3px] border-r-theme-3 font-semibold w-full";
  const [showUploadModal, setShowUploadModal] = useState(false);

  const handleModal = () => {
    setShowUploadModal(!showUploadModal);
  };

  return (
    <>
      <UploadOptionModal
        showState={showUploadModal}
        openCloseModal={handleModal}
      />
      <section className="w-[240px] pl-8 top-3 fixed ">
        <div className="mt-8">
          <img src={logo} alt="esignee_logo" className="w-32" />
        </div>
        <div className="border-r-2 h-[88vh] flex flex-col justify-between pb-8">
          <div>
            <div className="my-6">
              <button
                onClick={() => handleModal()}
                className="bg-blue-500 hover:bg-blue-400 text-white rounded-lg px-4 py-2 shadow-md"
              >
                Upload Document
              </button>
            </div>

            <ul className="flex flex-col gap-3">
              <NavLink
                to="/organization"
                className={({ isActive }) =>
                  isActive
                    ? activeClass
                    : "hover:border-r-[3px] hover:border-r-theme-3 focus:font-semibold hover:font-semibold w-full"
                }
              >
                <li className="flex items-center gap-2 cursor-pointer ">
                  <span className="material-symbols-outlined">
                    corporate_fare
                  </span>
                  Organization
                </li>
              </NavLink>
              <NavLink
                to="/contacts"
                className={({ isActive }) =>
                  isActive
                    ? activeClass
                    : "hover:border-r-[3px] hover:border-r-theme-3 focus:font-semibold hover:font-semibold w-full"
                }
              >
                <li className="flex items-center gap-2 cursor-pointer">
                  <span className="material-symbols-outlined">
                    contact_mail
                  </span>
                  Contacts
                </li>
              </NavLink>
              <NavLink
                to="/inbox"
                className={({ isActive }) =>
                  isActive
                    ? activeClass
                    : "hover:border-r-[3px] hover:border-r-theme-3 focus:font-semibold hover:font-semibold w-full"
                }
              >
                <li className="flex items-center gap-2 cursor-pointer">
                  <span className="material-symbols-outlined">all_inbox</span>
                  Inbox
                </li>
              </NavLink>
              <NavLink
                to="/sent"
                className={({ isActive }) =>
                  isActive
                    ? activeClass
                    : "hover:border-r-[3px] hover:border-r-theme-3 focus:font-semibold hover:font-semibold w-full"
                }
              >
                <li className="flex items-center gap-2 cursor-pointer">
                  <span className="material-symbols-outlined">send</span>
                  Sent
                </li>
              </NavLink>
              <NavLink
                to="/settings"
                className={({ isActive }) =>
                  isActive
                    ? activeClass
                    : "hover:border-r-[3px] hover:border-r-theme-3 focus:font-semibold hover:font-semibold w-full"
                }
              >
                <li className="flex items-center gap-2 cursor-pointer">
                  <span className="material-symbols-outlined">
                    account_circle
                  </span>
                  My Profile
                </li>
              </NavLink>
            </ul>
          </div>
          <ul className="flex flex-col gap-3">
            <li className="flex items-center gap-2 cursor-pointer hover:border-r-[3px] hover:border-r-theme-3 focus:font-semibold hover:font-semibold ">
              <span className="material-symbols-outlined">info</span>
              Help
            </li>
            <li className="flex items-center gap-2 cursor-pointer hover:border-r-[3px] hover:border-r-theme-3 focus:font-semibold hover:font-semibold ">
              <span className="material-symbols-outlined">contact_support</span>
              Contact Us
            </li>
            <li className="flex items-center gap-2 cursor-pointer hover:border-r-[3px] hover:border-r-theme-3 focus:font-semibold hover:font-semibold ">
              <span className="material-symbols-outlined">logout</span>
              Logout
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
