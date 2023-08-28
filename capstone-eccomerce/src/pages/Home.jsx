import  React from "react";
import { Navbar } from '../components/Navbar'
// import { Link } from 'react-router-dom';

export const Home = ({products}) => {
    console.log("products", products)
    const cardItem = (products) => {
        return (
          <div className="card my-5 py-4" key={products.id} style={{width: "18rem"}}>
          <div className="card-body text-center">
            <h5 className="card-title">{products.title}</h5>
            <p className="lead">${products.price}</p>
            <button onClick={() => console.log("hello")}> Click me </button>
            {/* <Link to={`/products`} onClick={() => console.log("hello")}> Buy Now </Link> */}
          </div>
        </div>
        );
    }
      
  return (
    <>
    <Navbar/>
    <div>{products.map(cardItem)}</div>
    </>
  )
}
