import logo from "../assets/img/logo-3.png"

export default function NavbarPublic() {
  return (
    <>
      <nav className="pt-8 pb-6 px-12 flex items-center justify-between">
        <img src={logo} alt="esignee_logo" className="w-32 cursor-pointer" />
        <div className="">
          <ul className="flex gap-6">
            <li className="cursor-pointer hover:font-semibold">Home</li>
            <li className="cursor-pointer hover:font-semibold">
              Verify Documents
            </li>
            <li className="cursor-pointer hover:font-semibold">Sign In</li>
          </ul>
        </div>
      </nav>
    </>
  );
}
