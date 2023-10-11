import React, { useState } from 'react';
import Grid from '../../components/Grid/Grid'; // Import the Grid component
import { fetchData } from '../../apis/products';
import './Home.css'; // Import any styles for your Home component
import AddProductForm from '../../components/AddProductForm/AddProductForm';
import EditProductForm from '../../components/EditProductForm/EditProductForm';

function Home() {
    const [products, setProducts] = useState([]);
    const [columnNames, setColumnNames] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null); // Store the selected row data
    const [isEditOpen, setEditOpen] = useState(false); // State to control the edit modal visibility

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

    React.useEffect(() => {    
        console.log('Fetching data...');
        fetchProductData();
    }, []);

    // Function to open the add product modal
    const openModal = () => {
        setModalOpen(true);
    };

    // Function to close the add product modal
    const closeModal = () => {
        setModalOpen(false);
    };

    // Function to open the edit modal
    const openEditModal = (row) => {
        setSelectedRow(row);
        setEditOpen(true);
    };

    // Function to close the edit modal
    const closeEditModal = () => {
        setEditOpen(false);
        setSelectedRow(null);
    };

    const handleEdit = (editedData) => {
        // Implement your edit logic here, e.g., update the data in the products array
        // Make sure to update the state with the edited data
        // For this example, we'll log the edited data
        console.log('Edited Data:', editedData);

        // Close the edit modal
        closeEditModal();
    };

    return (
        <div>
            <div className='summary'>
                <h1>Welcome to the Home Page</h1>
                <p>This is the home page of your React app.</p>
                <button className='add-product-button' onClick={openModal}>Add Product</button>
            </div>
            <Grid
                data={products}
                columns={columnNames}
                multiValueCols={['Developers']}
                onEditClick={openEditModal} /* Pass the openEditModal function */
            />
            {/* Render the add product modal when isModalOpen is true */}
            {isModalOpen && (
                <div className='modal-overlay'>
                    <div className='modal-content'>
                        <div>
                            <AddProductForm closeModal={closeModal} fetchProductData={fetchProductData}/>
                        </div>
                        <button onClick={closeModal}>Close</button>
                    </div>
                </div>
            )}

            {/* Render the edit product modal when isEditOpen is true */}
            {isEditOpen && (
                <div className='modal-overlay'>
                    <div className='modal-content'>
                        <EditProductForm
                            productData={selectedRow}
                            onSave={handleEdit}
                            onClose={closeEditModal}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default Home;
