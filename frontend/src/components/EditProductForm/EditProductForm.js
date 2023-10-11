import React, { useState } from 'react';
import { updateProduct } from '../../apis/product';

function EditProductForm({ productData, fetchProductData, closeModal }) {
    const [editedData, setEditedData] = useState({ ...productData });

    const handleFieldChange = (e, field, index) => {
        const { value } = e.target;

        if (field === 'Developers') {
            const updatedDevelopers = [...editedData.developers];

            if (index >= 0 && index < updatedDevelopers.length) {
                // Edit an existing developer name
                updatedDevelopers[index] = value;
            } else if (updatedDevelopers.length < 5) {
                // Add a new developer name if there are less than 5
                updatedDevelopers.push(value);
            }

            setEditedData((prevState) => ({
                ...prevState,
                developers: updatedDevelopers,
            }));
        } else {
            setEditedData((prevState) => ({
                ...prevState,
                [field]: value,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Call the addProduct function with the formData
            const result = await updateProduct(editedData.productId, editedData);
    
            if (result) {
                // If the product was added successfully, you can handle the result
                // You can display a success message or navigate to a different page
                console.log('Product updated successfully:', result);

                // Fetch the updated product data
                fetchProductData();

                // Call the closeModal function to close the modal
                closeModal();

                alert('Product updated successfully!')
            } else {
                // Handle the case where adding the product failed
                console.error('Product addition failed.');
            }
        } catch (error) {
            console.error('Error adding product:', error.message);
        }
    };

    return (
        <div className="edit-product-form">
            <h2>Edit Product</h2>
            <div>
                <label>Product Name:</label>
                <input
                    type="text"
                    value={editedData.productName}
                    onChange={(e) => handleFieldChange(e, 'productName')}
                />
            </div>
            <div>
                <label>Product Owner Name:</label>
                <input
                    type="text"
                    value={editedData.productOwnerName}
                    onChange={(e) => handleFieldChange(e, 'productOwnerName')}
                />
            </div>
            <div>
                <label>Developers:</label>
                {Array.isArray(editedData.developers) ? (
                    editedData.developers.map((developer, index) => (
                        <input
                            key={index}
                            type="text"
                            value={developer}
                            onChange={(e) => handleFieldChange(e, 'Developers', index)}
                        />
                    ))
                ) : (
                    <input
                        type="text"
                        value={editedData.developers}
                        onChange={(e) => handleFieldChange(e, 'Developers')}
                    />
                )}
            </div>
            <div>
                <label>Scrum Master Name:</label>
                <input
                    type="text"
                    value={editedData.scrumMasterName}
                    onChange={(e) => handleFieldChange(e, 'scrumMasterName')}
                />
            </div>
            <div>
                <label>Start Date:</label>
                <input
                    type="text"
                    value={editedData.startDate}
                    onChange={(e) => handleFieldChange(e, 'startDate')}
                />
            </div>
            <div>
                <label>Methodology:</label>
                <select
                    value={editedData.methodology}
                    onChange={(e) => handleFieldChange(e, 'methodology')}
                >
                    <option value="Agile">Agile</option>
                    <option value="Waterfall">Waterfall</option>
                </select>
            </div>
            <div>
                <label>Location:</label>
                <input
                    type="text"
                    value={editedData.location}
                    onChange={(e) => handleFieldChange(e, 'location')}
                />
            </div>
            <button onClick={handleSubmit}>Save</button>
            <button onClick={closeModal}>Cancel</button>
        </div>
    );
}

export default EditProductForm;
