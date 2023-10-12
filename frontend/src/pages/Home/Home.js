import React, { useState, useCallback, useEffect } from "react";
import Grid from "../../components/Grid/Grid"; // Import the Grid component
import { searchProducts } from "../../apis/products";
import "./Home.css"; // Import any styles for your Home component
import AddProductForm from "../../components/AddProductForm/AddProductForm";
import { deleteProduct } from "../../apis/product";

function Home() {
  const [products, setProducts] = useState([]);
  const [columnNames, setColumnNames] = useState([]);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null); // Store the selected row data
  const [developerNameSearch, setDeveloperNameSearch] = useState("");
  const [scrumMasterNameSearch, setScrumMasterNameSearch] = useState("");

  const fetchProductData = useCallback(async () => {
    try {
      const data = await searchProducts(developerNameSearch, scrumMasterNameSearch);

      if (data) {
        if (Array.isArray(data) && data.length > 0) {
          const firstProduct = data[0];
          const columns = Object.keys(firstProduct);
          setColumnNames(columns);
          setProducts(data);
        } else {
          console.log(data);
          console.error("Data is not an array or is empty.");
        }
      } else {
        console.error("Data retrieval failed.");
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  }, [developerNameSearch, scrumMasterNameSearch]);


  useEffect(() => {
    console.log("Fetching data...");
    fetchProductData()
  }, [fetchProductData]);

  // Function to open the add product modal
  const openAddModal = () => {
    setAddModalOpen(true);
  };

  // Function to close the add product modal
  const closeModal = () => {
    setSelectedRow(null);
    setAddModalOpen(false);
  };

  // Function to open the edit modal
  const openEditModal = (row) => {
    setSelectedRow(row);
    setAddModalOpen(true);
  };

  // Function to open the edit modal
  const onDeleteClick = async (row) => {
    await deleteProduct(row.productId);
    await fetchProductData();
    alert(row.productName + " deleted Successfully.")
  };
  
  const performSearch = () => {
    fetchProductData()
  };

  return (
    <div>
      <div className="summary">
        <div className="title">
          <h1>BC Government Ministry of Education and Child Care (ECC)</h1>
          <p>catalog of current modern web applications in GitHub </p>
        </div>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by Developer Name"
            value={developerNameSearch}
            onChange={(e) => setDeveloperNameSearch(e.target.value)}
          />
          <input
            type="text"
            placeholder="Search by Scrum Master Name"
            value={scrumMasterNameSearch}
            onChange={(e) => setScrumMasterNameSearch(e.target.value)}
          />
          <button className="search-button" onClick={performSearch}>
            Search
          </button>
        </div>
        <div className="product-counter">
          <h2>TOTAL PRODUCTS: {products.length}</h2>
        </div>
        <button className="add-product-button" onClick={openAddModal}>
          Add Product
        </button>
      </div>

      <Grid
        data={products}
        columns={columnNames}
        multiValueCols={["developers"]}
        onEditClick={openEditModal}
        onDeleteClick={onDeleteClick}
      />
      {/* Render the add product modal when isAddModalOpen is true */}
      {isAddModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div>
              <AddProductForm
                closeModal={closeModal}
                fetchProductData={fetchProductData}
                data={selectedRow}
                isNewProduct={selectedRow === null}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
