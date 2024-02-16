import React, { useState, useEffect } from 'react';
import RequestHandler from './RequestHandler';

function FinanceEntriesList() {
  const [entries] = useState([]);
  const [filteredEntries, setFilteredEntries] = useState([]);
  const [filter, setFilter] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      const response = await RequestHandler.fetchEntries();
    
      console.log(response);// Assuming the response is in JSON format
      if (Array.isArray(response.data)) { // Check if the data is an array
        setFilteredEntries(response.data);
      } else {
        console.error('Data is not an array:', response);
      }
    } catch (error) {
      console.error('Failed to fetch entries:', error);
    }
  };

  const handleFilterChange = (e) => {
    const category = e.target.value;
    setFilter(category);
    if (category) {
      setFilteredEntries(entries.filter(entry => entry.category === category));
    } else {
      setFilteredEntries(entries);
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
    <div>
      <select value={filter} onChange={handleFilterChange}>
        <option value="">All</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>
      <div>
        <label>
          Start Date:
          <input 
            type="date" 
            value={startDate} 
            onChange={(e) => setStartDate(e.target.value)} 
          />
        </label>
        <label>
          End Date:
          <input 
            type="date" 
            value={endDate} 
            onChange={(e) => setEndDate(e.target.value)} 
          />
        </label>
      </div>
      <button onClick={handleCalculateBalance}>Calculate Balance</button>
      <ul>
        {filteredEntries.map((entry) => (
          <li key={entry.id}>{`${entry.date} - ${entry.category}: ${entry.amount} - ${entry.description}`}</li>
        ))}
      </ul>
    </div>
  );
}

export default FinanceEntriesList;
