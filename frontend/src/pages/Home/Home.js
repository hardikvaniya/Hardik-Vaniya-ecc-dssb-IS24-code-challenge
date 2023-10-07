import React from 'react';
import Grid from '../../components/Grid/Grid'; // Import the Grid component
import { fetchData } from '../../apis/products';
import './Home.css'; // Import any styles for your Home component

function Home() {
    const columnNames = ['productId', 'productName', 'productOwnerName'];
    const [products, setProducts] = React.useState([]);
    const [counter, setCounter] = React.useState(0);

    // make call to async function fetchData and store the response in products
    React.useEffect(() => {
        async function fetchProducts() {
            const data = await fetchData();
            setProducts(data);
        }
        fetchProducts();
    }, []);
    return (
        <div>
            <h1>Welcome to the Home Page</h1>
            <p>This is the home page of your React app.</p>
            
            <Grid data={products} columns={columnNames} /> 
        </div>
    );
}

export default Home;
