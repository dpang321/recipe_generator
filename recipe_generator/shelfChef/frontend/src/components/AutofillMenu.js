import React, {useState} from 'react';
import { List, ListItem, ListItemButton } from '@mui/material';
import '../css/AutofillMenu.css';

// this component is used to display a list of autosuggested ingredients when inputing ingredients into the Searchbar
// setSearchTagList is used to set the search tags that will be used to search for recipes
// searchTagList contains the ingredients to search by
// setIngredients is used to set the ingredients list for the autosuggest list
// ingredients contains the ingredients that have been autosuggested
// setSearchToggle is used to set searchToggle to false and display the search results
// setRecipes is used to reset the recipes state for new recipe results to be set when the search has completed
const AutofillMenu = ({ setSearchTagList, searchTagList, setIngredients, ingredients, setSearchToggle, setRecipes, getRecipe }) => {

    // state variable declerations
    const [searchVal, setSearchVal] = useState("");
    const [isSearchTagListChanged, setIsSearchTagListChanged] = useState(false);

    // calls getIngredients query using the value currently entered in the search input
    // parses json response and sets ingredients to the parsed json
    const getIngredients = (name) => {
        fetch(`http://localhost:3001/ingredients/${name}`)
          .then(response => {
            return response.text();
          })
          .then(data => {
            setIngredients(JSON.parse(data));
          });
      }

    // handles pressing enter key on keyboard when inputing ingredients in the Searchbar
    // sets recipes to undefined so that new search results can be loaded into recipes
    // update the searchTagList with the newly input ingredient
    // reset searchVal to reset the input for new ingredients
    // reset the ingredients state to reset the autosuggested ingredients list for new input
    const handleEnter = (e) => {
        if (e.key === 'Enter') {
            setRecipes(undefined);
            setSearchTagList([...searchTagList, e.target.value]);
            setSearchVal("");
            setIngredients([]);
            setIsSearchTagListChanged(true);
        }
    }

    // handles change to the searchbar input
    // updates searchVal state to the current value of the input
    // calls getIngredients with the current input value to get newly suggested ingredients for the autosuggest list
    const handleChange = (e) => {
        setSearchVal(e.target.value);
        getIngredients(e.target.value);
    }

    // handles click on an ingredient in the autosuggest list of ingredients
    // set newVal to the clicked ingredient's value
    // sets recipes to undefined so that the new search results can be loaded into recipes
    // reset the searchVal to reset the input for new ingredients
    // reset the ingredients state to reset the autosuggested ingredients list for new input
    const handleClick = (e) => {
        let newVal = e.currentTarget.getAttribute("value");
        setRecipes(undefined);
        setSearchTagList([...searchTagList, newVal]);
        setSearchVal("");
        setIngredients([]);
        setIsSearchTagListChanged(true);
    }


    // handles search button click
    // sets searchToggle to false to hide the searchbar and display the search results 
    // calls getRecipe using the current searchTagList, getRecipe sets search results
    const handleSearch = () => {
        setSearchToggle(false);
        if (isSearchTagListChanged)
        {
            getRecipe(searchTagList);
            setIsSearchTagListChanged(false);
        }
        
    }
    
      return (
        <>
            <div className="AutofillMenu__search">
                <input 
                    id="search__text" 
                    className="Searchbar__searchText" 
                    placeholder="Enter ingredients..."
                    type="text" 
                    onChange={handleChange} 
                    onKeyDown={handleEnter}
                    value={searchVal} 
                    autoComplete="off"
                />

                <button 
                    type="button" 
                    className="AutofillMenu__searchButton" 
                    onClick={handleSearch}
                >
                    SEARCH
                </button>
            </div>

            <div className="AutofillMenu__results">
                <List>
                    {ingredients && ingredients.map((ingredient, index) => (
                        <ListItem value={ingredient["ingredient"]} key={index}>
                            <ListItemButton
                                onClick={handleClick}
                                value={ingredient["ingredient"]}
                            >
                                {ingredient["ingredient"]}
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </div>
        </>
      )
}

export default AutofillMenu