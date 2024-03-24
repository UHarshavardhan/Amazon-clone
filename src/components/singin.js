import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import "./signin.css"

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [successfully,setSucessfull]=useState('')

    const navigate=useNavigate()

    const handleData = (e) => {
        e.preventDefault(); 

        const data = {
            email,
            password
        };

        setLoading(true);
        axios.post('http://localhost:8000/api/v1/auth', data)
            .then((response) => {
                if(response.status==200){
                    setSucessfull("Login sucessfull");

              setTimeout(() => {
                        setLoading(false);
                        navigate('/eshop/product')
                    }, 1000);

              
                    


                }
              
            })
            .catch((error) => {
                if (error.response && error.response.data) {
                    setError(error.response.data); // Extract error message from response data
                    setLoading(false)
                } else {
                    setError(error.message); 
                    setLoading(false)
            
            };
    });
   }

    return (
        <div>
            <div className="form">
              
            <form onSubmit={handleData}>

               <h4> Sign In</h4>
                <label htmlFor="email">
                    Email
                </label><br/>
                <input type="email" placeholder="Enter your Email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} /><br/>
                <label htmlFor="password">
                    Password
                </label><br/>
                <input type="password" placeholder="Enter your Password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} /><br/>
                <button type="submit">Submit</button>
            </form>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {successfully&&<p>{successfully}</p>}
            
            </div>
        </div>
    );
};


export default SignIn;
