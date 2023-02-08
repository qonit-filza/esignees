import { useEffect, useState } from "react";
import subcriptionImage from "../assets/img/subcription.png";
export default function SubcriptionPage() {
  const [snapToken, setSnapToken] = useState('')
  const [loading, isLoading] = useState(true)

  useEffect(()=>{
  isLoading(false)
}, [])

const handlePayment = () => {
    if(!snapToken){
    return;
  }
  window.snap.pay(snapToken, {
    onSuccess: (result) => {
      updateStatus()
      console.log("success boss");
    },
    onPending: (result)=>{
      console.log("pending sabar");
    },
    onError: (result)=>{
      console.log("eror deh sabar");
    }
  })
}

const fetchSnapToken = async (price) => {
  try {
    const response = await fetch(`http://localhost:3000/companies/createMidtransToken/${price}`, {
      method : "POST",
      headers : {
        'Content-Type' : 'application/json',
        'access_token' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjc1NzU3OTM3fQ.47m99YxzBILF3DEgUrWnGpt2hS58XLrX0-dm1MsSCCI'
      },
    })
    const {token} = await response.json()
    setSnapToken(token)
  } catch (error) {
    console.log(error);
  }
};

const updateStatus = async () => {
  try {
    await fetch('http://localhost:3000/companies', {
      method : "PUT",
      headers : {
        'Content-Type' : 'application/json',
        'access_token' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjc1NzU3OTM3fQ.47m99YxzBILF3DEgUrWnGpt2hS58XLrX0-dm1MsSCCI'
      },
    })
  } catch (error) {
    console.log(error);
  }
}

const pay = (value) => {
  fetchSnapToken(value)
  handlePayment()
}



if (loading){
  return (
    <>
    <h1>LOADING COK</h1>
    </>
  )
}
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
            <button className="text-center bg-theme-3 px-4 rounded-xl py-2 mx-auto w-2/3 text-white hover:bg-sky-400" onClick={() => pay(99999)}>
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
            <button onClick={() => pay(249999)} className="text-center bg-theme-3 px-4 rounded-xl py-2 mx-auto w-2/3 text-white hover:bg-sky-400">
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
            <button onClick={() => pay(459999)} className="text-center bg-theme-3 px-4 rounded-xl py-2 mx-auto w-2/3 text-white hover:bg-sky-400">
              Subscribe Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
