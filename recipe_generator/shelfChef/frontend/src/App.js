import React, {useState, useEffect} from "react";
import Searchbar from "./components/Searchbar"
import RecipesList from "./components/RecipesList";
import RecipeDisplay from "./components/RecipeDisplay";
import UserProfile from "./components/UserProfile";
import ProfilePopup from "./components/ProfilePopup";
import SignupPage from "./components/SignupPage";
import ReturnButton from "./components/ReturnButton";
import LoginPage from "./components/LoginPage";
import { ToastContainer} from 'react-toastify';
import './css/App.css';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  // state variable declarations
  const [ingredients, setIngredients] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [searchTagList, setSearchTagList] = useState([]);
  const [searchToggle, setSearchToggle] = useState(true);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [recipeForDisplay, setRecipeForDisplay] = useState(undefined);
  const [displayRecipeToggle, setDisplayRecipeToggle] = useState(false);
  const [profilePopupToggle, setProfilePopupToggle] = useState(false);
  const [signupPageToggle, setSignupPageToggle] = useState(false);
  const [loginPageToggle, setLoginPageToggle] = useState(false);
  const [userProfileDisplayToggle, setUserProfileDisplayToggle] = useState(false);
  const [likedRecipes, setLikedRecipes] = useState([]);
  const [likedRecipeDisplayToggle, setLikedRecipeDisplayToggle] = useState(false);
  const [user, setUser] = useState(() => {
    let storedUser = localStorage.getItem('user')
    let returnedUser
    try {
      returnedUser = JSON.parse(storedUser)
    } catch {
      returnedUser = undefined
    }
    return returnedUser
  });
  const [loggedIn, setLoggedIn] = useState(() => {
    let storedUser = localStorage.getItem('user')
    if (storedUser && storedUser !== undefined) {
      return true
    }
    return false
  });
  
  // calls getLikedRecipes query using the likedRecipeList of the user who is logged in
  // parses json response and sets likedRecipes to the parsed json
  const getLikedRecipes = (likedRecipesList) => {
    fetch(`http://localhost:3001/likedRecipes/${likedRecipesList}`)
      .then(response => {
        return response.text();
      })
      .then(data => {
        setLikedRecipes(JSON.parse(data));
      });
  }

  // calls recipes query using the passed in ingredients list
  // parses json response and sets recipes to the parsed json
  const getRecipe = (ingredientsList) => {
    fetch(`http://localhost:3001/recipes/${ingredientsList}`)
      .then(response => {
        return response.text();
      })
      .then(data => {
        setRecipes(JSON.parse(data));
      });
  }

  // calls recipes query using the passed in ingredients list and the passed in offset value
  // if recipes is already defined, it will parse the json response and concatinate the parsed json onto the end of the recipes state
  // if recipes is not defined, it parses the json response and sets recipes state to the parsed json
  const getRecipeOffset = (ingredientsList, offset) => {
    fetch(`http://localhost:3001/recipes/${ingredientsList}/offset/${offset}`)
      .then(response => {
        return response.text();
      })
      .then(data => {
        if (recipes !== undefined){
          setRecipes([...recipes, ...(JSON.parse(data))]);
        }
        else {
          setRecipes(JSON.parse(data));
        }
      });
  }

  // sets the offset state variable to the value of the offset arguement passed in
  // calls getRecipeOffset with searchTagList and the offset state variable as arguements
  // if getRecipeOffset fails, hasMore state variable is set to false to prevent changeOffset from being called again by infinite scroller in RecipeList component
  function changeOffset(offset) {
    setOffset(offset);
    try {
      getRecipeOffset(searchTagList, offset);
    } catch (error) {
      setHasMore(false);
    }
  }

  // set searchToggle state to true
  // used for conditional rendering of Searchbar
  function toggleSearch() {
    setSearchToggle(true);
  }

  // set displayRecipeToggle to false
  // used for conditional rendering of RecipeDisplay for recipes from search results
  function toggleRecipeDisplay() {
    setDisplayRecipeToggle(false);
  }

  // set the userProfileDisplayToggle to true
  // set the likedRecipesDisplayToggle to false
  // used for conditional rendering of the RecipeDisplay for liked recipes
  function toggleLikedRecipeDisplay() {
    setUserProfileDisplayToggle(true);
    setLikedRecipeDisplayToggle(false);
  }

  // handles onClick event for RecipeList
  // sets recipeForDisplay state to the index of the clicked recipe in recipes
  // sets DisplayRecipeToggle to true to display the recipeForDisplay in RecipeDisplay
  const getRecipeForDisplay = (e) => {
    setRecipeForDisplay(e.currentTarget.getAttribute("value"));
    setDisplayRecipeToggle(true);
    setUserProfileDisplayToggle(false);
    setLikedRecipeDisplayToggle(false);
  }

  // handles onClick event for userProfile liked recipes RecipeList
  // set recipeForDisplay state to the index of the clicked recipe in recipes
  // set likedRecipeDisplayToggle to true
  // sets userProfileDisplayToggle to false to hide UserProfile
  const getLikedRecipeForDisplay = (e) => {
    setRecipeForDisplay(e.currentTarget.getAttribute("value"));
    setLikedRecipeDisplayToggle(true);
    setUserProfileDisplayToggle(false);
    setDisplayRecipeToggle(false);
  }

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user))
  }, [user])

  //  ****The following functions control the conditional rendering of our components****
  //
  //

  // controls conditional rendering for the Searchbar
  function showSearchbar () {
    if (searchToggle) {
      return true;
    } else {
      return false;
    }
  }
  
  // controls conditional rendering for the RecipesList
  function showRecipesList () {
    if (!searchToggle && !displayRecipeToggle && !signupPageToggle && 
        !userProfileDisplayToggle && !likedRecipeDisplayToggle && !loginPageToggle) {
      return true;
    } else {
      return false;
    }
  }

  // controls conditional rendering for the search results RecipeDisplay
  function showRecipeDisplay () {
    if (!searchToggle && displayRecipeToggle && recipeForDisplay && 
        !signupPageToggle && !userProfileDisplayToggle && !loginPageToggle) {
      return true;
    } else {
      return false;
    }
  }

  // controls conditional rendering for the user profile liked recipes RecipeDisplay
  function showLikedRecipeDisplay () {
    if (!searchToggle && likedRecipeDisplayToggle && recipeForDisplay && 
        !signupPageToggle && !userProfileDisplayToggle) {
      return true;
    } else {
      return false;
    }
  }

  // conditionally display ProfilePopup, UserProfile, SignupPage, Searchbar, RecipeList, and RecipeDisplay 
  return (
    <>
      <ToastContainer />
      
      <div className="App__container">
          <div className="App__userProfile">
            {profilePopupToggle && ( 
              <ProfilePopup 
                setProfilePopupToggle={setProfilePopupToggle}
                setSignupPageToggle={setSignupPageToggle}
                setSearchToggle={setSearchToggle}
                setLoginPageToggle={setLoginPageToggle}
              />
            )}

            <UserProfile 
              loggedIn={loggedIn} 
              setLoggedIn={setLoggedIn}
              profilePopupToggle={profilePopupToggle}
              setProfilePopupToggle={setProfilePopupToggle}
              user={user}
              setUser={setUser}
              userProfileDisplayToggle={userProfileDisplayToggle}
              setUserProfileDisplayToggle={setUserProfileDisplayToggle}
              setSearchToggle={setSearchToggle}
              getLikedRecipes={getLikedRecipes}
              likedRecipes={likedRecipes}
              getRecipeForDisplay={getLikedRecipeForDisplay}
              offset={offset} 
              changeOffset={changeOffset} 
              hasMore={hasMore} 
              searchTagList={searchTagList}
              setLikedRecipeDisplayToggle={setLikedRecipeDisplayToggle}
              setDisplayRecipeToggle={setDisplayRecipeToggle}
            />

            {signupPageToggle && (
              <SignupPage
                signupPageToggle={signupPageToggle}
                setSignupPageToggle={setSignupPageToggle}
                setSearchToggle={setSearchToggle}
              />
            )}

            {loginPageToggle && (
                <LoginPage
                  setUser={setUser}
                  setLoginPageToggle={setLoginPageToggle}
                  setLoggedIn={setLoggedIn}
                  setSearchToggle={setSearchToggle}
                />
            )}
          </div>

        {showSearchbar() && (
          <Searchbar 
            setIngredients={setIngredients}
            ingredients={ingredients}
            searchTagList={searchTagList}
            setSearchTagList={setSearchTagList}
            setSearchToggle={setSearchToggle}
            setRecipes={setRecipes}
            getRecipe={getRecipe}
        />
        )}

        {showRecipesList() && (
          <div className="App__recipeList"> 
            <ReturnButton 
              toggle={toggleSearch} 
              message="Return to search"
              className="ReturnButton__returnButton"
            />

            <RecipesList 
              recipes={recipes} 
              offset={offset} 
              changeOffset={changeOffset} 
              hasMore={hasMore} 
              getRecipeForDisplay={getRecipeForDisplay} 
              searchTagList={searchTagList}
              height={"700px"}
            /> 
          </div>
        )}

        {showRecipeDisplay() && (
          <div className="App__recipeDisplay">
            <ReturnButton 
              toggle={toggleRecipeDisplay} 
              message="Return to search results"
              className="ReturnButton__returnButtonDisplayRecipe"
            />

            <RecipeDisplay 
              isUserProfile={true} 
              recipe={recipes[recipeForDisplay]}
              searchTagList={searchTagList}
              user={user}
              setUser={setUser}
              loggedIn={loggedIn}
              setSignupPageToggle={setSignupPageToggle}
              likedRecipes={likedRecipes}
              setLikedRecipes={setLikedRecipes}
              likedRecipeDisplayToggle={likedRecipeDisplayToggle}
              setLikedRecipeDisplayToggle={setLikedRecipeDisplayToggle}
              setUserProfileDisplayToggle={setUserProfileDisplayToggle}
            />
          </div>
        )}
        
        {showLikedRecipeDisplay() && (
          <div className="App__likedRecipeDisplay"> 
            <ReturnButton 
              toggle={toggleLikedRecipeDisplay} 
              message="Return to user profile"
              className="ReturnButton__returnButtonLikedRecipe"
            />

            <RecipeDisplay 
              isUserProfile={false} 
              recipe={likedRecipes[recipeForDisplay]}
              recipes={recipes}
              searchTagList={searchTagList}
              user={user}
              setUser={setUser}
              loggedIn={loggedIn}
              setSignupPageToggle={setSignupPageToggle}
              likedRecipes={likedRecipes}
              setLikedRecipes={setLikedRecipes}
              likedRecipeDisplayToggle={likedRecipeDisplayToggle}
              setLikedRecipeDisplayToggle={setLikedRecipeDisplayToggle}
              setUserProfileDisplayToggle={setUserProfileDisplayToggle}
            />
          </div>
        )}
    </div>
    </>
  )
}


export default App;
