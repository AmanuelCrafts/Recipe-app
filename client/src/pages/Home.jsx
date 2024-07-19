import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userID = useGetUserID();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("http://localhost:3001/recipes");
        setRecipes(response.data);
      } catch (err) {
        console.error("Error fetching recipes:", err);
      }
    };

    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/recipes/savedRecipes/ids/${userID}`
        );
        console.log("Saved recipes response:", response.data);
        setSavedRecipes(response.data.savedRecipes || []); // Ensure savedRecipes is always an array
      } catch (err) {
        console.error("Error fetching saved recipes:", err);
      }
    };

    if (userID) {
      fetchRecipes();
      fetchSavedRecipes();
    }
  }, [userID]); // Add userID as a dependency

  const saveRecipe = async (recipeID) => {
    try {
      const response = await axios.post("http://localhost:3001/recipes/save", {
        recipeID,
        userID, // Make sure userID is defined in your scope
      });
      setSavedRecipes(response.data.savedRecipes);
    } catch (err) {
      console.error("Error saving recipe:", err);
    }
  };

  const isRecipeSaved = (id) =>
    Array.isArray(savedRecipes) && savedRecipes.includes(id);

  return (
    <HomeContainer>
      <Title>Recipes</Title>
      <RecipeList>
        {recipes.map((recipe) => (
          <RecipeItem key={recipe._id}>
            <RecipeHeader>
              <RecipeName>{recipe.name}</RecipeName>
              <SaveButton
                onClick={() => saveRecipe(recipe._id)}
                disabled={isRecipeSaved(recipe._id)}
                aria-label={
                  isRecipeSaved(recipe._id)
                    ? "Recipe already saved"
                    : "Save recipe"
                }
              >
                {isRecipeSaved(recipe._id) ? "Saved" : "Save"}
              </SaveButton>
            </RecipeHeader>
            <RecipeInstructions>{recipe.instructions}</RecipeInstructions>
            <ImageContainer>
              <RecipeImage src={recipe.imageUrl} alt={recipe.name} />
            </ImageContainer>
            <CookingTime>
              Cooking Time: {recipe.cookingTime} minutes
            </CookingTime>
          </RecipeItem>
        ))}
      </RecipeList>
    </HomeContainer>
  );
};

// Styled components
const HomeContainer = styled.div`
  width: 90%;
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #1a1a1a;
`;

const Title = styled.h1`
  color: #fff;
  margin-bottom: 2rem;
  text-align: center;
  font-size: 2.5rem;
`;

const RecipeList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const RecipeItem = styled.li`
  border: 1px solid #333;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  background-color: #2c2c2c;
  color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const RecipeHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const RecipeName = styled.h2`
  margin: 0;
  color: #fff;
  font-size: 1.8rem;
`;

const SaveButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #646cff;
  color: #fff;
  border: 1px solid transparent;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #535bf2;
  }

  &:disabled {
    background-color: #444;
    cursor: not-allowed;
  }
`;

const RecipeInstructions = styled.p`
  margin: 1rem 0;
  color: #ccc;
  line-height: 1.6;
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 1rem 0;
`;

const RecipeImage = styled.img`
  width: 100%;
  max-width: 400px;
  height: auto;
  border-radius: 8px;
  object-fit: cover;
`;

const CookingTime = styled.p`
  color: #ccc;
  text-align: center;
  font-size: 1.1rem;
`;

export default Home;
