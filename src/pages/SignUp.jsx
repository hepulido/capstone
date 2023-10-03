import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Alert } from "react-bootstrap";
import styled from "styled-components";
import { Navbar } from "../components/Navbar";

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

export function SignUp({setToken} ) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errors, setErrors] = useState([]);
  let navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    fetch("https://fakestoreapi.com/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        username: email,
        password: password,
        name: {
          firstname: firstName,
          lastname: lastName,
        },
        address: {
          city: "kilcoole",
          street: "7835 new road",
          number: 3,
          zipcode: "12926-3874",
          geolocation: {
            lat: "-37.3159",
            long: "81.1496",
          },
        },
        phone: "1-570-236-7033",
      }),
    })
      .then((r) => {
        if (r.ok) {
          return r.json();
        } else {
          throw new Error("Registration failed.");
        }
      })
      .then((res) => {
        // Handle successful registration, e.g., set user context and navigate
        navigate("/");
      })
      .catch((error) => {
        setErrors([error.message]);
      });
  }

  return (
    <>
      <Navbar />
      <LoginContainer>
        <LoginCard>
          <h2>Sign Up</h2>
          <LoginForm onSubmit={handleSubmit}>
            <SearchInput
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
            />

            <SearchInput
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
            />

            <SearchInput
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
            />

            <SearchInput
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />

            <SearchInput
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />

            <SearchInput
              type="password"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              placeholder="Confirm Password"
            />

            <StyledButton type="submit">Register</StyledButton>
          </LoginForm>
        </LoginCard>
        <div>
          {errors.map((error) => (
            <Alert variant="primary" key={error}>
              {error}
            </Alert>
          ))}
        </div>
      </LoginContainer>
    </>
  );
}
