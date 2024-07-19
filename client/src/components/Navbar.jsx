// Navbar.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useCookies } from "react-cookie";

const Navbar = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();
  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.removeItem("userID");
    navigate("/auth");
  };
  return (
    <NavbarContainer>
      <Link to="/">
        <Logo>Recipe App</Logo>
      </Link>
      <div>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/create-recipe">Create Recipe</NavLink>
        <NavLink to="/saved-recipe">Saved Recipes</NavLink>
        {!cookies.access_token ? (
          <NavLink to="/auth">Login/Register</NavLink>
        ) : (
          <button
            style={{ backgroundColor: "#646cff", color: "white" }}
            onClick={logout}
          >
            Logout
          </button>
        )}
      </div>
    </NavbarContainer>
  );
};

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #333;
  padding: 1rem 2rem;
  position: sticky;
  top: 0;
  z-index: 1000;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  margin: 0 1rem;
  font-size: 1.2rem;

  &:hover {
    color: #ddd;
  }

  @media (max-width: 768px) {
    margin: 0.5rem 0;
  }
`;

const Logo = styled.div`
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
`;

export default Navbar;
