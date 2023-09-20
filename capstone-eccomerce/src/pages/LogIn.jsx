import { React, useState, useContext } from "react";
import { useNavigate } from "react-router";
import { Alert } from "react-bootstrap";
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
      {/* <!-- Button trigger modal --> */}
      <button
        type="button"
        className="btn btn-outline-primary ms-auto"
        data-bs-toggle="modal"
        data-bs-target="#loginModal"
      >
        <span className="fa-solid fa-user-plus me-1"></span> Login
      </button>

      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="loginModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                <span className="fa fa-arrow-right-to-bracket me-1"></span>{" "}
                Login
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <button className="btn btn-outline-primary w-100 mb-4">
                <span className="fa fa-google me-2"></span> Sign in With Google
              </button>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    email
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    aria-describedby="emailHelp"
                  />
                  <div id="emailHelp" className="form-text">
                    We'll never share your email with anyone else.
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="mb-3 form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="exampleCheck1"
                  />
                  <label className="form-check-label" htmlFor="exampleCheck1">
                    Check me out
                  </label>
                </div>
                <button type="submit" className="btn btn-outline-primary w-100">
                  Login
                </button>
              </form>
            </div>
            <div>
              {errors.map((error) => (
                <Alert variant="primary" key={error}>
                  {error}
                </Alert>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
