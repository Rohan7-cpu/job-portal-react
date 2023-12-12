import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import "./jr.css";

const Navbar = () => {
  const [showDropdown1, setShowDropdown1] = useState(false);
  const [showDropdown2, setShowDropdown2] = useState(false);

  const toggleDropdown1 = () => {
    setShowDropdown1(!showDropdown1);
  };

  const toggleDropdown2 = () => {
    setShowDropdown2(!showDropdown2);
  };

  const navbarStyle = {
    position: "absolute", 
    top: 0,
    left: 0,
    width: "100%",
    zIndex: 2, 
  };

  return (
    <nav className="navbar" style={navbarStyle}>
      <div className="navbar-container">
        <ul className="navbar-menu">
          <li className="navbar-item">
            {/* Home Link */}
            <Link to="/">
            <button className="jobseeker">Home</button>
          </Link>
          </li>
          <li className="navbar-item dropdown">
            <button className="jobseeker" onClick={toggleDropdown1}>
              Job Seeker
            </button>
            {showDropdown1 && (
              <ul className="dropdown-menu">
                <li className="dropdown-item">
                  {/* Use Link component for routing */}
                  <Link to="/JsLogin">Login</Link>
                </li>
                <li className="dropdown-item">
                  {/* Use Link component for routing */}
                  <Link to="/JsRegistration">Registration</Link>
                </li>
              </ul>
            )}
          </li>
          <li className="navbar-item dropdown">
            <button  className='jobseeker' onClick={toggleDropdown2}>Employer</button>
            {showDropdown2 && (
              <ul className="dropdown-menu">
                <li className="dropdown-item">
                  {/* Use Link component for routing */}
                  <Link to="/Elogin">Login</Link>
                </li>
                <li className="dropdown-item">
                  {/* Use Link component for routing */}
                  <Link to="/Eregistration">Registration</Link>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
            }
const Form = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const navigate = useNavigate(); // Initialize the navigate function

  const [showModal, setShowModal] = useState(false);

  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:5000/Emp/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Server Error");
      }

      const result = await response.json();
      if (result.message === "Login successful") {
        sessionStorage.setItem("loggedInEmail", data.email);
        setShowModal(true); // Show modal on successful login
        console.log("Login successful");
      } else {
        console.log("Login failed"); // Handle login failure
      }
    } catch (error) {
      window.alert(
        "Invalid credentials. Please check your email and password."
      );
      console.error("Error:", error);
    }
  };

  const handleModalClose = () => {
    // Redirect to other page when the modal is closed
    navigate("/Postjobs");
  };

  const handleForgotPassword = () => {
    const email = document.querySelector('input[name="email"]').value;
    sessionStorage.setItem("tempEmail", email); // Store email in sessionStorage
    navigate("/Eresetpass"); // Redirect to the reset password page
  };

  return (
    <div className="App">
      <div className="container">
        <div className="card">
          <form className='formgroup' onSubmit={handleSubmit(onSubmit)}>
            <div>
              <h1>Login</h1>
            </div>

            <div>
              <label>Username</label>
              <input className='jsregister'
                placeholder="Enter primary email"
                {...register("email", {
                  required: true,
                  pattern: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i,
                })}
              />
              <error>
                {errors.email?.type === "required" && "Email is required"}
                {errors.email?.type === "pattern" &&
                  "Entered email is in the wrong format"}
              </error>
            </div>

            <div>
              <label>Password</label>
              <input className='jsregister'
                placeholder="Enter password"
                {...register("password", {
                  required: true,
                  minLength: 5,
                  maxLength: 20,
                })}
              />
            </div>
            <error>
              {errors.password?.type === "minLength" &&
                "Entered password is less than 5 characters"}
              {errors.password?.type === "maxLength" &&
                "Entered password is more than 20 characters"}
            </error>
            <br></br>
            <center>
            <p>Not Yet Registered ? &nbsp;&nbsp;<a href="Eregistration">
                <u>Register</u>
              </a></p>
            </center>
            <center>
              <p>Reset Your Password...!&nbsp;&nbsp;<a href="Eresetpass" onClick={handleForgotPassword}>
                <u>Forgot Password</u>
              </a></p>
            </center>
            <div>
             <center><button className="button" type="submit">
                Login
              </button></center>
            </div>
          </form>
          <div class="transparent-box">
          <p className='ptext'><u>Note:</u>&nbsp; To reset your password, please enter your valid email above
           and click on forget password to create new password.</p>
          </div>
        </div>

        {showModal && (
          <div className="modal">
            <center>
              <div className="jstext">
              <h2 >
                You are successfully logged in!{" "}
                <button onClick={handleModalClose}>OK</button>
              </h2>
              </div>
            </center>
          </div>
        )}
      </div>
    </div>
  );
};

export default function App() {
  return (
    <div>
      <Navbar />
      <Form />
    </div>
  );
}
