import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import AddTaskIcon from '@mui/icons-material/AddTask';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import UserForm from './Jsprofileform'

export default function ColorTabs() {
  const [value, setValue] = React.useState('one');

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
        <Tab 
          value="one" 
          label={
            <Link to="/Jsprofile" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <AccountCircleRoundedIcon color='success' />
                <span style={{ marginLeft: '5px' }}>Profile</span>
              </div>
            </Link>
          }
        />
        <Tab value="two" label={
          <Link to="/Jsapply" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <AddTaskIcon color='success' />
              <span style={{ marginLeft: '5px' }}>Apply Jobs</span>
            </div>
          </Link>
        } />
        <Tab value="Four" label={
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <LogoutIcon color='success' />
              <span style={{ marginLeft: '5px' }}>Log Out</span>
            </div>
          </Link>
        }/>
      </Tabs>
      {/* Render the JobForm component */}

      <UserForm/>
    </Box>
  );
};