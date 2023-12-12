import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { submitJobData } from "../redux/jobActions";

const JobForm = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    companyName: "",
    jobTitle: "",
    country: "Select Country",
    state: "",
    minExperience: "",
    maxExperience: "",
    openings: "",
    jobType: "Full-time",
    currency: "Select currency",
    jobDescription: "",
    language: "", // Added language field
    skills: "", // Added skills field
    minSalary: "", // Added minSalary field
    maxSalary: "", // Added maxSalary field
  });

  const countries = [
    "Select Country",
    "United States",
    "Canada",
    "United Kingdom",
    "Germany",
    "France",
    "India",
    "Japan",
    // Add more countries as needed
  ];
  const currency = ["Select currency", "IND", "US", "UK", "JPN", "CHN", "AUS"];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here (e.g., API call)
    dispatch(submitJobData(formData));
    console.log("Form data submitted:", formData);

    // Reset the form after submission (optional)
    setFormData({
      companyName: "",
      jobTitle: "",
      country: "Select Country",
      state: "",
      minExperience: "",
      maxExperience: "",
      openings: "",
      jobType: "Full-time",
      currency: "Select currency",
      jobDescription: "",
      language: "",
      skills: "",
      minSalary: "",
      maxSalary: "",
    });
  };

  return (
    <div className="Job">
      <div className="contain">
        <div className="Jobform">
          <div>
            <form  className='jobsformgroup' onSubmit={handleSubmit}>
              <center>
                <h2>Post Your Job</h2>
              </center>
              <label htmlFor="companyName">Company Name:</label>
              <input className='jsregister'
                type="text"
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
              />
              <br></br>
              <label htmlFor="jobTitle">Job Title:</label>
              <input className='jsregister'
                type="text"
                id="jobTitle"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleInputChange}
              />
              <br></br>
              <label htmlFor="country">Country:</label>
              <select
                id="country"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
              >
                {countries.map((country, index) => (
                  <option key={index} value={country}>
                    {country}
                  </option>
                ))}
              </select>
              <br></br>
              <label htmlFor="state">Location:</label>
              <input className='jsregister'
                type="text"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
              />
              <br></br>
              <label htmlFor="minExperience">
                Minimum Years of Experience:
              </label>
              <input className='jsregister'
                type="number"
                id="minExperience"
                name="minExperience"
                value={formData.minExperience}
                onChange={handleInputChange}
              />
              <br></br>
              <label htmlFor="maxExperience">
                Maximum Years of Experience:
              </label>
              <input className='jsregister'
                type="number"
                id="maxExperience"
                name="maxExperience"
                value={formData.maxExperience}
                onChange={handleInputChange}
              />
              <br></br>
              <label htmlFor="openings">Number of Openings:</label>
              <input className='jsregister'
                type="number"
                id="openings"
                name="openings"
                value={formData.openings}
                onChange={handleInputChange}
              />
              <br></br>
              <label htmlFor="jobType">Job Type:</label>
              <select className="jobtype"
                id="jobType"
                name="jobType"
                value={formData.jobType}
                onChange={handleInputChange}
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
              </select>
              <br></br>
              <label htmlFor="maiSalary">Minimum Salary:</label>
              <input className='jsregister'
                type="number"
                id="minSalary"
                name="minSalary"
                value={formData.minSalary}
                onChange={handleInputChange}
              />
              <br></br>

              <label htmlFor="maxSalary">Maximum Salary:</label>
              <input className='jsregister'
                type="number"
                id="maxSalary"
                name="maxSalary"
                value={formData.maxSalary}
                onChange={handleInputChange}
              />
              <br></br>

              <label htmlFor="currency">Currency:</label>
              <select
                id="currency"
                name="currency"
                value={formData.currency}
                onChange={handleInputChange}
              >
                {currency.map((currency, index) => (
                  <option key={index} value={currency}>
                    {currency}
                  </option>
                ))}
              </select>
              <br></br>
              <label htmlFor="language">Language:</label>
              <input className='jsregister'
                type="text"
                id="language"
                name="language"
                value={formData.language}
                onChange={handleInputChange}
              />
              <br></br>

              <label htmlFor="skills">Skills:</label>
              <input className='jsregister'
                type="text"
                id="skills"
                name="skills"
                value={formData.skills}
                onChange={handleInputChange}
              />
              <br></br>

              <div>
                <label htmlFor="jobDescription">Job Description:</label>
                <input className='jsregister'
                  id="jobDescription"
                  name="jobDescription"
                  value={formData.jobDescription}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <input className="buttonjobs" type="submit" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobForm;
