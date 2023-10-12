import React from "react";
import "./Grid.css";

function Grid({ data, columns, multiValueCols, onEditClick }) {
  return (
    <div className="grid-container">
      <table className="grid-table">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index}>
                {column?.toUpperCase() === "SCRUMMASTERNAME"
                  ? "SCRUM MASTER NAME"
                  : column?.toUpperCase() === "PRODUCTOWNERNAME"
                  ? "PRODUCT OWNER NAME"
                  : column?.toUpperCase() === "PRODUCTNAME"
                  ? "PRODUCT NAME"
                  : column?.toUpperCase() === "STARTDATE"
                  ? "START DATE"
                  : column?.toUpperCase() === "PRODUCTID"
                  ? "PRODUCT ID"
                  : column?.toUpperCase() 
                  }
              </th>
            ))}
            <th>EDIT</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column, columnIndex) => {
                if (multiValueCols.includes(columns[columnIndex])) {
                  return (
                    <td key={columnIndex}>
                      <div className="multi-value-cell">
                        {row[column].map((item, index) => (
                          <div key={index} className="block-item">
                            {item}
                          </div>
                        ))}
                      </div>
                    </td>
                  );
                } else {
                  return <td key={columnIndex}>{row[column]}</td>;
                }
              })}
              <td>
                <button onClick={() => onEditClick(row)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Grid;
