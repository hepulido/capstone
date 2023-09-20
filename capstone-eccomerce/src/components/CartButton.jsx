import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";

export default function CartButton() {
  return (
    <>
      <Link to="/cart">{AiOutlineShoppingCart}</Link>
    </>
  );
}
