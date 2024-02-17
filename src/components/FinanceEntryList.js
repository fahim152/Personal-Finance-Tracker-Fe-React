import React, { useEffect, useState } from 'react';
import RequestHandler from './RequestHandler';
import { Grid, TextField, FormControl, InputLabel, Select, MenuItem, 
        Button, TableBody, TableCell, TableContainer,TableHead,TableRow, Table} from '@mui/material';

  function FinanceEntriesList() {
    const [filteredEntries, setFilteredEntries] = useState([]);
    const [filter, setFilter] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
  
    useEffect(() => {
      fetchEntries();
    }, []);
  
    const fetchEntries = async () => {
      try {
        const data = await RequestHandler.fetchEntries(); // Adjusted this line
        if (Array.isArray(data.data)) {
          setFilteredEntries(data.data);
        } else {
          console.error('Data is not an array:', data);
        }
      } catch (error) {
        console.error('Failed to fetch entries:', error);
      }
    };
  
    const handleFilterChange = (e) => {
      const category = e.target.value;
      setFilter(category);
      if (category) {
        setFilteredEntries(filteredEntries.filter(entry => entry.category === category)); // Adjusted this line
      } else {
        fetchEntries();
      }
    };
      
    const handleCalculateBalance = async () => {
      try {
        const balance = await RequestHandler.calculateBalance(startDate, endDate);
        alert(`Total balance from ${startDate} to ${endDate}: ${balance.balance}`);
      } catch (error) {
        console.error(error.message);
      }
    };

  return (
    <Grid container spacing={2} alignItems="center" justifyContent="center">
      <Grid item xs={6}>
        <TextField
          label="Start Date"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          fullWidth
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="End Date"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" color="primary" onClick={handleCalculateBalance}>
          Calculate Balance
        </Button>
      </Grid>
      <Grid item xs={12}>
      <FormControl fullWidth>
          <InputLabel>Category</InputLabel>
          <Select value={filter} onChange={handleFilterChange} label="Category">
            <MenuItem value="">All</MenuItem>
            <MenuItem value="income">Income</MenuItem>
            <MenuItem value="expense">Expense</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
      <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Expense Type</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredEntries.map((entry) => (
              <TableRow key={entry.id}>
                <TableCell component="th" scope="row">
                  {entry.category}
                </TableCell>
                <TableCell align="right">{entry.amount}</TableCell>
                <TableCell>{entry.description}</TableCell>
                <TableCell>{new Date(entry.date).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
    </Grid>
  );
}

export default FinanceEntriesList;
