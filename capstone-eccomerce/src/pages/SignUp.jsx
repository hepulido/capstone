import { React, useState } from "react";
import { useNavigate } from "react-router";
import { Alert } from "react-bootstrap";
import { Navbar } from "../components/Navbar";

export function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errors, setErrors] = useState([]);
  let navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    fetch("https://fakestoreapi.com/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        username: email,
        password: password,
        name: {
          firstname: firstName,
          lastname: lastName,
        },
        address: {
          city: "kilcoole",
          street: "7835 new road",
          number: 3,
          zipcode: "12926-3874",
          geolocation: {
            lat: "-37.3159",
            long: "81.1496",
          },
        },
        phone: "1-570-236-7033",
      }),
    }).then((r) => {
      if (r.ok) {
        r.json().then().then(navigate("/"));
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }
  return (
    <>
    <Navbar />
      <button>
        <span className="fa fa-google me-2"></span> Sign up With Google
      </button>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="first_name">First Name</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            id="firstName"
          />
        </div>
        <div>
          <label htmlFor="last_name" className="form-label">
            Last name
          </label>
          <input
            type="text"
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
            id="lastName"
          />
        </div>
        <div>
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div id="emailHelp">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password_confirmation" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            id="password_confirmation"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
        </div>
        <div>
          <input type="checkbox" id="exampleCheck1" />
          <label htmlFor="exampleCheck1">Check me out</label>
        </div>
        <button type="submit">Register</button>
      </form>

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
