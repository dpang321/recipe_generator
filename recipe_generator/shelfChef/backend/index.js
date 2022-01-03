const express = require("express");

const app = express();

const port = 3001;

const recipe_model = require("./recipe_model");

const uuid = require('uuid');

app.use(express.json());

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Access-Control-Allow-Headers"
  );
  next();
});


// this post request calls putUserInfo in recipe_model and handles the creation of a user in the users table
app.post("/userCreation", (req, res) => {
  newUUID = uuid.v4();
  recipe_model.putUserInfo(req.body, newUUID)
  .then((response) => {
    res.status(200).send(response);
  })
  .catch((error) => {
    res.status(500).send(error);
  });
})

// this get request calls getRecipeNames in recipe_model and handles the searching of recipes that contain ingredients from ingredientsList, limit 25 recipes starting from the offset provided
app.get("/recipes/:ingredientsList/offset/:offset", (req, res) => {
  recipe_model
    .getRecipeNames(req.params.ingredientsList, req.params.offset)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

// this get request calls getRecipeNames in recipe_model and handles the searching of recipes that contain ingredients from ingredientsList, limit 25 recipes with no offset
app.get("/recipes/:ingredientsList", (req, res) => {
  recipe_model
    .getRecipeNames(req.params.ingredientsList, 0)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

// this get request calls getIngredientNames in recipe_model and handles the searching of ingredients for the AutofillMenu component.
// searches based on ingredients whose names contain provided name 
app.get("/ingredients/:name", (req, res) => {
  recipe_model
    .getIngredientNames(req.params.name)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

// this get request calls getUser in recipe_model and handles the login and retrieval of a users profile. 
// finds the profile with the provided username and password
app.get("/users/:username/pwd/:password", (req, res) => {
  recipe_model
    .getUser(req.params.username, req.params.password)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

// this get request calls getLikedRecipes in recipe_model and handles the retrieval of recipes that the logged in user has liked. 
// searches for recipes with id's contained in the provided likedRecipesList
app.get("/likedRecipes/:likedRecipesList", (req, res) => {
  recipe_model
    .getLikedRecipes(req.params.likedRecipesList)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

// this put request calls setLiked in recipe_model and handles the updating of recipe likes count in recipes table. 
// updates the recipe with the provided recipeID by the amount provided in update
app.put("/recipeDisplay/:recipeID/like/:update", (req, res) => {
  recipe_model
    .setLiked(req.params.recipeID, req.params.update)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

// this put request calls updateUserLiked in recipe_model and handles the updating of the logged in user's liked recipes in the users table. 
// updates the user with the provided userID by either appending or removing the provided recipeID from the liked_recipes column
app.put("/setUserLiked/:userID/recipe/:recipeID/type/:type", (req, res) => {
  recipe_model
    .updateUserLiked(req.params.userID, req.params.recipeID, req.params.type)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

// this get request calls updateUser in recipe_model and handles the updating of the logged in user's username and/or avatar_link in the users table. 
// updates the user with the provided uuid and password to the provided username and avatar_url
app.put("/id/:uuid/users/:username/pwd/:password/avatar_url/:user_avatar", (req, res) => {
  recipe_model
    .updateUser(req.params.uuid, req.params.username, req.params.password, req.params.user_avatar)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.listen(port, () => console.log("App listening on port " + port));
