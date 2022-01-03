import React, {useState} from 'react';
import { Stack } from '@mui/material';
import { toast } from 'react-toastify';
import '../css/LoginPage.css';

// this component is used to display a user login page
// setLoginPageToggle is used to set the loginPageToggle to false, hides the loginPage
// setSearchToggle is used to set the SearchToggle, displays the searchbar
// setUser is used to set the current user
// setLoggedIn is used to set the loggedIn state to true when a user logs in
const LoginPage = ({ setLoginPageToggle, setSearchToggle, setUser, setLoggedIn}) => {

    const [userInfo, setUserInfo] = useState({
        username: "",
        password: "",
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserInfo({ ...userInfo, [name]: value })
    }

    const handleBack = () => {
        setLoginPageToggle(false);
        setSearchToggle(true);
    }

    const handleEnter = (e) => {
        if (e.key === 'Enter')
        {
            handleSubmit();
        }

    }

    const handleSubmit = () => {
        fetch(`http://localhost:3001/users/${userInfo.username}/pwd/${userInfo.password}`)
        .then(response => {
          return response.text();
        })
        .then(data => {
            if ((JSON.parse(data)).length > 0) {
                setUser((JSON.parse(data))[0]);
                setLoggedIn(true);
                toast.success('Log In Successful', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setLoginPageToggle(false)
                setSearchToggle(true)
                let unembed = JSON.stringify(JSON.parse(data)[0])
                localStorage.setItem('user', unembed);

            } else {
                toast.error('Incorrect Username/Password', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  });
            }
        });
    }


    return (
        <div className="LoginPage__body">
            <Stack className="LoginPage__inputBody">
                <div className="LoginPage__topText">Log In</div>
                <label className="LoginPage__label">
                Username
                <input className="LoginPage__input" name="username" value={userInfo.username} onChange={handleChange} onKeyDown={handleEnter}/>
                </label>
                <label className="LoginPage__label">
                Password
                <input type="password" className="LoginPage__input" name="password" value={userInfo.password} onChange={handleChange} onKeyDown={handleEnter}/>
                </label>
                <button className="LoginPage__submitButton" onClick={handleSubmit}>Submit</button>
                <button className="LoginPage__submitButton" onClick={handleBack}>Back</button>
            </Stack>
        </div>
    );
}

export default LoginPage