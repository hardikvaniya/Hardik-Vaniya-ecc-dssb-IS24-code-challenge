export async function addProduct(data) {
    // Make a POST request and handle errors using the try/catch block
    try {
      const response = await fetch('http://localhost:5000/api/product', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error adding product:', error.message);
    }

}
  