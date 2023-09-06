import  React from "react";
import { Navbar } from '../components/Navbar'
import { Link } from 'react-router-dom';

export const Home = ({products, handleOnProduct}) => {
    console.log("products", products)
    const cardItem = (products) => {
        return (
          <div className="" key={products.id} style={{width: "18rem"}}>
          <div className="card-body text-center">
            <h5 className="card-title">{products.title}</h5>
            <p className="lead">${products.price}</p>
            <img src={products.image} className="card-img-top" style={{width: "88px"}} alt={products.title}/>
            <Link to={`/productDetail/${products.id}`} onClick={() =>{handleOnProduct(products)}}> Buy Now </Link>
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
