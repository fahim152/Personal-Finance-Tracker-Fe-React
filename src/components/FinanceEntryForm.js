import React, { useState } from 'react';
import RequestHandler from './RequestHandler';
import {
  TextField,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid
} from '@mui/material';

function FinanceEntryForm({ onSubmit }) {
  const [entry, setEntry] = useState({
    date: '',
    amount: '',
    category: '',
    description: '',
  });

  const handleChange = (e) => {
    setEntry({ ...entry, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const addedEntry = await RequestHandler.addEntry(entry);
      if (typeof onSubmit === 'function') {
        onSubmit(addedEntry);
      } else {
        console.error('onSubmit is not a function');
      }
      setEntry({ date: '', amount: '', category: '', description: '' });
      alert('Submitted Successfully');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Box sx={{ '& > :not(style)': { m: 1 } }} component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Date"
            type="date"
            name="date" 
            value={entry.date}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            required
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Amount"
            type="number"
            name="amount" 
            value={entry.amount}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              name="category"
              value={entry.category}
              onChange={handleChange}
              required
            >
              <MenuItem value="income">Income</MenuItem>
              <MenuItem value="expense">Expense</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Description"
            name="description" 
            value={entry.description}
            onChange={handleChange}
            multiline
            rows={2}
          />
        </Grid>
        <Grid item xs={2}>
          <Button type="submit" variant="contained" fullWidth>Add Entry</Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default FinanceEntryForm;
