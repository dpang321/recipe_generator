import React, {useState} from 'react';
import UserAvatar from "./UserAvatar";
import Avatar from '@mui/material/Avatar';
import ReturnButton from './ReturnButton';
import RecipesList from './RecipesList';
import '../css/UserProfile.css';

// this component displays the user's profile information when a user is logged in
// displays a default avatar in the top corner of the screen if a user is not logged in, when the avatar is clicked the ProfilePopup user sign in and sign up options are displayed 
// displays the logged in user avatar in the top corner of the screen if a user is logged in, when the avatar is clicked, the rest of the UserProfile is displayed
//
// loggedIn keeps track of whether or not a user is logged in, by default false
// setLoggedIn sets the state of loggedIn
// profilePopupToggle is used to control the conditional rendering of the ProfilePopup
// setProfilePopupToggle sets the state of profilePopupToggle
// user is the currently logged in user if any
// userProfileDisplayToggle is used to control the conditional rendering of UserProfile
// setSearchToggle sets the state of searchToggle
// getLikedRecipes calls a query to get the logged in user's like Recipes
// likedRecipes contains the logged in user's liked recipes
// getRecipeForDisplay is called when a recipe in the liked recipes RecipeList is clicked, sets the recipeForDisplay to the clicked recipe and displays recipe in RecipeDisplay, sets likedRecipeToggle to true, sets userProfileDisplayToggle to false
// offset contains the current offset in the recipes query
// changeOffset is called to modify the value of the offset in the recipes query and then query the next recipes starting from that offset
// searchTagList is a list of search tags the user currently has input in the Searchbar, passed to RecipeList then RecipeListItem to compare search tags with recipe ingredients
// setLikedRecipeDisplayToggle sets the state of LikedRecipeDisplayToggle (used to control conditional rendering of search results RecipeDisplay)
// setDisplayRecipeToggle sets the state of DisplayRecipeToggle(used to control conditional rendering of liked recipe RecipeDisplay)
const UserProfile = ({loggedIn, setLoggedIn, profilePopupToggle, setProfilePopupToggle, user, setUser, userProfileDisplayToggle, setUserProfileDisplayToggle, setSearchToggle, getLikedRecipes, likedRecipes, getRecipeForDisplay, offset, changeOffset, searchTagList, setLikedRecipeDisplayToggle, setDisplayRecipeToggle}) => {

    // state variable declerations
    const [editProfileToggle, setEditProfileToggle] = useState(false);
    const [newUserAvatar, setNewUserAvatar] = useState("");
    const [newUsername, setNewUsername] = useState("");

    // calls updateUser query using the passed in uuid and password
    // parses json response and sets user to the parsed json
    const updateUser = (uuid, username, password, user_avatar) => {
        fetch(`http://localhost:3001/id/${uuid}/users/${username}/pwd/${password}/avatar_url/${user_avatar}`, 
            {method: 'PUT'})
          .then(response => {
            return response.text();
          })
          .then(data => {
          });
      }

    // handles click on the blank default user avatar in top corner to open and close the profile sign up/login ProfilePopuptoggle
    const handleClick = () => {
        setProfilePopupToggle(!profilePopupToggle);
    }

    // handles the click on the signed in users avatar in the top corner to take user to their UserProfile
    // set userProfileDisplayToggle to true
    // set searchToggle to false
    // if there is a user and that user has liked recipes, calls getLikedRecipes query to get the liked recipes for that user
    const handleProfileClick = () => {
        setDisplayRecipeToggle(false);
        setLikedRecipeDisplayToggle(false);
        setUserProfileDisplayToggle(true);
        setSearchToggle(false);
        if (user && user.liked_recipes && user.liked_recipes.length > 0)
        {
            getLikedRecipes(user.liked_recipes);
        }
    }

    // handles return button click by returning from the user profile back to the Searchbar
    // set userProfileDisplayToggle to false
    // set searchToggle to true
    const handleReturnClick = () => {
        setUserProfileDisplayToggle(false);
        setSearchToggle(true);
    }

    // handles edit profile button click
    // sets editProfileToggle to the opposite of it's current state
    // sets newUserAvatar and newUsername to the logged in user's current avatar_link and username for use as default values on the input fields
    const handleEditProfileClick= () => {
        setEditProfileToggle(!editProfileToggle);
        setNewUserAvatar(user.avatar_link);
        setNewUsername(user.username);
    }

    // handles Enter press for the input fields avatar_url and username which are used to edit profile
    const handleEnter = (e) => {
        if (e.key === 'Enter' && e.target.id === 'avatar_url') {
            user.avatar_link = e.target.value;
        }
        else if (e.key === 'Enter' && e.target.id === 'username')
        {
            user.username = e.target.value;
        }
    }

    // handles change to the input fields avatar_url and username which are used to edit profile
    // sets the newUserAvatar to the value entered in avatar_url input
    // sets the newUsername to the value entered in username input
    const handleChange = (e) => {
        if (e.target.id === 'avatar_url')
        {
            setNewUserAvatar(e.target.value);
        }
        else if (e.target.id === 'username')
        {
            setNewUsername(e.target.value);
        }
        
    }

    // saves editable profile information onClick
    // sets user's avatar_link and username to newUserAvatar and newUsername, respectively
    // encode the new avatar_link url so that it may be passed in the url as a parameter
    // call updateUser with the encoded avatar_link and edited userame 
    // call handleEditProfileClick to toggle the editProfileToggle, ends profile editing
    const handleSaveProfileClick = () => {
        if (newUsername.length > 1 && newUserAvatar.length > 1) {
            setUser((prevState) => ({...prevState, username: newUsername, avatar_link: newUserAvatar}));
            let avatar_url = encodeURIComponent(newUserAvatar);
            updateUser(user.uuid, newUsername, user.password, avatar_url);
            handleEditProfileClick();
        }
        else {
            alert("username and avatar url must not be left blank");
        }
    }

    // controls conditional rendering of User Profile data
    function showUserData () {
        if (user && userProfileDisplayToggle && loggedIn) {
            return true;
        } else {
            return false;
        }
    }

    // handles log out button click
    // sets the user stored in local storage to undefined to prevent relog on refresh
    // triggers a page reload to remove the logged in user
    const handleLogOut = () => {
        localStorage.setItem('user', undefined);
        setLoggedIn(false);
        window.location.reload();
    }

    return (
        <>
            <div className="UserProfile__userIcon" >
                {!user && (
                    <Avatar 
                        className="UserProfile__centerPageProfileAvatar"
                        onClick={handleClick}
                        sx={{ width: 55, height: 55, cursor: "pointer"}} 
                        src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" 
                     />
                )}

                {user && (
                    <UserAvatar handleClick={handleProfileClick} user={user} />
                )}
            </div>

            {showUserData() && (
                <div className="UserProfile__userProfileData">
                    <div className="UserProfile__centerPageUsernameAndAvatar" >
                        <Avatar className="UserProfile__centerPageProfileAvatar"
                            sx={{ width: 200, height: 200 }} 
                            src={user.avatar_link}>
                        </Avatar>

                        {editProfileToggle && (
                            <div>
                                <label for="avatar_url" className="UserProfile__editAvatarURL">
                                    Profile avatar url:
                                </label>

                                <input 
                                    type="url" 
                                    className="UserProfile__editAvatarURL" 
                                    id="avatar_url" 
                                    name="avatar_url" 
                                    value={newUserAvatar} 
                                    placeholder={user.avatar_link} 
                                    onChange={handleChange} 
                                    onKeyDown={handleEnter} 
                                    Style="background-color: #dbd8d8; border: 0px; box-shadow: -3px 5px 8px 0px rgba(84, 84, 84, 0.81); border-radius: 5px;"
                                />
                            </div>
                        )}

                        {!editProfileToggle && (
                            <p className="UserProfile__centerPageProfileUsername">
                                {user.username}
                            </p>
                        )}

                        {editProfileToggle && (
                            <div>
                                <input 
                                    type="text" 
                                    className="UserProfile__editUsername" 
                                    id="username" 
                                    name="username" 
                                    value={newUsername} 
                                    placeholder={user.username} 
                                    onChange={handleChange} 
                                    onKeyDown={handleEnter}
                                />
                            </div>
                        )}

                        <button className="ReturnButton__returnButtonUserProfile" onClick={handleLogOut}>
                            Log Out
                        </button>

                        <ReturnButton toggle={handleReturnClick} message="Return to search" className="ReturnButton__returnButtonUserProfile"/>
                        
                        {!editProfileToggle && (
                            <button onClick={handleEditProfileClick} className="UserProfile__editProfileButton" value="Edit">
                                Edit profile
                            </button>
                        )}

                        {editProfileToggle && (
                            <button onClick={handleSaveProfileClick} className="UserProfile__saveProfileButton" value="Save">
                                Save profile
                            </button>
                        )}
                    </div>
                    
                    <div className="UserProfile__likedRecipes">

                        <h2 className="UserProfile__likedRecipesHeader">Liked Recipes</h2>

                        {<div className="UserProfile__recipesList"> 
                            <RecipesList 
                                recipes={likedRecipes}
                                offset={offset}
                                changeOffset={changeOffset} 
                                hasMore={false}   
                                getRecipeForDisplay={getRecipeForDisplay} 
                                searchTagList={searchTagList}
                                height={"450px"}
                            />
                        </div>}
                    </div>
                </div>
            )}
        </>
    );
}

export default UserProfile