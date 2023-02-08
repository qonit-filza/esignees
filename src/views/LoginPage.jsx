import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import NavbarPublic from "../components/NavbarPublic";
import axios from "axios";
import Swal from "sweetalert2";

export default function LoginPage() {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleFormOnChange = (e) => {
    const newInput = {...formValue, [e.target.name] : e.target.value}
    setFormValue(newInput)
  };

  const login = async (input) => {
    try {
      let { data } = await axios({
        url: `http://localhost:3000/login`,
        method: "post",
        data: input,
      });
      localStorage.setItem("access_token", data.access_token);
      navigate("/inbox")
    } catch (error) {
      throw error
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();

    login(formValue)
      .then(() => {})
      .catch((err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `${err.response.data.message}`,
        })
      });
  };

  return (
    <>
      <NavbarPublic />
      <section className="flex items-center justify-center h-[80vh]">
        <div className="bg-white p-6 rounded-xl w-1/4 flex flex-col text-center">
          <div className="mb-6">
            <p className="text-center text-3xl font-semibold tracking-wide mb-2">
              Login
            </p>
            <p className="text-sm">
              Don't have an account?{" "}
              <button
                onClick={() => {
                  navigate("/register");
                }}
                className="text-theme-3 hover:underline"
              >
                Create an Account
              </button>
            </p>
          </div>
          {/* <p className="text-red-500 text-sm bg-red-100 border-2 border-red-300 py-2 rounded-xl  px-4">
            Invalid Email/Password
          </p> */}
          <div className="flex items-center gap-1 mt-4 border-b-2 border-theme-2 ">
            <span className="material-symbols-outlined text-2xl">person</span>
            <input
              onChange={handleFormOnChange}
              id="email"
              type="text"
              name="email"
              className="outline-none rounded-xl px-3 py-1 "
              placeholder="Email"
            />
          </div>
          <div className="flex items-center gap-1 mt-6 border-b-2 border-theme-2 ">
            <span className="material-symbols-outlined text-2xl">lock</span>
            <input
              onChange={handleFormOnChange}
              id="password"
              type="password"
              name="password"
              className="outline-none rounded-xl px-3 py-1  w-full"
              placeholder="Password"
            />
          </div>
          <div className="flex justify-between text-xs mt-2">
            <div className="flex gap-1 cursor-pointer hover:underline">
              <input type="checkbox" name="" id="" />
              <p>Remember Me</p>
            </div>
            <p className="cursor-pointer hover:underline">
              Forgot your password?
            </p>
          </div>
          <button
            onClick={handleLogin}
            className="bg-theme-3 hover:bg-sky-400 text-white py-2 rounded-full mt-16 w-[60%] tracking-wide mx-auto"
          >
            Sign In
          </button>
        </div>
      </section>
      <Footer/>
    </>
  );
}
