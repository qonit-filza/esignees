import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

export default function Login() {
  const [formValue, setFormValue] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleFormOnChange = (e) => {
    const newValue = { ...formValue };
    newValue[e.target.name] = e.target.value;
    setFormValue(newValue);
  };

  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      const { data } = await axios.post(
        'http://localhost:3000/login',
        formValue
      );

      localStorage.setItem('access_token', data.access_token);
      navigate('/');
    } catch (error) {
      // console.log(error);
    }
  };

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
      }}
    >
      <div
        style={{
          flex: 4.5,
          backgroundImage: `linear-gradient(to left, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0)), url("https://images.pexels.com/photos/48148/document-agreement-documents-sign-48148.jpeg?cs=srgb&dl=pexels-pixabay-48148.jpg&fm=jpg")`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      ></div>
      <div
        style={{
          flex: 1.5,
          height: '100vh',
          borderLeft: 'solid',
          borderColor: 'white',
          backgroundColor: '#0A1C62',
        }}
      >
        <h1
          style={{
            textAlign: 'center',
            paddingTop: '20vh',
            paddingBottom: '20vh',
            fontSize: 26,
            fontWeight: 'bold',
            color: 'white',
          }}
        >
          esignees/ LOGO IMG(?)
        </h1>
        <form
          onSubmit={handleLogin}
          style={{
            border: 'solid',
            borderColor: 'white',
            borderRadius: 15,
            padding: 25,
            marginLeft: 25,
            marginRight: 25,
            backgroundColor: 'white',
            display: 'flex',
            flexDirection: 'column',
            height: '50vh',
          }}
        >
          <h2 style={{ textAlign: 'center' }}>SIGN IN</h2>
          <br />
          <br />
          <p>Email:</p>
          <input
            value={formValue.email}
            onChange={handleFormOnChange}
            type="text"
            name="email"
            placeholder="user@email.com"
            style={{
              border: 'solid',
              borderRadius: 5,
              borderColor: 'black',
              paddingLeft: 10,
              width: '100%',
              height: 35,
            }}
          />
          <p>Password:</p>
          <input
            value={formValue.password}
            onChange={handleFormOnChange}
            type="text"
            name="password"
            placeholder="Password"
            style={{
              border: 'solid',
              borderRadius: 5,
              borderColor: 'black',
              paddingLeft: 10,
              width: '100%',
              height: 35,
            }}
          />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              textAlign: 'center',
            }}
          >
            <p>Don't have an Account?</p>
            <Link to="/user/register" style={{ color: 'blue' }}>
              Register Here
            </Link>
            <button
              type="submit"
              style={{
                alignSelf: 'center',
                border: 'solid',
                borderColor: 'white',
                borderRadius: 7,
                width: '20%',
                height: 35,
                backgroundColor: 'red',
                color: 'white',
              }}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
