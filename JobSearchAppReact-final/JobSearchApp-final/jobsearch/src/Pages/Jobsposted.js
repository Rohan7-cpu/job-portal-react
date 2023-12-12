import React, { useEffect, useState } from "react";
import { Card, Row, Col, Button, message } from "antd";
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

  const handleDelete = async (jobId) => {
    try {
      // Make a DELETE request to your backend API to delete the job
      await axios.delete(`http://localhost:5000/Job/delete/${jobId}`);
      // Filter out the deleted job from the jobsData state
      setJobsData(jobsData.filter((job) => job._id !== jobId));
      message.success("Job deleted successfully!");
    } catch (error) {
      console.error("Error deleting job:", error);
      message.error("Failed to delete job.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h3>POSTED JOBS</h3>
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
              <Button onClick={() => handleDelete(job._id)} danger>
                Delete
              </Button>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default JobsPage;
