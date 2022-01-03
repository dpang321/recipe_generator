import React from 'react';
import IconButton from '@mui/material/IconButton';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import '../css/SearchTag.css';

// this component is used to display ingredients that have been input into the search bar as a search tag above the search bar
// tag is the searchtag that is being displayed, mapped from searchTagList
// searchTagList contains list of search tags, when a tag is removed it is filtered from the searchTagList and the searchTagList state is updated with setSearchTagList
// setSearchTagList is used to set the searchTagList when a search tag is removed
// setRecipes is used to set the recipes state
const SearchTag = ({tag, searchTagList, setSearchTagList, setRecipes}) => {

    const handleRemove = () => {
        setRecipes(undefined);
        setSearchTagList(searchTagList.filter(listVal => listVal !== tag));
    }
    return (
        <div className="SearchTag__body">
            {tag}
            <IconButton className="SearchTag__removeButton" onClick={handleRemove}>
                <HighlightOffIcon className="SearchTag__removeIcon"/>
            </IconButton>
        </div>
    );
}

export default SearchTag