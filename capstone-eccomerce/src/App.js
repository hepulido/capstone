import { React, useState, useEffect } from "react";
import { Home } from "./pages/Home";
import { ProductDetail } from "./pages/ProductDetail";
import { SignUp } from "./pages/SignUp";
import { Cart } from "./pages/Cart";
import { Checkout } from "./pages/Checkout";
import { About } from "./pages/About";
import { PaymentComplete } from "./pages/PaymentComplete";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { LogIn } from "./pages/LogIn";
import { CartContext } from "./CartContext";

function App() {
  const [products, setProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState({});
  const [cartProducts, setCartProducts] = useState([]);
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((productsArr) => {
        setProducts([...productsArr]);
      });
  }, []);
  let deleteProductCart = (productId) => {
    let deleted = cartProducts.filter((product) => product.id !== productId);
    setCartProducts(deleted);
  };

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
              <Home products={products} handleOnProduct={handleOnProduct} />
            }
          />
          <Route
            exact
            path="/productDetail/:id"
            element={<ProductDetail currentProduct={currentProduct} />}
          />
          <Route exact path="/logIn" element={<LogIn user={user} />} />
          <Route exact path="/signIn" element={<SignUp />} />
          <Route
            exact
            path="/cart"
            element={
              <Cart
                products={products}
                currentProduct={currentProduct}
                handleDeleted={deleteProductCart}
              />
            }
          />
          <Route
            exact
            path="/checkout"
            element={
              <Checkout
                products={products}
                currentProduct={currentProduct}
              />
            }
          />
          <Route
            exact
            path="/paymentcomplete"
            element={
              <PaymentComplete />
            }
          />
          <Route
            exact
            path="/about"
            element={
              <About/>
            }
          />
        </Routes>
      </CartContext.Provider>
    </div>
  );
}

export default App;
