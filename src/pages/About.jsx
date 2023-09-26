import React from "react";
import { Link } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import styled from "styled-components";
import { mobile } from "../responsive";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
`;
const AboutCard = styled.div`
  background-color: white;
  text-align: center;
  font-size: 18px;
  font-weight: 500;
  border-radius: 10px;
  padding: 16px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  max-width: 1000px;

  ${mobile({ width: "100vw" })}
`;
export function About() {
  return (
    <>
      <Navbar />
      <Container>
        <AboutCard>
          <h1>About Us</h1>
          <p>
            Our work is above all joyful. We do what we love, and we love what
            we do. Our pieces help mark new chapters, close old ones, remind us
            of our roots, and launch new lifetimes..
            <br />
            <br />
            We are a store located in Miami Florida, we have many years of
            experience in the market, this company was created based on a
            Fullsctack Academy school project and ended up being a reality.
          </p>
          <Link to="/" style={{ textDecoration: "none" }}>
            Contact Us
          </Link>
        </AboutCard>
      </Container>
    </>
  );
}
