import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  Button,
  Grid,
  Divider,
  Chip,
  CircularProgress,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import HomeIcon from '@mui/icons-material/Home';
import WorkIcon from '@mui/icons-material/Work';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { toast } from 'react-toastify';
import { userService } from '../services/api';

const UserView = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser();
  }, [id]);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const response = await userService.getUserById(id);
      setUser(response.data);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch user');
      navigate('/users');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!user) {
    return null;
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Paper sx={{ p: 4, mt: 3, maxWidth: 800, mx: 'auto' }}>
      <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/users')}
        >
          Back to List
        </Button>
        <Button
          variant="contained"
          startIcon={<EditIcon />}
          onClick={() => navigate(`/users/${id}/edit`)}
        >
          Edit User
        </Button>
      </Box>

      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Box
          sx={{
            width: 100,
            height: 100,
            borderRadius: '50%',
            backgroundColor: 'primary.main',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mx: 'auto',
            mb: 2,
          }}
        >
          <PersonIcon sx={{ fontSize: 60, color: 'white' }} />
        </Box>
        <Typography variant="h4" component="h1" gutterBottom>
          {user.name}
        </Typography>
        <Chip label={user.role} color="primary" sx={{ fontSize: '1rem', height: 32 }} />
      </Box>

      <Divider sx={{ my: 3 }} />

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
            <EmailIcon color="primary" sx={{ mt: 1 }} />
            <Box>
              <Typography variant="caption" color="text.secondary">
                Email Address
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {user.email}
              </Typography>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
            <PhoneIcon color="primary" sx={{ mt: 1 }} />
            <Box>
              <Typography variant="caption" color="text.secondary">
                Phone Number
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {user.phone}
              </Typography>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
            <HomeIcon color="primary" sx={{ mt: 1 }} />
            <Box sx={{ flex: 1 }}>
              <Typography variant="caption" color="text.secondary">
                Address
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {user.address}
              </Typography>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
            <WorkIcon color="primary" sx={{ mt: 1 }} />
            <Box>
              <Typography variant="caption" color="text.secondary">
                Role
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {user.role}
              </Typography>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
            <CalendarTodayIcon color="primary" sx={{ mt: 1 }} />
            <Box>
              <Typography variant="caption" color="text.secondary">
                Created At
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {formatDate(user.createdAt)}
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default UserView;

