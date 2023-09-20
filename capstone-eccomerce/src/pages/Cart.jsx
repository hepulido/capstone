import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert } from "react-bootstrap";
import { CartContext } from "../CartContext";
import { Navbar } from "../components/Navbar";
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
  font-size: 20px;
  max-width: 750px;
  margin: 15px auto;
  font-weight: 400;
`;
const PriceProduct = styled.div`
  font-size: 24px;
  font-weight: 700;
`;
const WrapperButton = styled.div`
  display: flex;
`;
const ButtonCard = styled.div`
  color: white;
  background: #00c3ff;
  font-weight: 500;
  font-size: 1em;
  margin: 1em 0.25em;
  padding: 0.25em 1em;
  border: 2px solid #00c3ff;
  border-radius: 3px;
`;
export function Cart({ products, handleDeleted }) {
  const { cartProducts, setCartProducts } = useContext(CartContext);
  const { user } = useContext(CartContext);
  const { cart } = useContext(CartContext);
  const { currentUser, setCurrentUser } = useState(user);

  // let { id } = user;

  useEffect(() => {
    fetch("https://fakestoreapi.com/carts/user").then((response) => {
      if (response.ok) {
        response
          .json()
          .then
          // (cart) => {
          // setCartProducts(cart);
          ();
      } else {
        response.json().then((err) => console.error(err));
      }
    });
  }, []);

  useEffect(() => {
    fetch("https://fakestoreapi.com/users")
      .then((res) => res.json())
      .then((json) => console.log(json));
  }, []);

  let handleUpdate = async (product) => {
    const newCartProducts = cartProducts.map((item) => {
      return item.id === product.id ? product : item;
    });
    setCartProducts(newCartProducts);
    await fetch("https://fakestoreapi.com/carts/user", {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        newCartProducts,
      }),
    }).then((res) => res.json());
  };

  let handleDeleteProduct = async (product) => {
    const newCartProducts = cartProducts.filter((item) => {
      return item.id !== product.id;
    });
    await fetch("https://fakestoreapi.com/carts", {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        newCartProducts,
      }),
    });
    setCartProducts(newCartProducts);
  };

  let handleDelete = (products) => {
    products.splice(0, products.length);
    fetch("https://fakestoreapi.com/carts", {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => handleDeleted(products));
  };

  const newCartProducts = [...cartProducts];
  const handlePostOrder = async () => {
    await fetch("/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ newCartProducts }),
    }).then((r) => {
      if (r.ok) {
        setCartProducts(newCartProducts);
      } else {
        r.json().then((err) => console.error(err));
      }
    });
  };

  const total = cartProducts.reduce(function (acc, obj) {
    return acc + obj.price;
  }, 0);

  let count = 0;
  const cartItems = (cartItem, i) => {
    return (
      <ContainerDeatailCard key={i}>
        <TitleDeatailCard>
          <h1>{cartItem.title}</h1>
        </TitleDeatailCard>
        <div>
          <img
            src={cartItem.image}
            alt={cartItem.title}
            width="250"
            height="300px"
          />
        </div>
        <ProductDesc>{cartItem.description}</ProductDesc>
        <PriceProduct>${cartItem.price}</PriceProduct>
        <h4>
          <span>Quantity: {count} </span>
        </h4>
        <WrapperButton>
          <ButtonCard
            onClick={() => {
              count++;
              handleUpdate(cartItem);
            }}
          >
            +
          </ButtonCard>
          <ButtonCard
            onClick={() => {
              if (cartItem.quantity > 0) {
                count--;
                handleUpdate(cartItem);
              }
            }}
          >
            -
          </ButtonCard>
        </WrapperButton>
        <ButtonCard
          onClick={() => {
            handleDeleteProduct(cartItem);
          }}
          style={{ "margin-top": "10px" }}
        >
          Delete Product
        </ButtonCard>
      </ContainerDeatailCard>
    );
  };

  const emptyCart = () => {
    return (
      <div className="px-4 my-5 bg-light rounded-3 py-5">
        <div className="container py-4">
          <div className="row">
            <h3> Your Cart is Empty</h3>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <div className="container ">
        <div className="d-lg-flex  justify-content-end">
          {cartProducts.length !== 0 && (
            <button
              onClick={() => {
                handleDelete(cartProducts);
              }}
              className="btn btn-outline-primary my-5 "
            >
              Delete All The Products On Cart
            </button>
          )}
        </div>
      </div>
      {cartProducts.length === 0 && emptyCart()}
      {cartProducts.length !== 0 && cartProducts.map(cartItems)}

      <div className="container py-4">
        <div className="row">
          <div className="d-lg-flex  justify-content-end">
            {total !== 0 && <h2> Total: {total}</h2>}
          </div>
        </div>
      </div>
      <div className="container py-4">
        <div className="row">
          <div className="d-grid col-6 d-md-flex justify-content-md-end">
            {/* {user ? (
              <Link
                onClick={() => {
                  // handleCart(cartItem)
                  handlePostOrder();
                }}
                to="/checkout"
              >
                <span>Checkout</span>
              </Link>
            ) : (
              <Alert variant="primary" style={{ color: "red" }}>
                To continue with your purchase, please Login.
              </Alert>
            )} */}
            <ButtonCard>
            <Link
                onClick={() => {
                  // handleCart(cartItem)
                  handlePostOrder();
                }}
                to="/checkout"
              >
                <span>Checkout</span>
              </Link>
              </ButtonCard>
          </div>
        </div>
      </div>
    </>
  );
}
