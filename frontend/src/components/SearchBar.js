import React from 'react';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = ({ value, onChange }) => {
  return (
    <TextField
      fullWidth
      placeholder="Search users by name, email, phone, address, or role..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
      sx={{ mb: 2 }}
    />
  );
};

export default SearchBar;

