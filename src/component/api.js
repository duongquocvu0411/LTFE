import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Sanpham = () => {
  const [sanpham, setSanpham] = useState([]);
  const [tensp, setTensp] = useState('');
  const [gia, setGia] = useState('');
  const [hinhanh, setHinhanh] = useState(null);

  // Fetch products on component mount
  useEffect(() => {
    fetchSanpham();
  }, []);

  // Fetch the list of products (GET request)
  const fetchSanpham = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/sanpham');
      setSanpham(response.data);
    } catch (error) {
      console.error('Error fetching sanpham:', error);
    }
  };

  // Handle form submission (POST request)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('tensp', tensp);
    formData.append('gia', gia);
    formData.append('hinhanh', hinhanh);

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/sanpham', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Product created:', response.data);

      // Clear the form fields
      setTensp('');
      setGia('');
      setHinhanh(null);

      // Fetch updated list of products
      fetchSanpham();
      alert("Product added successfully!");
    } catch (error) {
      console.error('Error posting sanpham:', error);
    }
  };

  // Handle file input change
  const handleFileChange = (e) => {
    setHinhanh(e.target.files[0]);
  };

  return (
    <div>
      <h2>Sanpham List</h2>

      {/* Form for adding a new product */}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Tên sản phẩm:</label>
          <input
            type="text"
            value={tensp}
            onChange={(e) => setTensp(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Giá:</label>
          <input
            type="number"
            value={gia}
            onChange={(e) => setGia(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Hình ảnh:</label>
          <input type="file" onChange={handleFileChange} required />
        </div>

        <button type="submit">Add Sản phẩm</button>
      </form>

      {/* Display the list of products */}
      <div>
        <h3>Product List:</h3>
        <ul>
          {sanpham.map((item) => (
            <li key={item.id}>
              <p><strong>Tên sản phẩm:</strong> {item.tensp}</p>
              <p><strong>Giá:</strong> {item.gia}</p>
              <img
                src={`http://127.0.0.1:8000/${item.hinhanh}`}
                alt={item.tensp}
                width="100"
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sanpham;
