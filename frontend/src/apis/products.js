export async function searchProducts(developer, scrumMaster) {
    try {
      const response = await fetch(`http://localhost:5000/api/products/search?developer=${developer}&scrum_master=${scrumMaster}`);
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      return data.products;
    } catch (error) {
      console.error('Error fetching data:', error);
      return null; // Return null or handle the error as needed
    }
}