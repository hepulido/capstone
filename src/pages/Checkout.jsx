import { React, useContext } from "react";
import { Navbar } from "../components/Navbar";
import { CheckoutForm } from "./CheckoutForm";
import styled from "styled-components";
import { CartContext } from "../CartContext";

const LastContainer = styled.div`
  margin: 1rem 1rem;
  flex-direction: row;
  justify-content: center;
  align-items: baseline;
  flex-grow: 1;
`;
const ContainerCard = styled.div`
  margin: 1rem 1rem;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
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
const ProductImage = styled.div``;
const PriceProduct = styled.div`
  font-size: 18px;
  margin: 6px 6px;
  font-weight: 700;
`;
export function Checkout() {
  const { cartProducts } = useContext(CartContext);
  const total = cartProducts.reduce(function (acc, obj) {
    return acc + obj.price;
  }, 0);

  const productDisplay = (cartItem, i) => {
    return (
      <ContainerCard key={i}>
        <CardBody>
          <CardTitle>
            <h5>{cartItem.title}</h5>
          </CardTitle>
          <ProductImage>
            <img
              src={cartItem.image}
              style={{ width: "100px", height: "120px" }}
              alt={cartItem.title}
            />
          </ProductImage>
          <PriceProduct className="lead">${cartItem.price}</PriceProduct>
        </CardBody>
      </ContainerCard>
    );
  };

  return (
    <>
      <Navbar />
      <LastContainer>{cartProducts.map(productDisplay)}</LastContainer>
      {total !== 0 && <h2> Total: {total}</h2>}
      <CheckoutForm />
    </>
  );
}
