class RequestHandler {
    static baseUrl = 'http://localhost:8090/api'; // Adjust this URL to match your actual API endpoint
  
    static async fetchEntries() {
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
            // Include other headers as required by your backend, like authorization headers
        },
        body: JSON.stringify(entryData),
        });

        if (!response.ok) {
        // Convert non-2xx HTTP responses into errors
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error submitting entry');
        }

        return response.json();
    }
  }
  
  export default RequestHandler;
  