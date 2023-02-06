import subcriptionImage from "../assets/img/subcription.png";
export default function SubcriptionPage() {
  return (
    <>
      <div className="h-[80vh] flex justify-center items-center gap-8">
        <div className="border-2 rounded-xl w-1/4 shadow-md hover:shadow-lg hover:scale-105 overflow-hidden pb-6">
          <p className="text-center text-xl p-4 uppercase bg-sky-50 font-bold ">
            Basic Plan
          </p>
          <img src={subcriptionImage} alt="" />
          <div className="text-center flex flex-col gap-2 p-4 text-sm">
            <p className="text-xl tracking-wide font-semibold ">Rp 99.999</p>
            <p>1 Month Subcription</p>
            <p>Unlimited Access</p>
            <p>Work Hours Support</p>
          </div>
          <div className="flex items-center w-full">
            <button className="text-center bg-theme-3 px-4 rounded-xl py-2 mx-auto w-2/3 text-white hover:bg-sky-400">
              Subscribe Now
            </button>
          </div>
        </div>
        <div className="border-2 rounded-xl w-1/4 shadow-md hover:shadow-lg hover:scale-105 overflow-hidden pb-6">
          <p className="text-center text-xl p-4 uppercase bg-yellow-50 font-bold ">
            Standard Plan
          </p>
          <img src={subcriptionImage} alt="" />
          <div className="text-center flex flex-col gap-2 p-4 text-sm">
            <p className="text-xl tracking-wide font-semibold">Rp 249.999</p>

            <p>3 Month Subcription</p>
            <p>Unlimited Access</p>
            <p>24/7 Support</p>
          </div>
          <div className="flex items-center w-full">
            <button className="text-center bg-theme-3 px-4 rounded-xl py-2 mx-auto w-2/3 text-white hover:bg-sky-400">
              Subscribe Now
            </button>
          </div>
        </div>
        <div className="border-2 rounded-xl w-1/4 shadow-md hover:shadow-lg hover:scale-105 overflow-hidden pb-6">
          <p className="text-center text-xl p-4 uppercase bg-green-100 font-bold ">
            Premium Plan
          </p>
          <img src={subcriptionImage} alt="" />
          <div className="text-center flex flex-col gap-2 p-4 text-sm">
            <p className="text-xl tracking-wide font-semibold">Rp 459.999</p>
            <p>3 Month Subcription</p>
            <p>Unlimited Access</p>
            <p>24/7 Support</p>
          </div>
          <div className="flex items-center w-full">
            <button className="text-center bg-theme-3 px-4 rounded-xl py-2 mx-auto w-2/3 text-white hover:bg-sky-400">
              Subscribe Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
