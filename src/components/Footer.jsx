import logo from "../assets/img/logo-2.png";
export default function Footer() {
  return (
    <footer className="px-12 py-8 mt-8">
      <img src={logo} alt="logo" className="w-32" />
      <div className="flex items-start justify-between my-4 text-sm">
        <div>
          <p className="cursor-pointer hover:underline">Digital Signature</p>
          <p className="cursor-pointer hover:underline">Signature Verification</p>
        </div>
        <div>
          <p className="cursor-pointer hover:underline">API Documentation</p>
          <p className="cursor-pointer hover:underline">User Guide</p>
        </div>
        <div>
          <p className="font-semibold">esignees</p>
          <p>JL Antariksa Utara</p>
          <p>Jakarta Selatan, 123456 - Indonesia</p>
          <p>hello.esignees@esignees.com</p>
          <p>+6282280282021</p>
        </div>
      </div>
      <div className="flex gap-8">
        <p className="cursor-pointer hover:underline">&copy; Copyright 2023 esignees - All Rights Reserved</p>
        <p className="cursor-pointer hover:underline">Privacy Policy</p>
        <p className="cursor-pointer hover:underline">Terms of Use</p>
      </div>
    </footer>
  );
}
