import { React, useState } from "react";
import { Alert } from "react-bootstrap";
import { Navbar } from "../components/Navbar";
import styled from "styled-components";

const StyledButton = styled.button`
  background: #00c3ff;
  color: white;
  font-size: 1em;
  font-weight: 500;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
`;

const SearchInput = styled.input`
  padding: 8px;
  margin: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;
const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
`;

const LoginCard = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 16px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  width: 300px;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export function LogIn({ handleLogout }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();
    fetch("https://fakestoreapi.com/auth/login", {
      method: "POST",
      body: JSON.stringify({
        username: email,
        password: password
      }),
    })   
    .then(res=>res.json())
    .then(json=>console.log(json))
  }

  return (
    <>
      <Navbar />
      <LoginContainer>
      <LoginCard>
        <h2>Login</h2>
        <LoginForm onSubmit={handleSubmit}>
          <div>
            <SearchInput
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
          </div>
          <div>
            <SearchInput
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </div>
          <StyledButton type="submit">Login</StyledButton>
        </LoginForm>
      </LoginCard>
    </LoginContainer>
      
      <div>
        {errors.map((error) => (
          <Alert variant="primary" key={error}>
            {error}
          </Alert>
        ))}
      </div>
    </>
  );
}
