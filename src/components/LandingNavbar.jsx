import logo from "../assets/img/logo-3.png";
import { Link } from "react-router-dom";

export default function LandingNav() {
  return (
    <>
      <section className="border-b-theme-1 border-b-2 px-8 py-3 flex justify-between items-center shadow-sm text-theme-2 ">
        <div className="w-32 cursor-pointer text-center">
          <img src={logo} alt="esignee_logo" />
          <p className="text-xs font-semibold tracking-widest">
            Digital Signature
          </p>
        </div>
        <div>
          <ul className="flex gap-10 tracking-wide">
            <Link to="/admin/login">
              <li className="hover:bg-sky-50 px-4 py-2 rounded-xl cursor-pointer hover:font-semibold">
                Admin
              </li>
            </Link>
            <Link to="/user/login">
              <li className="hover:bg-sky-50 px-4 py-2 rounded-xl cursor-pointer hover:font-semibold">
                User
              </li>
            </Link>
          </ul>
        </div>
      </section>
    </>
  );
}
