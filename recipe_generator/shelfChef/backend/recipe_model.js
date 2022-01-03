const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'dpang321',
  host: 'shelfchefdb.ce8xqxcjyt3m.us-west-1.rds.amazonaws.com',
  database: 'shelfchefdb',
  password: 'password123',
  port: '5432',
});

const putUserInfo = (userInfo, newUUID) => {
  const query = {
    text: `INSERT INTO users 
           (uuid, username, password, avatar_link, liked_recipes) 
           VALUES (($1), ($2), ($3), ($4), ARRAY[]::integer[])`,
    values: [newUUID, userInfo.username, userInfo.password, userInfo.avatar_link]
  }
  return new Promise(function (resolve, reject) {
    pool.query(query, (error, results) => {
      if (error) {
        console.log(error);
        reject(error);
      }
      resolve(results)
    });
    
  });
}

const getRecipeNames = (ingredientsList, offset) => {
  iList= ingredientsList.split(",")
  const query = {
    text: `SELECT *
           FROM recipes 
           WHERE ("NER"::jsonb ?& ($1))
           ORDER BY jsonb_array_length("NER") ASC, likes DESC
           LIMIT 25 OFFSET ($2)`,
    values: [iList, offset]
  }
  return new Promise(function (resolve, reject) {
    pool.query(query, (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows)
    })
    
  })
}

const getIngredientNames = (name) => {
  const query = {
    text: `SELECT ingredient 
           FROM ingredients 
           WHERE ingredient 
           LIKE '%${name}%'
           ORDER BY count DESC 
           LIMIT 10`,
  }
  return new Promise((resolve, reject) => {
    pool.query(query, (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows)
    })
  })
}

const getUser = (username, password) => {
  const query = {
    text: `SELECT *
           FROM users 
           WHERE username = ($1) 
           AND password = ($2)`,
    values: [username, password]
  }
  return new Promise((resolve, reject) => {
    pool.query(query, (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows)
    })
  })
}

const getLikedRecipes = (likedRecipesList) => {
  likeList = likedRecipesList.split(",")
  const query = {
    text: `SELECT *
           FROM recipes 
           WHERE id = ANY ($1)`,
    values: [likeList]
  }
  return new Promise(function (resolve, reject) {
    pool.query(query , (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows)
    })
  })
}

const setLiked = (recipeID, update) => {
  const query = {
    text: `UPDATE recipes 
           SET likes = likes + ($1) 
           WHERE id = ($2)`,
    values: [update, recipeID]
  }
  return new Promise(function (resolve, reject) {
    pool.query(query, (error, results) => {
      if (error) {
        console.log(error)
        reject(error)
      }
      resolve(results)
    })
  })
}

const updateUserLiked = (userID, recipeID, type) => {
  const query = {
    text: `UPDATE users
           SET liked_recipes = array_${type}(liked_recipes, ($2))
           WHERE uuid = ($1)`,
    values: [userID, recipeID]
  }
  return new Promise(function (resolve, reject) {
    pool.query(query, (error, results) => {
      if (error) {
        console.log(error)
        reject(error)
      }
      resolve(results)
    })
  })
}

const updateUser = (uuid, username, password, user_avatar) => {
  const query = {
    text: `UPDATE users 
           SET username = ($1), avatar_link = ($2)
           WHERE uuid = ($3) 
           AND password = ($4)`,
    values: [username, user_avatar, uuid, password]
  }
  return new Promise((resolve, reject) => {
    pool.query(query, (error, results) => {
      if (error) {
        console.log(error);
        reject(error);
      }
      resolve(results.rows)
    })
  })
}

module.exports = {
  getRecipeNames,
  getIngredientNames,
  getUser,
  getLikedRecipes,
  putUserInfo,
  setLiked,
  updateUserLiked,
  updateUser,
};
