import  React from "react";
import { Navbar } from '../components/Navbar'

export const Home = ({products}) => {
    console.log("products", products)
   
  return (
    <>
    <Navbar/>
    <div>{products}</div>
    </>
  )
}
