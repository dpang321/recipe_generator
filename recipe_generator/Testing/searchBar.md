# Search Bar

## Test Cases
- Type into the search bar
- Click on ingredient from the autosuggest list
- Click the “x” on an ingredient tag
- Click the “Search” button with 0 ingredients
- Click the “Search” button with 1 ingredient
- Click the “Search” button with 15 ingredients

## Test Details
### Type into the search bar
Typing into the search bar should generate a list of ingredients similar to what is input
#### Result: SUCCESS
#### Description: List of suggested ingredients matches what was input

### Click on ingredient from the autosuggest list
Clicking on an ingredient from the autosuggest list should add it as a tag above the search bar
#### Result: SUCCESS
#### Description: Selected ingredients get added as tags

### Click the “x” on an ingredient tag
Clicking on the “x” on an ingredient tag removes it from the ingredients to be searched on
#### Result: SUCCESS
#### Description: Ingredient gets removed

### Click the “Search” button with 0 ingredients
Click the “Search” button when 0 ingredients are selected
#### Result: SUCCESS
#### Description: Displays the correct response of “No recipes found”

### Click the “Search” button with 1 ingredient
Click the “Search” button when 1 ingredient is selected
#### Result: SUCCESS
#### Description: Displays list of recipes containing that ingredient

### Click the “Search” button with extremely large number of ingredients (15+)
Click the “Search” button when a large number of ingredients are selected
#### Result: SUCCESS
#### Description: Displays the correct response of “No recipes found”