import React from "react";
import RecipeListItem from "./RecipeListItem";
import Box from "@mui/material/Box";
import InfiniteScroll from "react-infinite-scroll-component";
import '../css/RecipeList.css';

// this component displays a list of recipes, uses infinite scroll to add more recipes to search results RecipeList when scroll reaches bottom of scrollbar
// recipes contains the current list of recipes to be displayed
// offset contains the current offset in the recipes query
// changeOffset is called to modify the value of the offset in the recipes query and then query the next recipes starting from that offset
// hasMore controls the infinite scroll calls to fetchMoreRecipes, when false infinite scroll will not call fetchMoreRecipes. When true, infinite scroll calls fetchMoreRecipes when bottom of scrollbar is reached
// getRecipeForDisplay is called when a recipe in the list is clicked, sets the recipeForDisplay and displays recipe in RecipeDisplay, hides RecipeList
// searchTagList is a list of search tags the user currently has input in the Searchbar, passed to RecipeListItem to compare search tags with recipe ingredients
// height is used to set the height of the infinite scroll component 
const RecipesList = ({recipes, offset, changeOffset, hasMore, getRecipeForDisplay, searchTagList, height}) => {
  
  // function called by infinite scroll component when scroll bar reaches the bottom of the scroll window to load more recipes into the recipes state
  // sets offset to offset + 25
  // calls changeOffset which will call getRecipesOffset query with the new offset value and the current searchTagList as arguements
  const fetchMoreRecipes = () => {
    var newOffset = offset + 25;
    changeOffset(newOffset);
  }

  if (recipes !== undefined) 
  {
    if (recipes.length >= 1)
    {
      return (
        <div>
          <Box className="RecipeList__box"
            sx ={{top: -20, height: {height} }}>
            <InfiniteScroll 
            className="RecipeList__infiniteScroll" 
            dataLength={recipes.length}
            height={height}
            next={fetchMoreRecipes}
            style = {{position: 'absolute', top: '10px', backgroundColor: '#dbd8d8', borderRadius: '8px'}}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            >
              {recipes && recipes.map(((item, index) => (
                <RecipeListItem 
                  recipe={item} 
                  id={index}
                  key={index} 
                  getRecipeForDisplay={getRecipeForDisplay} 
                  searchTagList={searchTagList}
                />
              )))}
            </InfiniteScroll> 
          </Box>
        </div>
      );
    }
    else
    {
      return (
        <h3 className="RecipeList__searchResponse">No recipes found</h3>
      )  
    }
  } 
  else 
  {
    return(
      <h3 className="RecipeList__searchResponse">Loading recipes...</h3>
    );
  }
}

export default RecipesList