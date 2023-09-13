import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Alert } from "react-bootstrap";

import { CartContext } from "../CartContext";

export  function Cart({ products, handleDeleted }) {
  const { cartProducts, setCartProducts } = useContext(CartContext);
  const { user } = useContext(CartContext);
  let {id, quantity} = products;
  
  let handleUpdate = async (product) => {
    const newCartProducts = cartProducts.map((item) => {
      return item.id === product.id ? product : item
    })
    setCartProducts(newCartProducts)
    await fetch(`https://fakestoreapi.com/carts/user/${id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        newCartProducts,
        quantity: quantity
      }),
    })
      .then((res) => res.json())
     
  };

  let handleDeleteProduct = async (product) => {
    const newCartProducts = cartProducts.filter((item) => {
      return item.id !== product.id;
    })
      await fetch(`https://fakestoreapi.com/carts/${id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
       newCartProducts,
       
      }),
      
    })
    setCartProducts(newCartProducts)
      
  };



  let handleDelete = (products) => {
    products.splice(0, products.length)
    fetch(`https://fakestoreapi.com/carts/${id}`, {
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
        setCartProducts(newCartProducts)
      } else {
        r.json().then((err) => console.error(err));
      }
    });
  };
 
  const total = cartProducts.reduce(function (acc, obj) {
    return acc + obj.price;
  }, 0);
 
  let count = 0
  const cartItems = (cartItem, i) => {
    return (
      <div key={i} className="container my-5 py-3">
        <div className="row">
          <div className="col-md-6 d-flex justify-content-center mx-auto product">
            <img src={cartItem.image} alt={cartItem.title} height="300px" />
          </div>
          <div className="col-md-6 d-flex flex-column justify-content-center">
            <h1 className="display-5 fw-bold">{cartItem.title}</h1>
            <hr />
            <p className="lead">{cartItem.description}</p>
            <h2 className="my-4">${cartItem.price}</h2>
            <h4>
              <span>Quantity: {count} </span>
            </h4>
            <div className="d-grid gap-2 col-6 d-md-flex ">
              <button
                className="btn btn-outline-primary btn-sm"
                onClick={() => {
                  count++
                  handleUpdate(cartItem);
                }}
              >
                +
              </button>
              <button
                className="btn btn-outline-primary btn-sm"
                onClick={() => {
                  if (cartItem.quantity > 0){
                    count--
                    handleUpdate(cartItem ) 
                  }
                 }}
              >
                -
              </button>
            </div>
            <button
          onClick={() => {
           handleDeleteProduct(cartItem);
            }}
          className="btn-close"
          aria-label="close"
          style={{"margin-top": "10px"}}
        >Delete Product</button>
          </div>
        </div>
      </div>
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
     <div className="container ">
        <div className="d-lg-flex  justify-content-end">
          {cartProducts.length !== 0 &&
          <button onClick={() => {
                 handleDelete(cartProducts);
                }} 
                className="btn btn-outline-primary my-5 "
              >
              Delete All The Products On Cart
            </button>
          }
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
            {user ? (
              <Link
                onClick={() => {
                  // handleCart(currentProduct)
                  handlePostOrder();
                }}
                to="/checkout"
                className="btn btn-outline-primary btn-lg"
              >
                <span>Checkout</span>
              </Link>
            ) : (
              <Alert variant="primary">
                To continue with your purchase, please Login.
              </Alert>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
