import React, { useState } from 'react';
import {
    TextField,
    Button,
    Select,
    MenuItem,
    FormControl,
    IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { addProduct } from '../../apis/product'; 
import './AddProductForm.css'; // Import your CSS file

const AddProductForm = ({ closeModal, fetchProductData }) => {
    const [formData, setFormData] = useState({
        productName: '',
        productOwnerName: '',
        developers: [''],
        scrumMasterName: '',
        startDate: '',
        methodology: 'Agile',
        location: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const addDeveloperField = () => {
        if (formData.developers.length < 5) {
            setFormData({ ...formData, developers: [...formData.developers, ''] });
        }
    };

    const removeDeveloperField = (index) => {
        const newDevelopers = [...formData.developers];
        newDevelopers.splice(index, 1);
        setFormData({ ...formData, developers: newDevelopers });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Call the addProduct function with the formData
            const result = await addProduct(formData);
    
            if (result) {
                // If the product was added successfully, you can handle the result
                // You can display a success message or navigate to a different page
                console.log('Product added successfully:', result);

                // Fetch the updated product data
                fetchProductData();

                // Call the closeModal function to close the modal
                closeModal();

                alert('Product added successfully!')
            } else {
                // Handle the case where adding the product failed
                console.error('Product addition failed.');
            }
        } catch (error) {
            console.error('Error adding product:', error.message);
        }
    };
    
    return (
        <form onSubmit={handleSubmit}>
            <h2>Add Product</h2>
            <div>
                <TextField
                    label="Product Name"
                    name="productName"
                    value={formData.productName}
                    onChange={handleChange}
                    required
                />
            </div>

            <div>
                <TextField
                    label="Product Owner Name"
                    name="productOwnerName"
                    value={formData.productOwnerName}
                    onChange={handleChange}
                    required
                />
            </div>

            <div>
                <div style={{ display: 'flex' }}>
                    {formData.developers.map((developer, index) => (
                        <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
                            <TextField
                                label={`Developer ${index + 1}`}
                                value={developer}
                                onChange={(e) => {
                                    const newDevelopers = [...formData.developers];
                                    newDevelopers[index] = e.target.value;
                                    setFormData({ ...formData, developers: newDevelopers });
                                }}
                                required
                            />
                            {formData.developers.length > 1 && (
                                <IconButton
                                    onClick={() => removeDeveloperField(index)}
                                    style={{
                                        alignSelf: 'flex-start',
                                        marginLeft: '5px',
                                    }}
                                >
                                    <CloseIcon color="error" style={{ fontSize: '16px' }} />
                                </IconButton>
                            )}
                        </div>
                    ))}
                </div>
                {formData.developers.length < 5 && (
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={addDeveloperField}
                    >
                        Add Developer
                    </Button>
                )}
            </div>

            <div>
                <TextField
                    label="Scrum Master Name"
                    name="scrumMasterName"
                    value={formData.scrumMasterName}
                    onChange={handleChange}
                    required
                />
            </div>

            <div>
                <TextField
                    label="Start Date"
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                    required
                />
            </div>

            <div>
                <FormControl>
                    <Select
                        name="methodology"
                        value={formData.methodology}
                        onChange={handleChange}
                        required
                    >
                        <MenuItem value="Agile">Agile</MenuItem>
                        <MenuItem value="Waterfall">Waterfall</MenuItem>
                    </Select>
                </FormControl>
            </div>

            <div>
                <TextField
                    label="Location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                />
            </div>

            <Button variant="contained" color="primary" type="submit">
                Submit
            </Button>
        </form>
    );
};

export default AddProductForm;
