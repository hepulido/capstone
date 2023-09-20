import { React, useEffect, useContext } from "react";
import { Navbar } from "../components/Navbar";

// import { Elements } from "@stripe/react-stripe-js";
import { CartContext } from "../CartContext";
// import CheckoutForm from "./CheckoutForm";


// const stripePromise = loadStripe("pk_test_51Ll5J2JOYhL55ByMxw2Kx5Qs060kJbKWmDE6H0k8x4TmYo63lSgGp4MMQIklXHuTco9rOoKc4yhVYbaWvPa0znf90093Ye30K3");

export function Checkout() {
  const { cartProducts } = useContext(CartContext);
  const total = cartProducts.reduce(function (acc, obj) { return acc + obj.price; }, 0);
  
  useEffect(() => {
    fetch('/create-checkout-session', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    
      body: JSON.stringify(
       {total: total}
      ),
    })
      .then((r) => {
        if(r.ok){
          r.json() 
          .then(() => {
           
          })
        }else {
          r.json().then((err) => console.error(err))
        }
      })
     
    }, []);
  
  
  const productDisplay = (cartItem,i) => (
    <section>
      <div key={i} className="product">
        <img src={cartItem.image} alt={cartItem.title} height="300px" />
        <div className="description">
          <h3>{cartItem.title}</h3>
          <h5>{cartItem.price}</h5>
        </div>
      </div>
    </section>
  );

 
  return (
    <>
    <Navbar/>
    {cartProducts.map(productDisplay)}
    <div>
        {total !== 0 && <h2> Total: {total}</h2>}
    </div>
  </>
  );
}
