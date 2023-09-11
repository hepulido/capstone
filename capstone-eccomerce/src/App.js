import { React, useState, useEffect } from "react";
import { Home } from './pages/Home';
import { ProductDetail } from "./pages/ProductDetail";
import { SignIn } from "./pages/SignIn";
import { Route, Routes } from "react-router-dom";
import './App.css';
import { LogIn } from './pages/LogIn';
import { CartContext } from "./CartContext";

function App() {
  const [products, setProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState({});
  const [cartProducts, setCartProducts] = useState([]);
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then(res => res.json())
      .then((productsArr) => {
        console.log(productsArr)
        setProducts([...productsArr]);
      });
  }, []);
  
  useEffect(() => {
    fetch('https://fakestoreapi.com/users').then((response) => {
      if (response.ok) {
        response.json().then((user) => {
          setUser(user);
          console.log(user, "user1")
        });
      } else {
        response.json().then((err) => console.error(err));
      }
    });
  }, []);
  
  useEffect(() => {
    fetch('https://fakestoreapi.com/carts').then((response) => {
      if (response.ok) {
        response.json().then((cart) => {
          setCartProducts(cart);
          console.log(cart, "cart1")
        });
      } else {
        response.json().then((err) => console.error(err));
      }
    });
  }, []);
  
  const handleOnProduct = (product) => setCurrentProduct({ ...product });
  return (
    <div className="App">
      <CartContext.Provider
        value={{ cartProducts, setCartProducts, user, setUser, cart, setCart }}
      >
     <Routes>
          <Route
            exact
            path="/"
            element={
              <Home products={products} handleOnProduct={handleOnProduct}/>
            }
          />
            <Route
            exact
            path="/productDetail/:id"
            element={
              <ProductDetail currentProduct={currentProduct}/>
            }
          />
             <Route
            exact
            path="/logIn"
            element={
              <LogIn/>
            }
          />
           <Route
            exact
            path="/signIn"
            element={
              <SignIn/>
            }
          />
      </Routes>
      </CartContext.Provider>
    </div>
  );
}

export default App;
