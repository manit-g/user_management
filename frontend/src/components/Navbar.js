import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';

const Navbar = () => {
  const location = useLocation();

  return (
    <AppBar position="static">
      <Toolbar>
        <PeopleIcon sx={{ mr: 2 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          User Management by{' '}
          <a
            href="https://portfoliobymg.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: '#fff',
              textDecoration: 'none',
              fontWeight: 'bold',
              borderBottom: '2px solid #fff',
              transition: 'opacity 0.3s',
            }}
            onMouseEnter={(e) => (e.target.style.opacity = '0.8')}
            onMouseLeave={(e) => (e.target.style.opacity = '1')}
          >
            MG
          </a>
        </Typography>
        <Box>
          <Button
            color="inherit"
            component={Link}
            to="/users"
            sx={{
              backgroundColor: location.pathname === '/users' || location.pathname === '/' ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
            }}
          >
            Users List
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

