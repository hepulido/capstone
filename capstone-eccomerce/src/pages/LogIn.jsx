import { React, useState, useContext } from "react";
import { useNavigate } from "react-router";
import { Alert } from "react-bootstrap";
import { Navbar } from "../components/Navbar";
import { CartContext } from "../CartContext";
export function LogIn({ handleLogout }) {
  const { user, setUser } = useContext(CartContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  let navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    fetch("https://fakestoreapi.com/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: email,
        password: password,
      }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          setUser(user);
          user ? navigate("/") : navigate("/cart");
        });
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }

  return (
    <>
      <Navbar />

      <div>
        <button>
          <span className="fa fa-google me-2"></span> Sign in With Google
        </button>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="form-label">
              email
            </label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div>We'll never share your email with anyone else.</div>
          </div>
          <div>
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <input type="checkbox" id="exampleCheck1" />
            <label htmlFor="exampleCheck1">Check me out</label>
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
      <div>
        {errors.map((error) => (
          <Alert variant="primary" key={error}>
            {error}
          </Alert>
        ))}
      </div>
    </>
  );
}
