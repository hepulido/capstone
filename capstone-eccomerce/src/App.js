import { React, useState, useEffect } from "react";
import { Home } from './pages/Home';
import { Route, Routes } from "react-router-dom";
import './App.css';
import { LogIn } from './pages/LogIn';

function App() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then(res => res.json())
      .then((productsArr) => {
        console.log(productsArr)
        setProducts(productsArr);
      });
  }, []);
  console.log("products", products)
  return (
    <div className="App">
     <Routes>
          <Route
            exact
            path="/"
            element={
              <Home products={products}/>
            }
          />
             <Route
            exact
            path="/logIn"
            element={
              <LogIn/>
            }
          />
      </Routes>
    </div>
  );
}

export default App;
