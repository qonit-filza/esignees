import logo from '../assets/img/logo-3.png';

export default function Sidebar() {
  return (
    <>
      <section className="w-[220px] pl-8 fixed top-3">
        <div className="mt-8">
          <img src={logo} alt="esignee_logo" className="w-32" />
        </div>
        <div className="border-r-2 h-[620px] flex flex-col justify-between py-8">
          <ul className="flex flex-col gap-3">
            <li className="flex items-center gap-2 cursor-pointer hover:border-r-[3px] hover:border-r-theme-3 focus:font-semibold hover:font-semibold ">
              <span className="material-symbols-outlined">corporate_fare</span>
              Organization
            </li>
            <li className="flex items-center gap-2 cursor-pointer hover:border-r-[3px] hover:border-r-theme-3 focus:font-semibold hover:font-semibold ">
              <span className="material-symbols-outlined">contact_mail</span>
              Contacts
            </li>
            <li className="flex items-center gap-2 cursor-pointer hover:border-r-[3px] hover:border-r-theme-3 focus:font-semibold hover:font-semibold ">
              <span className="material-symbols-outlined">all_inbox</span>
              Inbox
            </li>
            <li className="flex items-center gap-2 cursor-pointer hover:border-r-[3px] hover:border-r-theme-3 focus:font-semibold hover:font-semibold ">
              <span className="material-symbols-outlined">send</span>
              Sent
            </li>
            <li className="flex items-center gap-2 cursor-pointer hover:border-r-[3px] hover:border-r-theme-3 focus:font-semibold hover:font-semibold ">
              <span className="material-symbols-outlined">settings</span>
              Settings
            </li>
          </ul>
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
