# Liked Recipes

## Test Cases
- Click the like button on the recipe display page when not logged in
- Click the like button on the recipe display when logged in and the recipe is unliked
- Click the like button on the recipe display page when logged in and the recipe is liked
- Click the like button on the liked recipe display page

## Test Details
### Click the like button on the recipe display page when not logged in
While viewing a recipes display page and not logged in as a user, click the like button
#### Result: SUCCESS
#### Description: Taken to the account sign up page

### Click the like button on the recipe display when logged in and the recipe is unliked
While viewing an unliked recipes display page and logged in as a user, click the like button
#### Result: SUCCESS
#### Description: The liked icon changes from unliked to liked, the recipes like count increases by 1, and the recipe is added to the liked recipes list on the user profile

### Click the like button on the recipe display page when logged in and the recipe is liked
While viewing a liked recipes display page and logged in as a user, click the like button
#### Result: SUCCESS
#### Description: The liked icon changes from liked to unliked, the recipes like count decreases by 1, and the recipe is removed from the liked recipes list on the user profile

### Click the like button on the liked recipe display page
While viewing a liked recipe from the user liked recipe list, click the like button
#### Result: SUCCESS
#### Description: The liked icon changes from liked to unliked, the recipes like count decreases by 1, the recipe is removed from the liked recipes list on the user profile, and the app view changes back to the user profile
