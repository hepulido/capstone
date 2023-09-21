import React from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Link } from "react-router-dom";
import styled from "styled-components";

const ContainerCard = styled.div`
  margin: 1rem 1rem;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: baseline;
  flex-grow: 1;
`;
const CardBody = styled.div`
  width: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px;
  border: 1px solid #00c3ff;
  border-radius: 10px;
`;
const CardTitle = styled.div`
  max-width: 250px;
  font-size: 18px;
`;
const ProductImage = styled.div`
`;
const PriceProduct = styled.div`
font-size: 18px;
margin:6px 6px;
font-weight: 700;
`;
const ButtonCard = styled.div`
  background: #00c3ff;
  font-weight: 500;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid #00c3ff;
  border-radius: 3px;
`;
export const Home = ({ products, handleOnProduct }) => {
  const cardItem = (products) => {
    return (
      <ContainerCard key={products.id}>
        <CardBody>
          <CardTitle>
            <h5>{products.title}</h5>
          </CardTitle>
          <ProductImage>
            <img
              src={products.image}
              style={{ width: "80px", height: "90px" }}
              alt={products.title}
            />
          </ProductImage>
          <PriceProduct className="lead">${products.price}</PriceProduct>
          <ButtonCard>
          <Link
            style={{ textDecoration: "none", color: "white"}}
            to={`/productDetail/${products.id}`}
            onClick={() => {
              handleOnProduct(products);
            }}
          >
            {" "}
            See Product Detail{" "}
          </Link>
          </ButtonCard>
        </CardBody>
      </ContainerCard>
    );
  };

  return (
    <>
      <Navbar />
      <ContainerCard>{products.map(cardItem)}</ContainerCard>
      <Footer />
    </>
  );
};
