import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Auth = () => {
  return (
    <AuthContainer>
      <Login />
      <Separator />
      <Register />
    </AuthContainer>
  );
};

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [_, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("https://recipe-app-backend-e1cw.onrender.com/auth/login", {
        username,
        password,
      });

      setCookies("access_token", response.data.token);
      window.localStorage.setItem("userID", response.data.userID);
      toast.success("Login successful", { autoClose: 3000 });

      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error(
        `Login failed: ${err.response?.data?.message || "An error occurred"}`
      );
    }
  };

  return (
    <Form
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      label="Login"
      onSubmit={onSubmit}
    />
  );
};

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:3001/auth/register", {
        username,
        password,
      });
      toast.success("Registration completed! Now login", { autoClose: 3000 });
    } catch (err) {
      console.error(err);
      toast.error(
        `Registration failed: ${
          err.response?.data?.message || "An error occurred"
        }`
      );
    }
  };

  return (
    <Form
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      label="Register"
      onSubmit={onSubmit}
    />
  );
};

const Form = ({
  username,
  setUsername,
  password,
  setPassword,
  label,
  onSubmit,
}) => {
  return (
    <FormContainer>
      <FormTitle>{label}</FormTitle>
      <form onSubmit={onSubmit}>
        <FormGroup>
          <FormLabel htmlFor="username">{label} Username:</FormLabel>
          <FormInput
            type="text"
            id="username"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <FormLabel htmlFor="password">Password:</FormLabel>
          <FormInput
            type="password"
            id="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormGroup>
        <SubmitButton type="submit">{label}</SubmitButton>
      </form>
    </FormContainer>
  );
};

// Styled components
const AuthContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 2rem;
  background-color: #242424;
  gap: 5rem;

  @media (min-width: 768px) {
    flex-direction: row;
    padding: 0 2rem;
  }
`;

const FormContainer = styled.div`
  width: 90%;
  max-width: 400px;
  padding: 2rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #1a1a1a;
  margin: 1rem 0;

  @media (min-width: 768px) {
    width: 300px;
  }
`;

const FormTitle = styled.h2`
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

const SubmitButton = styled.button`
  width: 100%;
  padding: 1rem;
  background-color: #646cff;
  color: #fff;
  border: 1px solid transparent;
  cursor: pointer;

  &:hover {
    background-color: #535bf2;
  }
`;

const Separator = styled.div`
  width: 100%;
  height: 1px;
  background-color: #333;

  @media (min-width: 768px) {
    width: 1px;
    height: 100%;
  }
`;

export default Auth;
