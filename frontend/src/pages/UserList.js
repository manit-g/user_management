import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Typography,
  Pagination,
  CircularProgress,
  Paper,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { toast } from 'react-toastify';
import { userService } from '../services/api';
import UserTable from '../components/UserTable';
import SearchBar from '../components/SearchBar';

const UserList = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchUsers = async (page = 1, query = '') => {
    try {
      setLoading(true);
      let response;
      if (query.trim()) {
        response = await userService.searchUsers(query, page, 10);
      } else {
        response = await userService.getUsers(page, 10);
      }
      setUsers(response.data.users);
      setCurrentPage(response.data.currentPage);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(1, '');
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchUsers(1, searchQuery);
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [searchQuery]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    fetchUsers(value, searchQuery);
  };

  const handleDelete = async (id) => {
    try {
      await userService.deleteUser(id);
      toast.success('User deleted successfully');
      fetchUsers(currentPage, searchQuery);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete user');
    }
  };

  const handleExport = async () => {
    try {
      const response = await userService.exportToCSV();
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'users_export.csv');
      document.body.appendChild(link);
      link.click();
      link.remove();
      toast.success('CSV file downloaded successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to export CSV');
    }
  };

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
          flexWrap: 'wrap',
          gap: 2,
        }}
      >
        <Typography variant="h4" component="h1">
          Users List
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Button
            variant="outlined"
            startIcon={<FileDownloadIcon />}
            onClick={handleExport}
          >
            Export CSV
          </Button>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate('/users/add')}
          >
            Add User
          </Button>
        </Box>
      </Box>

      <SearchBar value={searchQuery} onChange={setSearchQuery} />

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <UserTable users={users} onDelete={handleDelete} />
          {totalPages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
              />
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default UserList;

