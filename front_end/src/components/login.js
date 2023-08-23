import React, { useState } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import Loginvalidation from "./loginvalidation";
import axios from "axios";

function Login() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleInput = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: [event.target.value],
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(Loginvalidation(values));
  };

  const navigate = useNavigate();
  const handleLoginMain = async () => {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    if (email === "" || email === undefined) {
      alert("Please enter valid email");
    } else if (password === "" || password === undefined) {
      alert("Please enter password");
    } else {
      let loginInfo = {
        email: email,
        password: password,
      };
      try {
        const response = await axios.post(
          "http://localhost:3013/login",
          loginInfo
        );
        if (response.data.code == 200) {
          localStorage.setItem("userInfo", JSON.stringify(response.data));
          alert(response.data.message);
          navigate("/dashboard");
        }
      } catch (error) {
        alert(JSON.stringify(error));
        console.error(error);
      }
    }
  };

  return (
    <>
      <div className="loginMain d-flex justify-content-center align-items-center bg-dark vh-100">
        <div className="bg-white p-3 rounded w-25">
          <form onSubmit={handleSubmit}>
            <h2 className="mb-3 text-center ">Log In</h2>
            <div className="mb-3">
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
            <div className="mb-4">
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
            <strong>
              <button
                type="submit"
                onClick={handleLoginMain}
                className="btn btn-success mb-3 w-100"
              >
                Log in
              </button>
            </strong>
            <p>Dont't have an account?</p>
            <Link to={"/signup"}>
              <button className="btn btn-success border w-100 mb-4">
                Create Account
              </button>
            </Link>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
