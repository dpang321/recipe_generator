import React, {useRef, useEffect} from 'react';
import Avatar from '@mui/material/Avatar';
import '../css/ProfilePopup.css';

function useOutsideClick(ref, setProfilePopupToggle) {
    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setProfilePopupToggle(false)
            }
        }
        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        }
    }, [ref, setProfilePopupToggle]);
}


// this component is used to display the profile popup that allow you to either sign up or log in to an account
// setProfilePopupToggle is used to set the profilePopupToggle to display or hide the profilePopup
// setSignupPageToggle is used to set the SignupPageToggle to display or hide the signupPage
// setSearchToggle is used to set the searchToggle, display or hides the searchbar
// setLoginPageToggle is used to set the loginPageToggle, displays or hides the loginPage
const ProfilePopup = ({ setProfilePopupToggle, setSignupPageToggle, setSearchToggle, setLoginPageToggle }) => {

    const profileRef = useRef(null);
    useOutsideClick(profileRef, setProfilePopupToggle)

    const handleSignup = () => {
        setProfilePopupToggle(false);
        setLoginPageToggle(false);
        setSignupPageToggle(true);
        setSearchToggle(false);

    }

    const handleLogin = () => {
        setProfilePopupToggle(false);
        setSignupPageToggle(false);
        setLoginPageToggle(true);
        setSearchToggle(false);
    }

    return (
        <>
            <div className="ProfilePopup__noClickZone" ref={profileRef}/>
            <div className="ProfilePopup__body" ref={profileRef}>
                <Avatar
                    className="ProfilePopup__avatar"
                    sx={{ width: 100, height: 100 }} 
                    src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" 
                />
                <div className="ProfilePopup__username">Guest</div>
                <button className="ProfilePopup__button" onClick={handleLogin}>Login</button>
                <button className="ProfilePopup__button" onClick={handleSignup}>Sign Up</button>
            </div>
        </>
    );
}

export default ProfilePopup