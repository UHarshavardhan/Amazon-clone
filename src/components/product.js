import React from "react";

import { CardActionArea, Checkbox } from '@mui/material';
import "./product.css"
import { useEffect,useState } from "react";
import axios from "axios";
import { MdFilterListAlt } from "react-icons/md";
import { filter } from "lodash";
import { RxCross2,RxHome } from "react-icons/rx";
import { valid } from "joi";
import { Navigate } from "react-router";
import { Link } from "react-router-dom";





const Product=()=>{
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [sortedProducts ,setSortBy]=useState('')
    const [Filter,setfilter]=useState(false);
    const [buttonClassName, setButtonClassName] = useState('Togglescreen');
    const [categories,setCategories]=useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [search,setSearch]=useState([]);
   


    const toggleScreen = () => {
       setfilter(false);
      };


    useEffect(() => {
        display();
        fectcategories();

        
    }, []);

    


    const display=()=>{
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

    }
    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
      };
    
      const filteredProducts = selectedCategory
        ? products.filter((product) => product.category === selectedCategory)
        : products ;


    const fectcategories= async()=>{
        try{
        setLoading(true);
       
            const response=await axios.get('http://localhost:8000/api/v1/products/categories')
                setCategories(response.data);
                setLoading(false);
            }
            catch(error) {
                console.error('Error fetching product data:', error);
                setLoading(false);
            };
    }



    const handleSortChange = (event, newSortBy) => {
        setSortBy(newSortBy);
        let sortedProducts = [...products];
        switch (newSortBy) {
            case 'highToLow':
                sortedProducts.sort((a, b) => b.price - a.price);
                break;
            case 'lowToHigh':
                sortedProducts.sort((a, b) => a.price - b.price);
                break;
            default:
             
                break;
        }
        setProducts(sortedProducts);
    };


    const handleSearch = (word) => {
        setSearch(word);
        const searchItems = word ? products.filter(product => product.name.includes(word.toUpperCase())) : products;
        console.log(searchItems);
        setProducts(searchItems);
    };
    
    
    

   

    return (
        <div>
    {loading ? (
            <p>Loading...</p>
        ) : (
 <div>
       
            <div className="searchbar">
                <div >
                  <button onClick={()=>{setfilter(true)}}><MdFilterListAlt/></button> 
                    </div>
               <div className="search">
               <input type="search" placeholder="search" value={search} onChange={(e) => handleSearch(e.target.value)} />

                        </div>
                </div>
                        <div className="Categories">
                           {categories.map(category => (
                           <div key={category.id}>
                          <button className="categories-button" onClick={()=>handleCategoryClick(category)}><h3>{category}</h3></button>
                                     </div>
                                        ))}
                                          </div>

                 
        <div className="Toggle">
        {Filter &&    
               <div className={filter?"Togglescreen active": "Togglescreen"} >
                   
                  
             <div className="menu-content">
                 <ul>
                 <li>
                 <Checkbox
    onChange={(event) => {
        handleSortChange(event, 'highToLow');
    }}
/>High To Low

                                        </li>
                                        <li>
                                            <Checkbox onChange={(event) => handleSortChange(event, 'lowToHigh')} />Low to high
                                        </li>
                    <Checkbox/>New Arival 
                 </ul>
               </div>
               <div className="cross">
                   <button onClick={toggleScreen} > <RxCross2  size={20} /></button> 
                    </div>
                </div>
                   } 
              </div>

            <div className="content">
          
                {filteredProducts.map(product => (
                  <div key={product._id} className="display" onClick={() => console.log(product._id)}>
                    <div className="image1">
                        <img src={product.imageURL} width='200' length='200'></img>
                        </div>
                        <div className="text1">
                      <h3>{product.name}</h3>
                         <h2>{product.description}</h2>
                        <l>{product.price} Rs</l>
                        
                        < Link to={`/eshop/products/${product._id}`}>
                        <button id="buybutton">Buy</button>
                        </Link>

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