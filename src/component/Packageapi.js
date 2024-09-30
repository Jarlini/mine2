import axios from 'axios';
const API_URL = 'http://localhost:5000'; // Adjust as per your server

export const getPackages = async () => {
  try {
      const response = await axios.get('/api/packages'); // Make sure this matches your server route
      return response.data;
  } catch (error) {
      console.error('Error fetching packages:', error);
      throw error; // Re-throw to handle it in the calling component
  }
};
export const deletePackage = async (id) => {
    await fetch(`${API_URL}/delete-package/${id}`, {
        method: 'DELETE',
    });
};
