import React from 'react';
import FinanceEntryForm from './components/FinanceEntryForm';
import FinanceEntriesList from './components/FinanceEntryList';

function App() {
  // The state and functions related to the entry handling have been removed
  // since you mentioned they are already handled within the components themselves.

  return (
    <div className="App">
      <h1>Finance Tracker</h1>
      <FinanceEntryForm />
      <FinanceEntriesList />
    </div>
  );
}

export default App;
