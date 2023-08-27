import { React, useState, useEffect } from "react";
import { Home } from './pages/Home';
import './App.css';

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
     <Home products={products}/>
    </div>
  );
}

export default App;
