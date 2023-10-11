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

export async function updateProduct(productId, updatedData) {
    const url = `http://localhost:5000/api/product/${productId}`;

    // Make a PUT request and handle errors using the try/catch block
    try {
        const response = await fetch(url, {
            method: 'PUT',
            body: JSON.stringify(updatedData),
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
        console.error('Error updating product:', error.message);
    }
}
