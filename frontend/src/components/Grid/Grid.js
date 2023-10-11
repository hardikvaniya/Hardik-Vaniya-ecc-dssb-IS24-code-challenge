import React from 'react';
import './Grid.css';

function Grid({ data, columns, multiValueCols, onEditClick }) {
  return (
    <div className="grid-container">
      <table className="grid-table">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index}>{column}</th>
            ))}
            <th>Edit</th> {/* Add a new column for the Edit button */}
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
                  return (
                    <td key={columnIndex}>{row[column]}</td>
                  );
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
