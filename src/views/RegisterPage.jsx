import { useState } from 'react';
import Footer from '../components/Footer';
import NavbarPublic from '../components/NavbarPublic';
import RegisterCompany from '../components/RegisterCompany';
import RegisterUser from '../components/RegisterUser';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
// const baseUrl = 'http://localhost:3000';
const baseUrl = 'https://api-esignees.ghzytp.site';

export default function RegisterPage() {
  const [showCompanyForm, setShowCompanyForm] = useState(false);
  const [userData, setUserData] = useState({});
  const [file, setFile] = useState('');
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    let newInput = { ...userData, [e.target.id]: e.target.value };
    setUserData(newInput);
  };

  const handleOnChangeUserKtp = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = () => {
    if (!userData.companyInviteCode) {
      return setShowCompanyForm(true);
    }
    handleRegister();
  };

  const handleRegister = async () => {
    try {
      const formData = new FormData();
      for (const [name, value] of Object.entries(userData)) {
        formData.append(name, value);
      }
      formData.append('file', file);

      const { data } = await axios.post(`${baseUrl}/register`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      toast.success(data.message, { autoClose: 5000 });
      navigate('/login');
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const backToRegisterUser = () => {
    setShowCompanyForm(!showCompanyForm);
  };

  return (
    <>
      <NavbarPublic />
      <section className="pb-12">
        <div className="w-fit mx-auto">
          <p className="text-center text-3xl font-semibold tracking-wide mb-2 ">
            Register {!showCompanyForm ? 'User' : 'Company'}
          </p>
          <p className="text-sm">
            Already have an account?{' '}
            <button
              onClick={() => {
                navigate('/login');
              }}
              className="text-theme-3 hover:underline"
            >
              Sign In Here
            </button>
          </p>
        </div>

        <div className="flex flex-col items-center gap-4 w-3/5 mx-auto  mt-4 ">
          <RegisterUser
            showState={showCompanyForm}
            handleOnChange={handleOnChange}
            handleOnChangeKtp={handleOnChangeUserKtp}
            handleSubmitUser={handleSubmit}
          />
          <RegisterCompany
            showState={showCompanyForm}
            back={backToRegisterUser}
            handleOnChange={handleOnChange}
            handleSubmit={handleRegister}
          />
        </div>
      </section>
      <Footer />
    </>
  );
}
