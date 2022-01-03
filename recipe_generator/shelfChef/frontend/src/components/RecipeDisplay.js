import React, {useState} from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Box from "@mui/material/Box";
import IconButton from '@mui/material/IconButton';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import '../css/RecipeDisplay.css';

// this component displays the given recipe's name, an ingredient title followed by ingredients, the missing ingredients, and a directions title followed by directions. Also displays a like button which can be clicked or unclicked to add or remove a recipe to the users user profile if logged in
// recipe contains the recipe to be displayed
// recipes contains a list of search result recipes
// searchTagList contains a list of search tags that have been input in the searchbar
// user contains the logged in user's profile information of a user, if a user is logged in
// setUser sets the logged in user to the specified user
// loggedIn is a bool which keeps track of whether or not a user is logged in
// setSignupPageToggle is used to display the SignupPage component if a user is not logged in and attempts to click like button
// likedRecipes contains a list of all the logged in user's liked recipes
// setLikedRecipes sets the value of LikedRecipes to the specified value
// likedRecipeDisplayToggle is used to stop displaying the liked recipe when the user unlikes the recipe, only if a user is logged in and displaying a recipe from the liked RecipesList
// setLikedRecipeDisplayToggle sets the value of likedRecipeDisplayToggle to the specified value
// setUserProfileDisplayToggle sets the value of userProfileDisplaytoggle to the specified value, used to display the profile page once a liked recipes is unliked from the liked RecipeList
export default function RecipeDisplay({ isUserProfile, recipe, recipes, searchTagList, user, setUser, loggedIn, setSignupPageToggle, likedRecipes, setLikedRecipes, likedRecipeDisplayToggle, setLikedRecipeDisplayToggle, setUserProfileDisplayToggle}) {
    
    // state variable declerations
    const [liked, setLiked] = useState((loggedIn && user && recipe && user.liked_recipes && user.liked_recipes.includes(recipe.id)) ? true : false); // liked set to true if the displayed recipe's id is contained in the logged in user's liked_recipes, false otherwise
    const [missingIngredients, setMissingIngredients] = useState(undefined);
    
    // filters out all missing search tags from searchTagList and sets missingIng to the array of missing search tags
    if (recipe.NER && searchTagList && !missingIngredients) {
        setMissingIngredients(recipe.NER.filter(ing => !searchTagList.includes(ing)));  
    } 
    

    // this function handles the like button functionality, it is called when like button is clicked
    // loop through recipes state and check if any of the recipe's id match the recipe that is being liked or unliked, update recipes state with new like value
    // if the recipe being liked is not already liked by the user: update the recipe state like count, set queryType and recipeLikesUpdateValue for the database recipe likes update, set user and likedRecipes with updated liked recipes list
    // update recipe likes in database
    // if the recipe being liked is liked by the user: update the recipe state like count, set queryType and recipeLikesUpdateValue for the database recipe likes update, set user and likedRecipes with updated liked recipes list
    // update user liked_recipes in database
    // if the user is not logged in when they click the like button, displays the SignupPage instead if executing the like logic
    const handleLikedClick = () => {
        if (loggedIn && user && recipe) {
            let recipeLikesUpdateValue;
            let queryType;
            let containedInRecipes;
            let indexInLikedRecipes;

            if (recipes) {
                for (let index = 0; index < recipes.length; index++) {
                    if (recipes[index].id === recipe.id) {
                        containedInRecipes = true;
                        indexInLikedRecipes = index;
                    }
                }
            }

            if (!liked) {
                recipe.likes++;     
                recipeLikesUpdateValue = 1;         
                queryType = 'append';    
                setUser((prevState) => ({...prevState, liked_recipes: [...prevState.liked_recipes, recipe.id]}))
                setLikedRecipes([likedRecipes, recipe])

            } else if (liked) {
                recipe.likes--;
                recipeLikesUpdateValue = -1;
                queryType = 'remove';
                if (likedRecipeDisplayToggle) {
                    
                    if (containedInRecipes) {
                        recipes[indexInLikedRecipes].likes -= 1;
                    }
                    setLikedRecipeDisplayToggle(false);
                    setUserProfileDisplayToggle(true);
                } 
                setUser((prevState) => ({...prevState, liked_recipes: prevState.liked_recipes.filter(e => e !== recipe.id)}))
                if (likedRecipes) {
                    setLikedRecipes(likedRecipes.filter(e => e.id !== recipe.id) || []);
                }                
            }

            fetch(`http://localhost:3001/recipeDisplay/${recipe.id}/like/${recipeLikesUpdateValue}`, {method: 'PUT'})
                .then(response => {
                    return response.text();
                })
                .then(data => {
                    setLiked(!liked)
                });

            fetch(`http://localhost:3001/setUserLiked/${user.uuid}/recipe/${recipe.id}/type/${queryType}`, {method: 'PUT'})
                .then(response => {
                    return response.text();
                })
                .then(data => {
                });

        } else {
            setSignupPageToggle(true);
        }
    }

return (
 <div>
    {recipe && (
        <div className="RecipeDisplay__container"> 
            <Box>
                <h1 className="RecipeDisplay__recipeName">
                    {recipe.title}
                    <div className="RecipeDisplay__likes">
                        <IconButton onClick={() => handleLikedClick()}>
                            {liked ? <ThumbUpIcon /> : <ThumbUpOffAltIcon />}
                        </IconButton>
                        {recipe.likes} likes 
                    </div>
                </h1>

                <h2 className="RecipeDisplay__sectionHeader">Ingredients</h2>

                <List className="RecipeDisplay__ingredientList"
                    sx = {{width: 700, ml: 19, maxHeight: 325}}
                >
                    {recipe.ingredients && recipe.ingredients.map(((item, index) => (
                        <ListItem key={index} value={item} sx = {{width: 700}}>
                            {item}
                        </ListItem>
                    )))}
                </List>

                {isUserProfile && (
                    <b className="RecipeDisplay__missingIngredientsSection"> 
                        <span className="RecipeDisplay__missingIngredientsHeader">
                            Missing Ingredients:
                        </span>

                        {missingIngredients && missingIngredients.map(((item, index) => (
                            (index+1 !== missingIngredients.length) ? <h4 className="RecipeDisplay__missingIngredients" key={index}>{item + ", "}</h4> : <h4 className="RecipeDisplay__missingIngredients" key={index}>{item}</h4>
                        )))} 
                    </b>
                )}
                
                <h2 className="RecipeDisplay__sectionHeader">Directions</h2>

                <List className="RecipeDisplay__directionList"
                    sx = {{width: 700, ml: 19, maxHeight: 300}}
                >
                    {recipe.directions && recipe.directions.map(((item, index) => (
                        <ListItem key={index} value={item}>
                            {" " + (index + 1) + " - " + item}
                        </ListItem>
                    )))}
                </List>
            </Box>
        </div>
    )}
 </div>
)}
