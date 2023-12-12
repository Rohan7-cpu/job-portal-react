import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import './jr.css';
import { useDispatch } from 'react-redux';
import { sendEmpDataToMongo } from '../redux/empActions';

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
    position: 'absolute', // Set to absolute positioning
    top: 0,
    left: 0,
    width: '100%',
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
  const dispatch = useDispatch();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const navigate = useNavigate(); // Initialize the navigate function

  const [showModal, setShowModal] = useState(false);

  const onSubmit = (data) => {
    setShowModal(true);
    console.log(data);
    dispatch(sendEmpDataToMongo(data)); // Dispatch action to send data to MongoDB
    
  };

  const handleModalClose = () => {
    // Close the modal
    setShowModal(false);

    // Redirect to the appropriate page using navigate
    navigate('/Elogin'); // Adjust the route as needed
  };

return (
  <div className='App'>
      <div className='container'>
        <div className='card'>
          <form className='formgroup2' onSubmit={handleSubmit(onSubmit)}>
            <div>
              <h1>Registration</h1>
            </div>
            <div>
              <label>Name</label>
              <input className='jsregister'
                placeholder="Enter person name"
                {...register('name', { required: true })}
              />
              <error>
                {errors.name?.type === 'required' && '  Name is required'}
              </error>
            </div>
            <div>
              <label>Email</label>
              <input className='jsregister'
                placeholder="Enter primary email"
                {...register('email', {
                  required: true,
                  pattern: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i,
                })}
              />
              <error>
                {errors.email?.type === 'required' && '  Email is required'}
                {errors.email?.type === 'pattern' &&
                  'Entered email is in the wrong format'}
              </error>
            </div>
            <div>
              <label>Phone Number</label>
              <input className='jsregister'
                type="number"
                {...register('number', {
                  minLength: 6,
                  maxLength: 12,
                })}
              />
              <error>
                {errors.number?.type === 'minLength' &&
                  'Entered number is less than 6 digits'}
                {errors.number?.type === 'maxLength' &&
                  'Entered number is more than 12 digits'}
              </error>
            </div>

            <div>
              <label>Create Password</label>
              <input className='jsregister'
                placeholder="Enter password"
                {...register('password', {
                  required: true,
                  minLength: 5,
                  maxLength: 20,
                })}
              />
              <error>
                {errors.password?.type === 'minLength' &&
                  'Entered password is less than 5 characters'}
                {errors.password?.type === 'maxLength' &&
                  'Entered password is more than 20 characters'}
              </error>
            </div>
            <center>
              <p>
                Already Have an Account &nbsp; &nbsp;
                <Link to="/ELogin">
                  <u>Login</u>
                </Link>
                <br></br>
              </p>
            </center>
            <div>
              <input className="button1" type="submit" />
            </div>
          </form>
        </div>
      </div>

      {showModal && (
        <div className="lasttext1">
        <center>
          <div className="text2">
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