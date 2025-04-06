import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText,
  Divider,
  IconButton,
  Button
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  People as UsersIcon,
  Event as DailyScrumIcon,
  Logout as LogoutIcon
} from '@mui/icons-material';

const MainLayout = ({ children, onLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    onLogout();
    navigate('/login', { state: { message: 'Successfully logged out!' } });
  };

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
    { text: 'Users', icon: <UsersIcon />, path: '/users' },
    { text: 'Daily Scrum', icon: <DailyScrumIcon />, path: '/daily-scrum' },
  ];

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <Box
        component="nav"
        sx={{
          width: 240,
          flexShrink: 0,
          bgcolor: 'background.paper',
          borderRight: '1px solid',
          borderColor: 'divider',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Logo/Title */}
        <Box 
          sx={{ 
            p: 2.5, 
            borderBottom: '1px solid', 
            borderColor: 'divider',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ 
              fontWeight: 600,
              color: 'primary.main'
            }}
          >
            Admin Panel
          </Typography>
        </Box>

        {/* Menu Items */}
        <List sx={{ flex: 1, pt: 2 }}>
          {menuItems.map((item) => (
            <ListItem
              key={item.text}
              component={Link}
              to={item.path}
              disablePadding
              sx={{
                display: 'block',
                mb: 0.5
              }}
            >
              <Box
                sx={{
                  py: 1.5,
                  px: 2,
                  mx: 2,
                  display: 'flex',
                  alignItems: 'center',
                  borderRadius: 1,
                  bgcolor: isActive(item.path) ? 'action.selected' : 'transparent',
                  '&:hover': {
                    bgcolor: 'action.hover',
                  },
                }}
              >
                <ListItemIcon 
                  sx={{ 
                    minWidth: 40,
                    color: isActive(item.path) ? 'primary.main' : 'inherit'
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text} 
                  sx={{
                    '& .MuiTypography-root': {
                      fontWeight: isActive(item.path) ? 600 : 400,
                      color: isActive(item.path) ? 'primary.main' : 'inherit'
                    }
                  }}
                />
              </Box>
            </ListItem>
          ))}
        </List>

        <Divider sx={{ mx: 2 }} />

        {/* Logout Button */}
        <Box sx={{ p: 2 }}>
          <Button
            onClick={handleLogout}
            fullWidth
            startIcon={<LogoutIcon />}
            sx={{
              py: 1.5,
              justifyContent: 'flex-start',
              color: 'text.primary',
              '&:hover': {
                bgcolor: 'action.hover',
              },
            }}
          >
            Logout
          </Button>
        </Box>
      </Box>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}
      >
        {/* Top Bar */}
        <Box
          sx={{
            p: 2.5,
            bgcolor: 'primary.main',
            color: 'primary.contrastText',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: 1
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 500 }}>
            {menuItems.find(item => isActive(item.path))?.text || 'Dashboard'}
          </Typography>
          <IconButton 
            onClick={handleLogout}
            sx={{ 
              color: 'inherit',
              '&:hover': { 
                bgcolor: 'rgba(255, 255, 255, 0.1)' 
              }
            }}
          >
            <LogoutIcon />
          </IconButton>
        </Box>

        {/* Page Content */}
        <Box 
          sx={{ 
            flexGrow: 1,
            p: 3,
            overflow: 'auto',
            bgcolor: '#f5f5f5'
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout;