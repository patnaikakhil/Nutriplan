import React, { useState, useEffect } from 'react';
import axios from 'axios';

function RecipeList() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    // Fetch recommended recipes from the backend
    axios.get('/api/recipes')
      .then(response => {
        setRecipes(response.data);
      })
      .catch(error => {
        console.error('Error fetching recipes:', error);
      });
  }, []);

  return (
    <div>
      <h2>Recommended Recipes</h2>
      <ul>
        {recipes.map((recipe, index) => (
          <li key={index}>
            <h3>{recipe.name}</h3>
            <p>{recipe.description}</p>
            <p>Calories: {recipe.calories}</p>
            <p>Protein: {recipe.protein}g</p>
            <p>Carbohydrates: {recipe.carbohydrates}g</p>
            <p>Fats: {recipe.fats}g</p>
            <p>Fiber: {recipe.fiber}g</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecipeList;
