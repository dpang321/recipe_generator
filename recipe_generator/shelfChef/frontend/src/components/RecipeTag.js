import React from 'react';
import '../css/RecipeTag.css';

// this component is used to display color coded missing/not missing search tags on each recipe in the search results RecipesList
// tag contains the tag that we are searching for in the searchTagList. tags are ingredients from the current recipe's NER field  
// searchTagList contains the current search tags, any tag that is not in the searchTagList is considered misssing
const RecipeTag = ({tag, searchTagList}) => {

    if (searchTagList && searchTagList.includes(tag)) {
        return (
            <div className="RecipeTag__haveIngredient">
                {tag}
            </div>
        );
    } else {
        return (
            <div className="RecipeTag__missingIngredient">
                {tag}
            </div>
        );
    }
}

export default RecipeTag