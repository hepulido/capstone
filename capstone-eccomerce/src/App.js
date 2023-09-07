import { React, useState, useEffect } from "react";
import { Home } from './pages/Home';
import { ProductDetail } from "./pages/ProductDetail";
import { SignIn } from "./pages/SignIn";
import { Route, Routes } from "react-router-dom";
import './App.css';
import { LogIn } from './pages/LogIn';

function App() {
  const [products, setProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState({});
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then(res => res.json())
      .then((productsArr) => {
        console.log(productsArr)
        setProducts(productsArr);
      });
  }, []);
  console.log("products", products)
  const handleOnProduct = (product) => setCurrentProduct({ ...product });
  return (
    <div className="App">
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
    </div>
  );
}

export default App;
