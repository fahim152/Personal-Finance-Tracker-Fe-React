import React, { useState } from 'react';
import RequestHandler from './RequestHandler';

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
      // Safety check before calling onSubmit
      if (typeof onSubmit === 'function') {
        onSubmit(addedEntry);
      } else {
        console.error('onSubmit is not a function');
        // Optionally, you could provide more feedback here, e.g., a fallback action
      }
      setEntry({ date: '', amount: '', category: '', description: '' });
      alert('Submitted Successfully');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="date"
        name="date"
        value={entry.date}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="amount"
        value={entry.amount}
        onChange={handleChange}
        required
      />
      <select
        name="category"
        value={entry.category}
        onChange={handleChange}
        required
      >
        <option value="">Select Category</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>
      <input
        type="text"
        name="description"
        value={entry.description}
        placeholder="Description"
        onChange={handleChange}
      />
      <button type="submit">Add Entry</button>
    </form>
  );
}

export default FinanceEntryForm;
