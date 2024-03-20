
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; 

const Categories = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/products/${id}`);
        setProduct(response.data);
        
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };
    fetchProductDetails();
  }, [id]); 

  return (
    <div>
      {product ? (
        <div>
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <img src={product.imageURL} alt={product.name} />
          <input type="number" placeholder="Enter quantity" /> {/* Quantity input */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Categories;
