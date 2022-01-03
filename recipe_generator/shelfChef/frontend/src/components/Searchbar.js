import React from 'react';
import SearchTag from "./SearchTag"
import AutofillMenu from './AutofillMenu';
import { Stack } from '@mui/material';
import '../css/Searchbar.css'

// this component is ussed to display a searchbar with autosuggest functionality, entered ingredients displayed as search tags above searchbar
// setIngredients is used to set the ingredients for the autofill menu
// ingredients contains autofill ingredients for the autofill menu
// searchTagList contains ingredient tags that have been input
// setSearchTagList is used the set the searchTagList when search tag ingredients are added or removed
// setSearchToggle is used to set the searchToggle to false, hides the searchbar and displays the search results
// setRecipes is used to set the recipes state
// getRecipe is used to get recipes for the recipe state, gets passed a list of ingredients to search by
const Searchbar = ({ setIngredients, ingredients, searchTagList, setSearchTagList, setSearchToggle, setRecipes, getRecipe }) => {

    return (
        <div className="Searchbar__searchBody">
            <Stack>
            <div className="Searchbar__searchInput">
                {searchTagList && searchTagList.map((tag, index) => (
                    <SearchTag 
                        tag={tag}
                        key={index} 
                        searchTagList={searchTagList}
                        setSearchTagList={setSearchTagList}
                        setRecipes={setRecipes}
                    />
                ))}
            </div>
            <div className="Searchbar__searchField">
                <AutofillMenu
                    searchTagList={searchTagList}
                    setSearchTagList={setSearchTagList}
                    setIngredients={setIngredients}
                    ingredients={ingredients}
                    setSearchToggle={setSearchToggle}
                    setRecipes={setRecipes}
                    getRecipe={getRecipe}
                />
            </div>
            </Stack>
        </div>
    );
}

export default Searchbar