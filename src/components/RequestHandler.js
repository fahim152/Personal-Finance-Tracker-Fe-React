class RequestHandler {
    static baseUrl = 'http://localhost:8090/api';
  
    static async fetchEntries(filterList = []) {
      const response = await fetch(`${this.baseUrl}/finance-entry`);
      if (!response.ok) {
        throw new Error('Error fetching entries');
      }
      return response.json();
    }
  
    static async calculateBalance(startDate, endDate) {
      const response = await fetch(`${this.baseUrl}/finance-entry/calculate-balance?start_date=${startDate}&end_date=${endDate}`);
      if (!response.ok) {
        throw new Error('Error calculating balance');
      }
      return response.json();
    }
    
    static async addEntry(entryData) {
        const response = await fetch(`${this.baseUrl}/finance-entry`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(entryData),
        });

        if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error submitting entry');
        }

        return response.json();
    }
  }
  
  export default RequestHandler;
  