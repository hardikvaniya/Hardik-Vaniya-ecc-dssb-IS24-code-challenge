import React from 'react';
import Grid from '../../components/Grid/Grid'; // Import the Grid component
import { fetchData } from '../../apis/products';
import './Home.css'; // Import any styles for your Home component





function Home() {
    // const columnNames = ['productId', 'productName', 'productOwnerName'];
    const [products, setProducts] = React.useState([]);
    const [columnNames, setColumnNames] = React.useState([]);
    // const [counter, setCounter] = React.useState(0);

    // // Function to increment the counter
    // const incrementCounter = () => {
    //     setCounter(counter + 1);
    // };
    // Fetch data from http://localhost:5000/api/products
    React.useEffect(() => {
        async function fetchProductData() {
            try {
                const data = await fetchData();

                if (data) {
                    // Extract column names from the first item in the array
                    if (Array.isArray(data) && data.length > 0) {
                        const firstProduct = data[0];
                        const columns = Object.keys(firstProduct);
                        setColumnNames(columns);
                        setProducts(data);
                    } else {
                        console.error('Data is not an array or is empty.');
                    }
                } else {
                    console.error('Data retrieval failed.');
                }
            } catch (error) {
                console.error('Error fetching data:', error.message); // Use error.message to display the error message
                // Handle the error or inform the user
            }
        }
        console.log('Fetching data...');
        fetchProductData();
    }, []);

    return (
        <div>
            <h1>Welcome to the Home Page</h1>
            <p>This is the home page of your React app.</p>
            
            <Grid data={products} columns={columnNames} /> 
            {/* <p>Counter: {counter}</p>
            <button onClick={incrementCounter}>Increment Counter</button> */}
        </div>
    );
}

export default Home;