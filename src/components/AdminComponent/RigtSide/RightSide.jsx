import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RightSide = () => {
  const [customerData, setCustomerData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Call the API when the component mounts
    axios.get('http://localhost:5000/api/customer_scoring')
      .then(response => {
        setCustomerData(response.data);
      })
      .catch(err => {
        setError("Error fetching data");
        console.error(err);
      });
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {/* <h1>Customer Scoring</h1>
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Total Price</th>
            <th>Potential Buyer</th>
          </tr>
        </thead>
        <tbody>
          {customerData.map((customer, index) => (
            <tr key={index}>
              <td>{customer.user}</td>
              <td>{customer.totalPrice}</td>
              <td>{customer.potential_buyer ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table> */}
    </div>
  );
};
export default RightSide;
