// dataFetcher.js

export async function fetchData() {
    try {
      const response = await fetch('http://localhost:5000/api/products');
  
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
  
// export function someOtherFunction() {
//     // Define another function
// }
  