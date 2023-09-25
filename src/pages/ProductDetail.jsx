import React, { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Navbar } from "../components/Navbar";
import { CartContext } from "../CartContext";
import styled from "styled-components";


const ContainerDeatailCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px;
`;
const TitleDeatailCard = styled.div`
max-width:750px
 font-size: 26px;
`;
const ProductDesc = styled.div`
 font-size: 22px;
 max-width: 750px;
 margin: 15px auto;
 font-weight: 500;
`;
const PriceProduct = styled.div`
font-size: 24px;
margin-bottom: 10px;
font-weight: 700;
`;
const ButtonCard = styled.div`
  color: white;
  background: #00c3ff;
  font-weight: 500;
  font-size: 1.5em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid #00c3ff;
  border-radius: 3px;
`;
export function ProductDetail({ currentProduct }) {
  const [cartBtn, setCartBtn] = useState("Add to Cart");
  const { cartProducts, setCartProducts } = useContext(CartContext);
  let navigate = useNavigate();

  const handlePostCart = async (product) => {
    const newCartProducts = [...cartProducts, product];
    if (cartBtn === "Add to Cart") {
      setCartBtn("Remove from Cart");
    } else {
      setCartBtn("Add to Cart");
    }

    await fetch("https://fakestoreapi.com/carts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        newCartProducts,
      }),
    }).then((r) => {
      if (r.ok) {
        setCartProducts(newCartProducts);
        // navigate("/")
      } else {
        r.json().then((err) => console.error(err));
      }
    });
  };

  return (
    <>
    <Navbar/>
      <ContainerDeatailCard>
      <TitleDeatailCard>
      <h1>{currentProduct.title}</h1>
      </TitleDeatailCard>
          <div>
            <img
              src={currentProduct.image}
              alt={currentProduct.title}
              width="400"
              height="500px"
            />
          </div>
           <ProductDesc>
            {currentProduct.description}
            </ProductDesc>
            <PriceProduct>${currentProduct.price}</PriceProduct>
            <ButtonCard
              onClick={() => {
                handlePostCart(currentProduct);
              }}
              className="btn btn-outline-primary my-5"
            >
              {cartBtn}
            </ButtonCard>
      </ContainerDeatailCard>
    </>
  );
}
