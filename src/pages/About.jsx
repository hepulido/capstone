import React from "react";
import { Link } from "react-router-dom";
import { Navbar } from "../components/Navbar";

export function About() {
  return (
    <div>
      <Navbar />
      <div className="container py-5 my-5">
        <div className="row">
          <div className="col-md-6">
            <h1 className="text-primary fw-bold mb-4">About Us</h1>
            <p className="lead mb-4">
              Our work is above all joyful. We do what we love, and we love what
              we do. Our pieces help mark new chapters, close old ones, remind
              us of our roots, and launch new lifetimes..
              <br />
              We are a store located in Miami Florida, we have many years of
              experience in the market, this company was created based on a
              Fullsctack Academy school project and ended up being a reality.
            </p>
            <Link to="/" style={{ textDecoration: "none" }}>
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
