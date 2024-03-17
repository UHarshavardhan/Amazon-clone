import React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import "./product.css"
import { useEffect,useState } from "react";
import axios from "axios";
import { MdFilterListAlt } from "react-icons/md";


const Product=()=>{
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [sortBy,setSortBy]=useState('')

    useEffect(() => {
        setLoading(true);
        axios.get('http://localhost:8000/api/v1/products')
            .then(response => {
                setProducts(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching product data:', error);
                setLoading(false);
            });
    }, []);

    const handleSortChange = (event, newSortBy) => {
        if (newSortBy) {
            setSortBy(newSortBy);
            // Implement sorting logic based on newSortBy value
            // You might need to update the products state accordingly
        }
    };

    return (
        <div>
    {loading ? (
            <p>Loading...</p>
        ) : (
            <div>
            
            <div className="searchbar">
                <div >
                  <button> <MdFilterListAlt/></button> 
                    </div>
 <div>
 <input type="search" placeholder="search"/>
                        </div>
                </div>

            <div className="content">

                {products.map(product => (
                  <div key={product.id} className="display ">
                    <div className="image1">
                        <img src={product.imageURL} width='200' length='200'></img>
                        </div>
                        <div className="text1">
                        <h3>{product.name}</h3>
                         <h2>{product.description}</h2>
                        <p>{product.price}</p>
                        </div>
                    </div>
                ))}
            </div>
            </div>
        )}
    </div>
);
}   

export default Product