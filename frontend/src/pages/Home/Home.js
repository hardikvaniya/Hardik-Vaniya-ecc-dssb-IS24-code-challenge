import React, { useState } from 'react';
import Grid from '../../components/Grid/Grid'; // Import the Grid component
import { fetchData } from '../../apis/products';
import './Home.css'; // Import any styles for your Home component
import AddProductForm from '../../components/AddProductForm/AddProductForm';

function Home() {
    const [products, setProducts] = useState([]);
    const [columnNames, setColumnNames] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false); // State to control the modal visibility

    React.useEffect(() => {
        async function fetchProductData() {
            try {
                const data = await fetchData();

                if (data) {
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
                console.error('Error fetching data:', error.message);
            }
        }
        console.log('Fetching data...');
        fetchProductData();
    }, []);

    // Function to open the modal
    const openModal = () => {
        setModalOpen(true);
    };

    // Function to close the modal
    const closeModal = () => {
        setModalOpen(false);
    };

    return (
        <div>
            <div className='summary'>
                <h1>Welcome to the Home Page</h1>
                <p>This is the home page of your React app.</p>
                <button className='add-product-button' onClick={openModal}>Add Product</button>
            </div>
            <Grid data={products} columns={columnNames} multiValueCols={['Developers']} /> 

            {/* Render the modal when isModalOpen is true */}
            {isModalOpen && (
                <div className='modal-overlay'>
                    <div className='modal-content'>
                        <div>
                            <AddProductForm/>
                        </div>
                        {/* Add your form or content for adding a product here */}
                        <button onClick={closeModal}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Home;
