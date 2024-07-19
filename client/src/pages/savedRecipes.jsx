import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";

const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userID = useGetUserID();

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/recipes/savedRecipes?userID=${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        setError("Error fetching saved recipes");
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedRecipes();
  }, [userID]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <SavedRecipesContainer>
      <Title>Saved Recipes</Title>
      <RecipeList>
        {savedRecipes.map((recipe) => (
          <RecipeItem key={recipe._id}>
            <RecipeHeader>
              <RecipeName>{recipe.name}</RecipeName>
            </RecipeHeader>
            <RecipeDescription>{recipe.description}</RecipeDescription>
            <ImageContainer>
              <RecipeImage src={recipe.imageUrl} alt={recipe.name} />
            </ImageContainer>
            <CookingTime>
              Cooking Time: {recipe.cookingTime} minutes
            </CookingTime>
          </RecipeItem>
        ))}
      </RecipeList>
    </SavedRecipesContainer>
  );
};

// Styled components
const SavedRecipesContainer = styled.div`
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

const RecipeDescription = styled.p`
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

export default SavedRecipes;
