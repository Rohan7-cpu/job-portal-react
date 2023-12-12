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
    position: "absolute", // Set to absolute positioning
    top: 0,
    left: 0,
    width: "100%",
    zIndex: 2, // Set a higher zIndex than the background image
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
            {/* Use Link component for routing */}
          </li>
          <li className="navbar-item dropdown">
            <button  className='jobseeker' onClick={toggleDropdown1}>Job Seeker</button>
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
            <button className='jobseeker'  onClick={toggleDropdown2}>Employer</button>
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



const Form = () => {
  const [showModal, setShowModal] = useState(false); // Initialize showModal state
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData) => {
    try {
      const form = new FormData();
  
      // Append other form fields
      for (const key in formData) {
        // Skip the 'cv' field, it will be handled separately
        if (key !== 'cv') {
          form.append(key, formData[key]);
        }
      }
  
      // Append the file (if it exists)
      if (formData.cv[0]) {
        form.append('cv', formData.cv[0]);
      }
  
      const response = await fetch('http://localhost:5000/JobSeeker/create', {
        method: 'POST',
        body: form,
      });
  
      if (response.ok) {
        console.log(formData);
        setShowModal(true);
      } else {
        // Handle error response
      }
    } catch (error) {
      console.error("Error sending data:", error);
      // Handle errors or display an error message
    }
  };
  const handleModalClose = () => {
    setShowModal(false);
    navigate("/JsLogin"); // Redirect to the appropriate page using navigate
  };

  return (
    <div className="registration">
      <div className="register">
        <div className="registercard">
          <form className="formgroup1" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <h1>Registration</h1>
            </div>
            <div>
              <label>Name</label>
              <input
                className="jsregister"
                placeholder="Enter person name"
                {...register("name", { required: true })}
              />
              <error>
                {errors.name?.type === "required" && "  Name is required"}
              </error>
            </div>
            <div>
              <label>Email</label>
              <input
                className="jsregister"
                placeholder="Enter primary email"
                {...register("email", {
                  required: true,
                  pattern: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i,
                })}
              />
              <error>
                {errors.email?.type === "required" && "  Email is required"}
                {errors.email?.type === "pattern" &&
                  "Entered email is in the wrong format"}
              </error>
            </div>
            <div>
              <label>Phone Number</label>
              <input
                className="jsregister"
                type="number"
                {...register("number", {
                  minLength: 6,
                  maxLength: 12,
                })}
              />
              <error>
                {errors.number?.type === "minLength" &&
                  "Entered number is less than 6 digits"}
                {errors.number?.type === "maxLength" &&
                  "Entered number is more than 12 digits"}
              </error>
            </div>

            <div>
              <label>Create Password</label>
              <input
                className="jsregister"
                placeholder="Enter password"
                {...register("password", {
                  required: true,
                  minLength: 5,
                  maxLength: 20,
                })}
              />
              <error>
                {errors.password?.type === "minLength" &&
                  "Entered password is less than 5 characters"}
                {errors.password?.type === "maxLength" &&
                  "Entered password is more than 20 characters"}
              </error>
            </div>

            <div>
              <label>Upload CV</label>
              <input
                className="jsregister"
                type="file"
                {...register("cv", { required: true })}
              />
              <error>
                {errors.cv?.type === "required" && "  select the required file"}
              </error>
            </div>
            <div>
              <label>Inter Percentage</label>
              <input
                className="jsregister"
                type="number"
                {...register("interPercentage", {
                  required: true,
                  min: 0,
                  max: 100,
                })}
              />
              <error>
                {errors.interPercentage?.type === "required" &&
                  " percentage is required"}
                {errors.interPercentage?.type === "min" &&
                  "  Enter a valid percentage"}
                {errors.interPercentage?.type === "max" &&
                  "  Percentage cannot be more than 100"}
              </error>
            </div>

            <div>
              <label>Tenth Percentage</label>
              <input
                className="jsregister"
                type="number"
                {...register("tenthPercentage", {
                  required: true,
                  min: 0,
                  max: 100,
                })}
              />
              <error>
                {errors.tenthPercentage?.type === "required" &&
                  " percentage is required"}
                {errors.tenthPercentage?.type === "min" &&
                  "Enter a valid percentage"}
                {errors.tenthPercentage?.type === "max" &&
                  "Percentage cannot be more than 100"}
              </error>
            </div>

            <div>
              <label>Graduation Percentage</label>
              <input
                className="jsregister"
                type="number"
                {...register("graduationPercentage", {
                  required: true,
                  min: 0,
                  max: 100,
                })}
              />
              <error>
                {errors.graduationPercentage?.type === "required" &&
                  "Graduation percentage is required"}
                {errors.graduationPercentage?.type === "min" &&
                  "Enter a valid percentage"}
                {errors.graduationPercentage?.type === "max" &&
                  "Percentage cannot be more than 100"}
              </error>
            </div>
            <div>
              <label>State</label>
              <input
                className="jsregister"
                placeholder="Enter state"
                {...register("state", { required: true })}
              />
              <error>
                {errors.state?.type === "required" && " please enter state"}
              </error>
            </div>

            <div>
              <label>City</label>
              <input
                className="jsregister"
                placeholder="Enter city"
                {...register("city", { required: true })}
              />
              <error>
                {errors.city?.type === "required" && "please enter city"}
              </error>
            </div>

            <div>
              <label>Zip Code</label>
              <input
                className="jsregister"
                type="number"
                {...register("zipCode", { required: true })}
              />
              <error>
                {errors.zipCode?.type === "required" && "Please enter Zip code"}
              </error>
            </div>

            <div>
              <label>Interested Fields (Enter at least three)</label>
              <input
                className="jsregister"
                type="text"
                {...register("interestedFields", {
                  required: true,
                  validate: (value) =>
                    value.split(",").filter((field) => field.trim() !== "")
                      .length >= 3 || "Enter at least three interested fields",
                })}
              />
              <error>
                {errors.interestedFields?.type === "required" &&
                  "Atleast three interested fields are required"}
                {errors.interestedFields?.type === "validate" &&
                  errors.interestedFields.message}
              </error>
            </div>

            <div>
              <label>Skills</label>
              <input
                className="jsregister"
                placeholder="Enter skills"
                {...register("skills", { required: true })}
              />
              <error>
                {errors.skills?.type === "required" &&
                  "YourSkills are required"}
              </error>
            </div>

            <div>
              <label>Hobbies</label>
              <input
                className="jsregister"
                placeholder="Enter hobbies"
                {...register("hobbies", { required: true })}
              />
              <error>
                {errors.hobbies?.type === "required" &&
                  "YourHobbies are required"}
              </error>
            </div>

            <center>
              <p>
                Already Have an Account &nbsp; &nbsp;
                <Link to="/JsLogin">
                  <u>Login</u>
                </Link>
                <br></br>
              </p>
            </center>
            <div>
              <input className="button1" type="submit" value="Submit" />
            </div>
          </form>
        </div>
      </div>

      {showModal && (
        <div className="lasttext">
          <center>
            <div className="text1">
            <h2>
              Your are successfully registered! Click Ok to login<br></br>
              <button onClick={handleModalClose}>OK</button>
            </h2>
            </div>
          </center>
          
        </div>
      )}
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
