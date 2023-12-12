import React, { useState, useEffect } from "react";
import axios from "axios";
import { Input, Row, Col, Form, Button } from "antd";
const { TextArea } = Input;

export default function UserForm() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Get email from session storage
    const email = sessionStorage.getItem("loggedInEmail"); // Retrieve email from session storage

    // Make an API call to fetch user data based on the email
    axios
      .get(`http://localhost:5000/JobSeeker/all/${email}`)
      .then((response) => {
        setUserData(response.data); // Update state with user data
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []); // Empty dependency array to run the effect only once

  return (
    <div>
      {userData && (
        <>
          <div className="userprofile"></div>
          <center>
            <h4>User Profile</h4>
            <hr />
          </center>
          <Form layout="vertical">
            <Row gutter={16}>
              <Col lg={8} sm={24}>
                <Form.Item label="Name" name="name">
                  <Input defaultValue={userData.name} />
                </Form.Item>
              </Col>
              <Col lg={8} sm={24}>
                <Form.Item label="Email" name="email">
                  <Input type="email" defaultValue={userData.email}/>
                </Form.Item>
              </Col>
              <Col lg={8} sm={24}>
                <Form.Item label="Mobile Number" name="mobileNumber">
                  <Input defaultValue={userData.number}/>
                </Form.Item>
              </Col>
              <Col lg={8} sm={24}>
                <Form.Item label="Skills" name="skills">
                  <Input defaultValue={userData.skills}/>
                </Form.Item>
              </Col>
              <Col lg={8} sm={24}>
                <Form.Item label="Hobbies" name="hobbies">
                  <Input defaultValue={userData.hobbies}/>
                </Form.Item>
              </Col>
              <Col lg={24} sm={24}>
                <Form.Item
                  label="Intrested Fields (Enter at least three)"
                  name="about"
                >
                  <TextArea rows={4} defaultValue={userData.interestedFields}/>
                </Form.Item>
              </Col>
 
              <Col lg={6} sm={24}>
                <Form.Item label="State" name="State">
                  <Input defaultValue={userData.state}/>
                </Form.Item>
              </Col>
              <Col lg={6} sm={24}>
                <Form.Item label="City" name="City">
                  <Input defaultValue={userData.city}/>
                </Form.Item>
              </Col>
              <Col lg={6} sm={24}>
                <Form.Item label="ZipCode" name="Zipcode">
                  <Input defaultValue={userData.zipCode}/>
                </Form.Item>
              </Col>

              <Col lg={5} sm={24}>
                <Form.Item label="10th Percentage" name="mark">
                  <Input defaultValue={userData.tenthPercentage}/>
                </Form.Item>
              </Col>
              <Col lg={5} sm={24}>
                <Form.Item label="12th percentage" name="12th mark">
                  <Input defaultValue={userData.interPercentage}/>
                </Form.Item>
              </Col>
              <Col lg={5} sm={24}>
                <Form.Item label="Graduation Percentage" name="Btech/MCA mark">
                  <Input defaultValue={userData.graduationPercentage}/>
                </Form.Item>
              </Col>

              <Col lg={4} sm={24}>
                <Form.Item label="Upload CV" name="CV">
                  <input type="file" />
                 
                </Form.Item>
              </Col>
            </Row>
            <Button className="btn">Save</Button>
          </Form>
        </>
      )}
    </div>
  );
}
