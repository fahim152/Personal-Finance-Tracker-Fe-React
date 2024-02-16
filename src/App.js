import React from 'react';
import FinanceEntryForm from './components/FinanceEntryForm';
import FinanceEntriesList from './components/FinanceEntryList';

function App() {
  return (
    <div className="App">
      <h1>Finance Tracker</h1>
      <FinanceEntryForm />
      <FinanceEntriesList />
    </div>
  );
}

export default App;
