# Login Page/Signup Page

## Test Cases
- While NOT logged in, pressing Avatar on the main screen, and seeing if both login/signup buttons take you to the correct page.
- While NOT logged in, pressing Avatar on screen with a list of recipes, and seeing if both login/signup buttons take you to the correct page.
- While NOT logged in, pressing Avatar on the displayed recipe screen, and seeing if both login/signup buttons take you to the correct page.
- While logged in, pressing Avatar on the main screen, and seeing if it takes you to profile.
- While logged in, pressing Avatar on screen with a list of recipes, and seeing if it takes you to profile.
- While logged in, pressing Avatar on the displayed recipe screen, and seeing if it takes you to profile
- Signing up with empty fields
- Signing up with only filled username
- Signing up with only filled password
- Signing up with only filled avatar
- Signing up with only empty avatar URL
- Signing up with invalid avatar URL
- Signing up with all valid fields
- Logging in with empty fields
- Logging in with empty username
- Logging in with empty password
- Logging in with nonexistent  credentials
- Logging in with valid credentials

## Test Details
### While NOT logged in, click on the Avatar on the main screen
While NOT logged in, pressing Avatar on the main screen, and see if both login/signup buttons take you to the correct page.
#### Result: PASS
#### Description: buttons work correctly

### While NOT logged in, click on the Avatar on screen with a list of recipes
While NOT logged in, click on the Avatar on screen with a list of recipes, and see if both login/signup buttons take you to the correct page.
#### Result: PASS 
#### Description: buttons work correctly

### While NOT logged in, click on the Avatar on the displayed recipe screen
While NOT logged in, pressing Avatar on the displayed recipe screen, and seeing if both login/signup buttons take you to the correct page.
#### Result: PASS 
#### Description: buttons work correctly

### While logged in, click on Avatar on the main screen
While logged in, pressing Avatar on the main screen, and seeing if it takes you to profile
#### Result: PASS 
#### Description: button works correctly

### While logged in, click on the Avatar on screen with a list of recipes
While logged in, pressing Avatar on screen with a list of recipes, and seeing if it takes you to profile
#### Result: PASS 
#### Description: button works correctly

### While logged in, click on the Avatar on the displayed recipe screen
While logged in, pressing Avatar on the displayed recipe screen, and seeing if it takes you to profile
#### Result: PASS 
#### Description: button works correctly

### Signing up with empty fields
Attempting to create an account with all fields empty (i.e. not entering anything in the field)
#### Result: FAIL 
#### Description: notification says account get created

### Signing up with only filled username
Attempting to create an account with only the username field filled (i.e. 123), but the other two fields blank (i.e. not entering anything in the field)
#### Result: FAIL 
#### Description: notification says account get created

### Signing up with only filled password
Attempting to create an account with only the password field filled (i.e. 123), but the other two fields blank (i.e. not entering anything in the field)
#### Result: FAIL 
#### Description: notification says account get created

### Signing up with only filled avatar
Attempting to create an account with only the avatar URL field filled (i.e. https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg), but the other two fields blank (i.e. not entering anything in the field)
#### Result: FAIL 
#### Description: notification says account get created

### Signing up with only empty avatar URL
Attempting to create an account with only the avatar URL field blank (i.e. not entering anything in the field), and the other two fields filled (i.e. 123)
#### Result: PASS 
#### Description: Account is created with default avatar

### Signing up with invalid avatar URL
Attempting to create an account with an invalid avatar URL field (i.e. 123)
#### Result: PASS 
#### Description: Account is created with default avatar

### Signing up with all valid fields
Attempting to create an account with all fields valid (i.e. 123), including a valid avatar URL (i.e. https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg)
#### Result: PASS 
#### Description: Account created successfully

### Logging in with empty fields
Attempting to log in with all fields empty (i.e. not entering anything in the field)
#### Result: PASS 
#### Description: nothing happens, not allowed to sign in

### Logging in with empty username
Attempting to log in with the username field empty (i.e. not entering anything in the field, but 123 for other fields)
#### Result: PASS 
#### Description: nothing happens, not allowed to sign in

### Logging in with empty password
Attempting to log in with the password field empty (i.e. not entering anything in the field, but 123 for other fields)
#### Result: PASS 
#### Description: nothing happens, not allowed to sign in

### Logging in with nonexistent  credentials
Attempting to log in with credentials that do not exist in the database (i.e. an invalid user)
#### Result: PASS 
#### Description: doesn’t allow login, gives ‘incorrect username/password’ notification

### Logging in with valid credentials
Attempting to log in with valid credentials (i.e. a successfully created account)
#### Result: PASS 
#### Description: logs us in, gives ‘log in successful’ notification, changes profile picture/name