import React, {useState} from 'react';
import { Stack } from '@mui/material';
import { toast } from 'react-toastify';
import '../css/SignupPage.css';

// this component is used to display the user sign up page 
// setSignupPageToggle is used to set SignupPageToggle, hides signupPage
// setSearchToggle is used to set searchToggle to true, displays searchbar
const SignupPage = ({ setSignupPageToggle, setSearchToggle }) => {

    const [userInfo, setUserInfo] = useState({
        username: "",
        password: "",
        avatar_link: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserInfo({ ...userInfo, [name]: value })
    }

    const handleBack = () => {
        setSignupPageToggle(false);
        setSearchToggle(true);
    }

    const handleSubmit = () => {
        fetch(`http://localhost:3001/userCreation`, {
            method: 'POST',
            body: JSON.stringify(userInfo),
            headers: {
              'Content-Type': 'application/json',
            },
          })
              .then((res) => {
                if (!res.ok) {
                  throw res;
                }
                return res.json();
              })
              .then((json) => {
                toast.success('Account Created', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
                setSignupPageToggle(false);
                setSearchToggle(true);

              })
              .catch((err) => {
                alert('Error logging in, please try again');
              });
    }

    return (
        <div className="SignupPage__body">
            <Stack className="SignupPage__inputBody">
                <div className="SignupPage__topText">
                  Sign Up
                </div>
                <label className="SignupPage__label">
                Username
                <input className="SignupPage__input" name="username" value={userInfo.username} onChange={handleChange}/>
                </label>
                <label className="SignupPage__label">
                Password
                <input type="password" className="SignupPage__input" name="password" value={userInfo.password} onChange={handleChange}/>
                </label>
                <label className="SignupPage__label">
                Avatar URL
                <input className="SignupPage__input" name="avatar_link" value={userInfo.avatar_link} onChange={handleChange}/>
                </label>
                <button className="SignupPage__submitButton" onClick={handleSubmit}>Submit</button>
                <button className="SignupPage__submitButton" onClick={handleBack}>Back</button>
            </Stack>
        </div>
    );
}

export default SignupPage