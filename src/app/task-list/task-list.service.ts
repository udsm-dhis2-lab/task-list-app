class TaskListService {
  constructor(){
    
  }
  async fetchData() {
    try {
      const response = await fetch('/api/dataSets?fields=id,name,periodType,timelyDays,expiryDays,organisationUnits[id,name]');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }
}

export default TaskListService;
