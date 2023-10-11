import React, { useState } from 'react';

function EditProductForm({ productData, onSave, onClose }) {
    const [editedData, setEditedData] = useState({ ...productData });

    const handleFieldChange = (e, field, index) => {
        const { value } = e.target;
    
        if (field === 'Developers') {
            const updatedDevelopers = [...editedData.Developers];
    
            if (index >= 0 && index < updatedDevelopers.length) {
                // Edit an existing developer name
                updatedDevelopers[index] = value;
            } else if (updatedDevelopers.length < 5) {
                // Add a new developer name if there are less than 5
                updatedDevelopers.push(value);
            }
    
            setEditedData((prevState) => ({
                ...prevState,
                Developers: updatedDevelopers,
            }));
        } else {
            setEditedData((prevState) => ({
                ...prevState,
                [field]: value,
            }));
        }
    };

    const handleSaveClick = () => {
        onSave(editedData);
        onClose();
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
                {Array.isArray(editedData.Developers) ? (
                    editedData.Developers.map((developer, index) => (
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
                        value={editedData.Developers}
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
            <button onClick={handleSaveClick}>Save</button>
            <button onClick={onClose}>Cancel</button>
        </div>
    );
}

export default EditProductForm;
