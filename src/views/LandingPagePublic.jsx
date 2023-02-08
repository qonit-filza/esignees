import Footer from "../components/Footer";
import NavbarPublic from "../components/NavbarPublic";
import logo from "../assets/img/logo-3.png";

export default function LandingPagePublic() {
  return (
    <>
      <NavbarPublic />
      <section className="min-h-[50vh]">
        <div className="py-4 h-[700px] flex flex-col items-center justify-center">
          <p className="text-center text-5xl font-bold">
            A new way to send, receive, and
          </p>
          <p className="text-center text-5xl font-bold mt-2">
            request digital signatures
          </p>
          <p className="text-center mt-4">
            Sign documents online, generate agreements, negotiate contracts, and
            accept
          </p>
          <p className="text-center ">
            payments with legally-binding eSignatures.
          </p>
          <div className="flex items-center gap-2 justify-center my-8">
            <input
              type="text"
              className="outline-none border-2 px-4 py-2 rounded-xl"
              placeholder="Enter Your Email"
            />
            <button className="bg-theme-3 px-4 py-2 rounded-xl text-white hover:bg-sky-400">
              Try Now
            </button>
          </div>
        </div>
        <div className="flex items-center justify-center gap-4 mt-8">
          <img src={logo} alt="" className="w-44" />
          <p className="text-center font-bold text-4xl">
            the digital signature solution.
          </p>
        </div>
        <div className="flex justify-evenly w-3/4 mx-auto gap-4 py-8 transition delay-1000 ">
          <div className="p-4 rounded-xl w-1/3">
            <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-3xl text-white">
                acute
              </span>
            </div>
            <p className="text-2xl font-bold mt-2">
              Quick to start and easy to send
            </p>
            <p>
              esignees interface allows newcomers to create an account, upload,
              signature documents, and send their first document for signing in
              minutes — no training or downloads required.
            </p>
          </div>
          <div className="p-4 rounded-xl w-1/3">
            <div className="w-16 h-16 bg-green-400 rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-3xl text-white">
                thumb_up
              </span>
            </div>
            <p className="text-2xl font-bold mt-2">
              Reliable performance and availability
            </p>
            <p>
              esignees interface allows newcomers to create an account, upload,
              signature documents, and send their first document for signing in
              minutes — no training or downloads required.
            </p>
          </div>
          <div className="p-4 rounded-xl w-1/3">
            <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-3xl text-white">
                tips_and_updates
              </span>
            </div>
            <p className="text-2xl font-bold mt-2">
            Continuous Innovation
            </p>
            <p>
              esignees are constantly innovate adding new feature to create more interesting features.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
