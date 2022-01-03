import React from "react";
import Avatar from '@mui/material/Avatar';
import "../css/UserAvatar.css";

// this component displays the provided user's avatar in the top corner of the screen with their username beside it. avatar may be clicked to trigger the passed in handleClick
// user contains the user whos information will be used for the avatar and username
// handleClick is used to trigger some event when the user avatar is clicked
const UserAvatar = ({user, handleClick}) => {
    const handleError = (e) => {
        e.target.src = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
    }

    return (
         <div>
            <Avatar className="UserAvatar__userAvatar" src={user.avatar_link} sx={{ width: 55, height: 55, cursor: "pointer"}} onClick={handleClick} onError={handleError}/>
            <h2 className="UserAvatar__username">{user.username}</h2>
        </div>
    );
}

export default UserAvatar
