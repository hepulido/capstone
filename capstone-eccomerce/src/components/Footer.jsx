import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { mobile } from "../responsive";

const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  background: #00c3ff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

// const Language = styled.span`
//   font-size: 14px;
//   cursor: pointer;
//   ${mobile({ display: "none" })}
// `;

// const SearchContainer = styled.div`
//   border: 0.5px solid lightgray;
//   display: flex;
//   align-items: center;
//   margin-left: 25px;
//   padding: 5px;
// `;

// const Input = styled.input`
//   border: none;
//   ${mobile({ width: "50px" })}
// `;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  text-decoration: none;
  color: white;
  ${mobile({ fontSize: "24px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

export const Footer = () => {
  return (
    <Container>
      <Wrapper>
        <Left>
        <h3>&copy; CAPSTONE STORE, 2023. All rights reserved.</h3>
        </Left>
        <Center>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Logo>CAPSTONE STORE</Logo>
          </Link>
        </Center>
        <Right>
        <Link to="/about" style={{ textDecoration: "none" }}>
          <MenuItem>About</MenuItem>
          </Link>
          <Link to="/LogIn" style={{ textDecoration: "none" }}>
            <MenuItem>Instagram</MenuItem>
          </Link>
          <Link to="/SignIn" style={{ textDecoration: "none" }}>
            <MenuItem>Linkedin</MenuItem>
          </Link>
          <MenuItem>
            <Link to="/Cart" style={{ textDecoration: "none" }}>
              Facebook
            </Link>
          </MenuItem>
        </Right>
      </Wrapper>
    </Container>
  );
};