import React, { useState, useEffect } from "react";
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
const ProductImage = styled.div``;
const PriceProduct = styled.div`
  font-size: 18px;
  margin: 6px 6px;
  font-weight: 700;
`;
const ContainerSearch = styled.div`
  margin: 1rem 1rem;
  display: flex;
  flex-direction: row;
  align-items: baseline;
  flex-grow: 1;
`;
const SearchTitle = styled.div`
  font-size: 22px;
  font-weight: 500;
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
export const Home = ({ products, setProducts, handleOnProduct }) => {
  const [category, setCategory] = useState("");
  const fetchProducts = (category) => {
    fetch(`https://fakestoreapi.com/products/category/${category}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to fetch products.");
        }
      })
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.log([error.message]);
      });
  };

  useEffect(() => {
    if (category === "") {
      fetch("https://fakestoreapi.com/products")
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Failed to fetch products.");
          }
        })
        .then((data) => {
          setProducts(data);
        })
        .catch((error) => {
          console.log([error.message]);
        });
    } else {
      fetchProducts(category);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  const handleSearch = () => {
    fetchProducts(category);
  };
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
              style={{ textDecoration: "none", color: "white" }}
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
      <ContainerSearch>
        <SearchTitle htmlFor="category">Category:</SearchTitle>
        <SearchInput
          type="text"
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Enter category"
        />
        <StyledButton onClick={handleSearch}>Search Products</StyledButton>
      </ContainerSearch>
      <ContainerCard>{products.map(cardItem)}</ContainerCard>
      <Footer />
    </>
  );
};
