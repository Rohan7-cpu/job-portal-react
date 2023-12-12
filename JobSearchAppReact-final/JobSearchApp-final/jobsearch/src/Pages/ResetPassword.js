import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
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

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <ul className="navbar-menu">
          <li className="navbar-item">
            {/* Home Link */}
            <Link to="/">
            <button className="jobseeker">Home</button>
          </Link>
            {/* Use Link component for routing */}
          </li>
          <li className="navbar-item dropdown">
            <button className="jobseeker" onClick={toggleDropdown1}>Job Seeker</button>
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
            <button className='jobseeker' onClick={toggleDropdown2}>Employer</button>
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
};

const ResetPassword = () => {
  const [passwords, setPasswords] = useState({
    newPassword: "",
    confirmPassword: "",
    email: "", // New state for storing email
  });

  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Retrieve email from sessionStorage when component mounts
    const storedEmail = sessionStorage.getItem("tempEmail");
    // Use the email logic here (for instance, you might want to update state)
    // For simplicity, let's assume you update the state directly with the email
    setPasswords((prevPasswords) => ({
      ...prevPasswords,
      email: storedEmail || "", // Setting email in passwords state
    }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prevPasswords) => ({
      ...prevPasswords,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (passwords.newPassword.trim() === "") {
      newErrors.newPassword = " password is required";
    }

    if (passwords.confirmPassword.trim() === "") {
      newErrors.confirmPassword = "Confirm password is required";
    } else if (passwords.newPassword !== passwords.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    // Additional password criteria can be added here

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log('Email:', passwords.email); // Check if email is present
      console.log('New Password:', passwords.newPassword); // Check if newPassword is present
      try {
        const response = await fetch("http://localhost:5000/JobSeeker/updatepw", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: passwords.email, // Use email from state
            password: passwords.newPassword,
          }),
        });

        if (!response.ok) {
          throw new Error("Server Error");
        }

        setShowModal(true); // Show modal on successful password reset
      } catch (error) {
        console.error("Error:", error);
        // Handle error scenario
      }
    } else {
      console.log("Form has errors. Please fix them.");
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    // Redirect to the appropriate page after resetting password
    window.location.href = "/JsLogin";
  };

  return (
    <div>
      <Navbar />
      <body>
          <form className="formgroup4" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="newPassword">New Password</label>
              <input
                className="jsregister"
                type="password"
                id="newPassword"
                name="newPassword"
                value={passwords.newPassword}
                onChange={handleChange}
              />
              {errors.newPassword && (
                <span className="error">{errors.newPassword}</span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                className="jsregister"
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={passwords.confirmPassword}
                onChange={handleChange}
              />
              {errors.confirmPassword && (
                <span className="error">{errors.confirmPassword}</span>
              )}
            </div>
            <center>
              <button type="submit">Reset Password</button>
            </center>
          </form>
        {showModal && (
          <div className="modal">
            <center>
              <h2>
                Your password has been successfully reset! Click OK to Login
              </h2>
            </center>
            <button className="ok" onClick={handleModalClose}>OK</button>
          </div>
        )}
      </body>
    </div>
  );
};

export default ResetPassword;