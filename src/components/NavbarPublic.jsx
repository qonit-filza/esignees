import { useNavigate } from "react-router-dom";
import logo from "../assets/img/logo-3.png";


export default function NavbarPublic() {
  const navigate = useNavigate()
  return (
    <>
      <nav className="pt-8 pb-6 px-12 flex items-center justify-between">
        <img src={logo} alt="esignee_logo" className="w-32 cursor-pointer" />
        <div className="">
          <ul className="flex gap-6">
            <li onClick={() => {navigate('/')}} className="cursor-pointer hover:font-semibold">Home</li>
            <li onClick={() => {navigate('/verify-documents')}} className="cursor-pointer hover:font-semibold">
              Verify Documents
            </li>
            <li onClick={() => {navigate('/login')}} className="cursor-pointer hover:font-semibold">Sign In</li>
          </ul>
        </div>
      </nav>
    </>
  );
}
