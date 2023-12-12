import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import ApprovalIcon from '@mui/icons-material/Approval';
import FileUploadRoundedIcon from '@mui/icons-material/FileUploadRounded';
import LogoutIcon from '@mui/icons-material/Logout';
import JobsPage from './Jobsposted'; // Import your JobForm component

const ColorTabs = () => {
  const [value, setValue] = useState('one');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="secondary tabs example"
      >
        
        <Tab value="one" label={
          <Link to="/Postjobs" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <FileUploadRoundedIcon color='success' />
              <span style={{ marginLeft: '8px' }}>Post Jobs</span>
            </div>
          </Link>
        } />
       <Tab value="two" label={
          <Link to="/Jobsposted" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <ApprovalIcon color='success' />
              <span style={{ marginLeft: '8px' }}>Jobs Posted</span>
            </div>
          </Link>
        }/>
        <Tab value="three" label={
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <LogoutIcon color='success' />
              <span style={{ marginLeft: '8px' }}>Log Out</span>
            </div>
          </Link>
        }/>
      </Tabs>
      {/* Render the JobForm component */}
      <JobsPage />
    </Box>
  );
};

export default ColorTabs;

