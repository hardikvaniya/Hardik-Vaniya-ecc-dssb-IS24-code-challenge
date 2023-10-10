import React, { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Select,
  MenuItem,
  FormControl,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const MyForm = () => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Your form submission code here

  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Typography variant="h6">Product Name</Typography>
        <TextField
          label="Product Name"
          name="productName"
          value={formData.productName}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <Typography variant="h6">Product Owner Name</Typography>
        <TextField
          label="Product Owner Name"
          name="productOwnerName"
          value={formData.productOwnerName}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <Typography variant="h6">Developers</Typography>
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
        <Typography variant="h6">Scrum Master Name</Typography>
        <TextField
          label="Scrum Master Name"
          name="scrumMasterName"
          value={formData.scrumMasterName}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <Typography variant="h6">Start Date</Typography>
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
        <Typography variant="h6">Methodology</Typography>
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
        <Typography variant="h6">Location (URL)</Typography>
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

export default MyForm;
