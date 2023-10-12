import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  IconButton,
  Grid,
  Container,
  Typography,
} from "@mui/material";
import Delete from "@mui/icons-material/Delete";
import CloseModal from "@mui/icons-material/Close";
import { addProduct, updateProduct } from "../../apis/product";

const AddProductForm = ({ closeModal, fetchProductData, data }) => {
  const [formData, setFormData] = useState({
    productName: "",
    productOwnerName: "",
    developers: [""],
    scrumMasterName: "",
    startDate: "",
    methodology: "Agile",
    location: "",
  });
  const [formErrors, setFormErrors] = useState({
    productName: false,
    productOwnerName: false,
    developers: [],
    scrumMasterName: false,
    startDate: false,
    location: false,
  });

  useEffect(() => {
    if (data) {
      setFormData(data);
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Reset the error for the field on change
    setFormErrors({ ...formErrors, [name]: false });
  };

  const addDeveloperField = () => {
    if (formData.developers.length < 5) {
      setFormData({ ...formData, developers: [...formData.developers, ""] });
    }
  };

  const removeDeveloperField = (index) => {
    if (formData.developers?.length <= 1) return;
    const newDevelopers = [...formData.developers];
    newDevelopers.splice(index, 1);
    setFormData({ ...formData, developers: newDevelopers });
  };

  const handleSubmit = async () => {
    const errors = validateForm(formData);
    if (hasErrors(errors)) {
      setFormErrors(errors);
      return;
    }

    try {
      let result;
      if (formData?.productId) {
        result = await updateProduct(formData?.productId, formData);
      } else {
        result = await addProduct(formData);
      }

      if (result) {
        fetchProductData();
        closeModal();
        alert("Product added successfully!");
      } else {
        console.error("Product addition failed.");
      }
    } catch (error) {
      console.error("Error adding product:", error.message);
    }
  };

  const hasErrors = (errors) => {
    return Object.values(errors).some((error) => error);
  };

  const validateForm = (data) => {
    const errors = {
      productName: data.productName === "",
      productOwnerName: data.productOwnerName === "",
      developers: data.developers.some((developer) => developer === ""),
      scrumMasterName: data.scrumMasterName === "",
      startDate: data.startDate === "",
      location: data.location === "",
    };

    return errors;
  };

  return (
    <Container>
      <Grid container justifyContent={"space-between"}>
        <Grid item xs={2}>
          <IconButton onClick={closeModal}>
            <CloseModal />
          </IconButton>
        </Grid>
        <Grid item xs mb={2}>
          <Typography variant="h4">Add Product</Typography>
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>

      <Grid
        container
        justifyContent={"center"}
        spacing={2}
        alignItems="stretch"
        xs={12}
      >
        <Grid item xs={12}>
          <TextField
            label="Product Name"
            name="productName"
            value={formData.productName}
            onChange={handleChange}
            required
            error={formErrors.productName}
            fullWidth
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Product Owner Name"
            name="productOwnerName"
            value={formData.productOwnerName}
            onChange={handleChange}
            required
            error={formErrors.productOwnerName}
            fullWidth
          />
        </Grid>

        <Grid item xs={12}>
          <Grid container mb={2} spacing={2}>
            {formData.developers.map((developer, index) => (
              <Grid
                item
                key={index}
                xs={12}
                style={{ display: "flex", alignItems: "center", gap: 4 }}
              >
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label={`Developer ${index + 1}`}
                    value={developer}
                    onChange={(e) => {
                      const newDevelopers = [...formData.developers];
                      newDevelopers[index] = e.target.value;
                      setFormData({ ...formData, developers: newDevelopers });
                    }}
                    required
                    error={formErrors.developers[index]}
                  />
                </Grid>
                {formData.developers?.length > 1 && (
                  <Grid item>
                    <IconButton
                      aria-label="delete"
                      size="large"
                      onClick={() => removeDeveloperField(index)}
                    >
                      <Delete fontSize="inherit" />
                    </IconButton>
                  </Grid>
                )}
              </Grid>
            ))}
          </Grid>
          {formData.developers.length < 5 && (
            <Button
              variant="contained"
              color="primary"
              onClick={addDeveloperField}
            >
              Add Developer
            </Button>
          )}
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Scrum Master Name"
            name="scrumMasterName"
            value={formData.scrumMasterName}
            onChange={handleChange}
            required
            error={formErrors.scrumMasterName}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Start Date"
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            required
            error={formErrors.startDate}
          />
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth>
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
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            error={formErrors.location}
          />
        </Grid>

        <Grid item xs={12}>
          <Button
            onClick={() => handleSubmit()}
            variant="contained"
            color="primary"
            type="submit"
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AddProductForm;
