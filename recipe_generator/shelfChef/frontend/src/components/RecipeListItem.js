import React from "react";
import RecipeTag from "./RecipeTag"
import '../css/RecipeListItem.css';

// this component displays the details of the provided recipe as a list item
// recipe is the recipe that we are displaying details for
// id is the index of the recipe in the list it resides in
// getRecipeForDisplay is called when the recipe is clicked, sets the recipeForDisplay and displays recipe in RecipeDisplay, hides RecipeList
// searchTagList is a list of search tags the user currently has input in the Searchbar, passed to RecipeListItem to compare search tags with recipe ingredients 
const RecipeListItem = ({recipe, id, getRecipeForDisplay, searchTagList}) => {
    return (
        <>
        {recipe && (
            <div className="RecipeListItem__recipe" 
                onClick={getRecipeForDisplay} 
                value={id} 
                key={id}
            >
                <div className="RecipeListItem__likes">
                    {recipe.likes} likes
                </div>

                <div className="RecipeListItem__recipeTitle">
                    {recipe.title}
                </div>
                
                {recipe.NER && recipe.NER.map((ingredient, index) => (
                    <RecipeTag 
                        tag={ingredient}
                        key={index} 
                        searchTagList={searchTagList}
                    />
                ))}
            </div>
        )}
        </>
    );
}

export default RecipeListItem