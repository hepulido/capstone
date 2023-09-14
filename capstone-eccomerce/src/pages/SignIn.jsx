import {React, useState} from "react";
import { useNavigate } from 'react-router'
import { Alert } from "react-bootstrap";

export  function SignIn({onLogin}) {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail]= useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errors, setErrors] = useState([])
  let navigate = useNavigate()
  
  function handleSubmit(e) {
    e.preventDefault();
    fetch('https://fakestoreapi.com/users', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        username: username,
        password,
        password_confirmation: passwordConfirmation,
        email,
      }),
    })
      .then((r) => {
        if(r.ok){
          r.json() 
          .then()
          .then( navigate('/'))
        }else {
          r.json().then((err) => setErrors(err.errors))
        }
      })
  }
  return (
    <>
      {/* <!-- Button trigger modal --> */}
      <button
        type="button"
        className="btn btn-outline-primary ms-2"
        data-bs-toggle="modal"
        data-bs-target="#signupModal"
      >
       <span className="fa fa-user-plus me-1"></span> Register
      </button>

      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="signupModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
              <span className="fa fa-sign-in me-1"></span> Register
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
            <button className= "btn btn-outline-primary w-100 mb-4">
             <span className="fa fa-google me-2"></span> Sign up With Google 
            </button>
            <form onSubmit={handleSubmit}>
            <div className="mb-3">
                  <label htmlFor="first_name" className="form-label">
                    First Name 
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="form-control"
                    id="firstName"/>
                </div>
                <div className="mb-3">
                  <label htmlFor="last_name" className="form-label">
                    Last name
                  </label>
                  <input
                    type="text"
                    onChange={(e) => setLastName(e.target.value)}
                    value={lastName}
                    className="form-control"
                    id="lastName"/>
                </div>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                   />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    aria-describedby="emailHelp"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <div id="emailHelp" className="form-text">
                    We'll never share your email with anyone else.
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password_confirmation" className="form-label">
                  Confirm Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password_confirmation"
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}

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
                <button type="submit" className="btn btn-outline-primary w-100 mt-5">
                  Register
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
  )
}
