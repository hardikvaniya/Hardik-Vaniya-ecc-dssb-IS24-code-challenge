import React, { useState } from "react";
import Grid from "../../components/Grid/Grid"; // Import the Grid component
import { fetchData } from "../../apis/products";
import "./Home.css"; // Import any styles for your Home component
import AddProductForm from "../../components/AddProductForm/AddProductForm";
import EditProductForm from "../../components/EditProductForm/EditProductForm";

function Home() {
  const [products, setProducts] = useState([]);
  const [columnNames, setColumnNames] = useState([]);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null); // Store the selected row data
  const [isEditModalOpen, setEditModalOpen] = useState(false); // State to control the edit modal visibility
  const [developerNameSearch, setDeveloperNameSearch] = useState("");
  const [scrumMasterNameSearch, setScrumMasterNameSearch] = useState("");

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
          console.error("Data is not an array or is empty.");
        }
      } else {
        console.error("Data retrieval failed.");
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  }

  React.useEffect(() => {
    console.log("Fetching data...");
    fetchProductData();
  }, []);

//  

  // Function to open the add product modal
  const openAddModal = () => {
    setAddModalOpen(true);
  };

  // Function to close the add product modal
  const closeModal = () => {
    setSelectedRow(null);
    setAddModalOpen(false);
    setEditModalOpen(false);
  };

  // Function to open the edit modal
  const openEditModal = (row) => {
    setSelectedRow(row);
    setAddModalOpen(true);
  };
  const performSearch = () => {
    // want to call routes/search.js
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
          <p>TOTAL PRODUCTS: {products.length}</p>
        </div>
        <button className="add-product-button" onClick={openAddModal}>
          Add Product
        </button>
      </div>

      <Grid
        data={products}
        columns={columnNames}
        multiValueCols={["developers"]}
        onEditClick={openEditModal} /* Pass the openEditModal function */
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
              />
            </div>
            {/* <button onClick={closeModal}>Close</button> */}
          </div>
        </div>
      )}

      {/* Render the edit product modal when isEditModalOpen is true */}
      {isEditModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <EditProductForm
              productData={selectedRow}
              fetchProductData={fetchProductData}
              closeModal={closeModal}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
