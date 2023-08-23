import React, { useState } from "react";
import "./SignUp.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Signupvalidation from "./SignUpValidation";

function Signup() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleInput = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: [event.target.value],
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(Signupvalidation(values));
  };

  const navigate = useNavigate();
  const handleSubmitMain = async () => {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let number = document.getElementById("number").value;

    if (name == "" || name == undefined) {
      alert("Please enter the Name");
    } else if (email == "" || email == undefined) {
      alert("Please enter the Email");
    } else if (password == "" || password == undefined) {
      alert("Please enter the Password");
    } else if (number == "" || number == undefined) {
      alert("Please enter the number");
    } else {
      let userinfo = {
        name: name,
        email: email,
        password: password,
        number: number,
      };
      console.log(userinfo);
      try {
        const response = await axios.post(
          "http://localhost:3013/signup",
          userinfo
        );
        if (response.data.code == 200) {
          alert(response.data.message);
          navigate("/");
        } else if (response.data.message === "User is already existed!") {
          alert("User is already existed!");
        } else if (response.data.code == 400) {
          alert(response.data.message);
        }
      } catch (error) {
        alert("User is already existed!");
        alert(JSON.stringify(error));
        console.error(error);
      }
    }
  };

  return (
    <>
      <div className="signUpMain d-flex justify-content-center align-items-center bg-dark vh-100">
        <div className="bg-white p-3 rounded w-25">
          <form onSubmit={handleSubmit}>
            <h2 className="mb-3 text-center">Sign Up</h2>
            <div className="mb-2">
              <strong>
                <label htmlFor="name">Name</label>
              </strong>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Enter the Name"
                className="form-control rounded"
                onChange={handleInput}
              />
              {errors.name && (
                <span className="text-danger">{errors.name}</span>
              )}
            </div>
            <div className="mb-2">
              <strong>
                <label htmlFor="email">Email</label>
              </strong>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter the Email"
                className="form-control rounded"
                onChange={handleInput}
              />
              {errors.email && (
                <span className="text-danger">{errors.email}</span>
              )}
            </div>
            <div className="mb-2">
              <strong>
                <label>Password</label>
              </strong>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Enter the Password"
                className="form-control rounded"
                onChange={handleInput}
              />
              {errors.password && (
                <span className="text-danger">{errors.password}</span>
              )}
            </div>
            <div className="mb-4">
              <strong>
                <label>Code</label>
              </strong>
              <input
                id="number"
                type="number"
                placeholder="Enter the code given by Organization"
                className="form-control rounded"
                onChange={handleInput}
              />
            </div>
            <strong>
              <button
                type="submit"
                onClick={handleSubmitMain}
                className="btn btn-success mb-3 w-100"
              >
                Sign Up
              </button>
            </strong>
            <p>Already have an account?</p>
            <Link to={"/"}>
              <button className="btn btn-success border w-100 mb-4">
                Log in
              </button>
            </Link>
          </form>
        </div>
      </div>
    </>
  );
}

export default Signup;
