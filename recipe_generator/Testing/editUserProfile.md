# Edit User Profile

## Test Cases
- Click edit profile button and then click save button
- Click edit profile button and edit the avatar link then click save button
- Click edit profile button and edit username then click save button
- Click edit profile button and edit the avatar link and username then click save button
- Click edit profile button and edit username to be blank then click save button
- Click edit profile button and edit avatar link to be blank then click save button
- Click edit profile button and edit avatar link and username to be blank then click save button

## Test Details
#### *constant profile used for edit user profile tests: 
#### Username: daniel12
#### Password: password

### Click edit profile button and then click save button
Click on the edit button and then immediately after click the save button.
#### Result: SUCCESS
#### Description: Successfully displays the edit profile UI and then returns to the user profile UI once save has been clicked.

### Click edit profile button and edit the avatar link then click save button
Click on the edit button and then edit the avatar link to https://iupac.org/wp-content/uploads/2018/05/default-avatar.png and click the save button.
#### Result: SUCCESS
#### Description: Successfully displays the edit profile UI, changes the user avatar and then returns to the user profile UI once save has been clicked.

### Click edit profile button and edit username then click save button
Click on the edit profile button and then edit the username to daniel1 and click the save button.
#### Result: SUCCESS
#### Description: Successfully displays the edit profile UI, changes the user’s username and then returns to the user profile UI once save has been clicked.

### Click edit profile button and edit the avatar link and username then click save button
Click on the edit profile button and edit the avatar link to https://iupac.org/wp-content/uploads/2018/05/default-avatar.png and username to daniel1 then click the save button.
#### Result: SUCCESS
#### Description: Successfully displays the edit profile UI, changes the user’s avatar link and username and then returns to the user profile UI once save has been clicked.

### Click edit profile button and edit username to be blank then click save button
Click on the edit button profile button and edit the username to be blank then click save.
#### Result: FAIL
#### Description: Fetch error when trying to update the username to be blank.
#### Attempted fix: Check that the username and user avatar link have length greater than 1 to be able to exit edit mode by clicking save. 
#### Fix Result: SUCCESS
#### Description: Successfully displays alert when a user tries to save profile with a blank username or avatar url.

### Click edit profile button and edit avatar link to be blank then click save button
Click on the edit button profile button and edit the user avatar link to be blank then click save.
#### Result: SUCCESS
#### Description:  Successfully displays alert when a user tries to save profile with a blank username or avatar url.

### Click edit profile button and edit avatar link and username to be blank then click save button
Click on the edit button profile button and edit avatar link and the username to be blank then click save.
#### Result: SUCCESS
#### Description:  Successfully displays alert when a user tries to save profile with a blank username or avatar url.
