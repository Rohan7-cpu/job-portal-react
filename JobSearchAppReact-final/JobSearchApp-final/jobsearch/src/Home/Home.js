
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import './Home.css';

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
            <button className='jobseeker' onClick={toggleDropdown1}>Job Seeker</button>
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




const Home = () => {


  return (
      <div className='bgcontainer'>
        <div className='bgimage'></div>
        <div className='container'>
          <h1 className='header'>Hire Talent, Post Jobs</h1>
          <h2 className='subheader'>& View Candidates</h2>
          <div className='subheader1'>
            <p>Job Fynder updates both from the job seekers as well as the employers. 
              Contact<br></br> Millions of Profiles to Hire.
            It’s unique development methodology helps in acquiring <br></br>the client and candidate information and separating 
            them according to the job <br></br>requirements and vacancies. The online access to it provides details of the job.</p>
          </div>
          
          {/* Search Bar */}
          <div className='search-bar'>
  <input type='text' placeholder='Search...' style={{ marginRight: '5px' }} />
  <button type='button'>Search</button>
</div>
  
          <div className='findjobs-button'>
            <Button variant="contained" href="JsLogin">Find Jobs</Button>&nbsp;&nbsp;&nbsp;
            <Button  variant="contained" href="Elogin">Post Jobs</Button>
            </div>
          </div>
        </div>
    );
  };



export default function App() {
  return (
    <div>
      <Navbar />
      <Home />
    </div>
  );
}