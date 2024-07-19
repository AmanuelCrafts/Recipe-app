import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import { useNavigate } from "react-router-dom";

const CreateRecipe = () => {
  const userID = useGetUserID();
  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: [],
    instructions: "",
    imageUrl: "",
    cookingTime: 0,
    userOwner: userID,
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const addIngredient = () => {
    setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ""] });
  };

  const handleIngredientChange = (value, index) => {
    const newIngredients = [...recipe.ingredients];
    newIngredients[index] = value;
    setRecipe({ ...recipe, ingredients: newIngredients });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/recipes", recipe);
      alert("Recipe Created");
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <RecipeContainer>
      <RecipeTitle>Create Recipe</RecipeTitle>
      <form onSubmit={onSubmit}>
        <FormGroup>
          <FormLabel htmlFor="name">Name</FormLabel>
          <FormInput
            type="text"
            id="name"
            name="name"
            value={recipe.name}
            onChange={handleChange}
          />
        </FormGroup>
        {/* <FormGroup>
          <FormLabel htmlFor="description">Description</FormLabel>
          <FormTextarea
            name="description"
            id="description"
            value={recipe.description}
            onChange={handleChange}
          ></FormTextarea>
        </FormGroup> */}
        <FormGroup>
          <FormLabel htmlFor="ingredients">Ingredients</FormLabel>
          {recipe.ingredients.map((ingredient, index) => (
            <IngredientInputWrapper key={index}>
              <FormInput
                type="text"
                name="ingredients"
                value={ingredient}
                onChange={(event) =>
                  handleIngredientChange(event.target.value, index)
                }
              />
            </IngredientInputWrapper>
          ))}
          <AddIngredientButton type="button" onClick={addIngredient}>
            Add Ingredient
          </AddIngredientButton>
        </FormGroup>
        <FormGroup>
          <FormLabel htmlFor="instructions">Instructions</FormLabel>
          <FormTextarea
            name="instructions"
            id="instructions"
            value={recipe.instructions}
            onChange={handleChange}
          ></FormTextarea>
        </FormGroup>
        <FormGroup>
          <FormLabel htmlFor="imageUrl">Image URL</FormLabel>
          <FormInput
            type="text"
            id="imageUrl"
            name="imageUrl"
            value={recipe.imageUrl}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <FormLabel htmlFor="cookingTime">Cooking Time (minutes)</FormLabel>
          <FormInput
            type="number"
            id="cookingTime"
            name="cookingTime"
            value={recipe.cookingTime}
            onChange={handleChange}
          />
        </FormGroup>
        <SubmitButton type="submit">Create Recipe</SubmitButton>
      </form>
    </RecipeContainer>
  );
};

// Styled components
const RecipeContainer = styled.div`
  width: 90%;
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #1a1a1a;
`;

const RecipeTitle = styled.h2`
  margin-bottom: 1.5rem;
  color: #fff;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #ccc;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #333;
  border-radius: 4px;
  background-color: #2c2c2c;
  color: #fff;
`;

const FormTextarea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #333;
  border-radius: 4px;
  background-color: #2c2c2c;
  color: #fff;
`;

const IngredientInputWrapper = styled.div`
  margin-bottom: 0.75rem;
`;

const AddIngredientButton = styled.button`
  padding: 0.75rem;
  background-color: #646cff;
  color: #fff;
  border: 1px solid transparent;
  cursor: pointer;
  margin-top: 0.5rem;

  &:hover {
    background-color: #535bf2;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 1rem;
  background-color: #646cff;
  color: #fff;
  border: 1px solid transparent;
  cursor: pointer;
  margin-top: 1rem;

  &:hover {
    background-color: #535bf2;
  }
`;

export default CreateRecipe;
