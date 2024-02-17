import React, { useRef } from 'react';
import { Container, Typography, Grid } from '@mui/material';
import FinanceEntryForm from './components/FinanceEntryForm';
import FinanceEntriesList from './components/FinanceEntryList';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const entriesListRef = useRef();

  const handleAddEntry = (newEntry) => {
    entriesListRef.current.addEntry(newEntry);
  };
  return (
    <Container>
      <Typography variant="h2" gutterBottom>
        Finance Tracker
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <FinanceEntryForm onAddEntry={handleAddEntry}/>
        </Grid>
        <Grid item xs={12}>
          <FinanceEntriesList ref={entriesListRef} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
