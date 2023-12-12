import React, { useEffect, useState } from "react";
import { Card, Row, Col, Button, message} from "antd";
import axios from "axios";

const boldTitleStyle = {
  fontWeight: "bold",
};

const darkerLinesStyle = {
  borderBottom: "2px solid #333", // Change color or style as desired
};

const JobsPage = () => {
  const [jobsData, setJobsData] = useState([]);

  useEffect(() => {
    // Fetch job details from backend API
    const fetchJobs = async () => {
      try {
        const response = await axios.get("http://localhost:5000/Job/all"); // Update with your backend API URL
        setJobsData(response.data);
      } catch (error) {
        console.error("Error fetching job details:", error);
      }
    };

    fetchJobs();
  }, []);

  const handleApply = (jobId) => {
    message.success("You have applied for the job!");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h3>JOB POSTINGS</h3>
      <Row gutter={[16, 16]}>
        {jobsData.map((job) => (
          <Col key={job._id} xs={24} sm={12} md={12} lg={12}>
            <Card
              title={<span style={boldTitleStyle}>{job.jobTitle}</span>}
              style={darkerLinesStyle}
            >
              <p>
                <strong>Company:</strong> {job.companyName}
              </p>
              <p>
                <strong>Country:</strong> {job.country}
              </p>
              <p>
                <strong>State:</strong> {job.state}
              </p>
              <p>
                <strong>Experience:</strong> {job.minExperience} -{" "}
                {job.maxExperience}
              </p>
              <p>
                <strong>Openings:</strong> {job.openings}
              </p>
              <p>
                <strong>Job Type:</strong> {job.jobType}
              </p>
              <p>
                <strong>Salary:</strong> {job.minSalary} - {job.maxSalary}{" "}
                {job.currency}
              </p>
              <p>
                <strong>Language:</strong> {job.language}
              </p>
              <p>
                <strong>Skills:</strong> {job.skills}
              </p>
              <p>
                <strong>Description:</strong> {job.jobDescription}
              </p>
              <Button onClick={() => handleApply(job._id)} type="primary">
                Apply
              </Button>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default JobsPage;
