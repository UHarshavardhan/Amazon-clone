import React from "react";
import { useState,useEffect } from "react";
import { Link,useNavigate} from "react-router-dom";
import axios from "axios";



const Signup=()=>{
    const[email,setEmail]=useState('');
    const[firstName,setfirst]=useState('');
    const[lastName,setlast]=useState('');
    const[password,setPassword]=useState('');
    const[contactNumber,setPhone]=useState('');
    const[loading,setLoading]=useState(false);
    const[successfully,setSucessfull]=useState('');
    const[error,setError]=useState('');

    const navigate=useNavigate();

    const handlesignup = (e) => {
        e.preventDefault(); // Prevent default form submission
        setLoading(true);
        const data = {
            email,
            firstName,
            lastName,
            password,
            contactNumber
        };
    
        axios.post('http://localhost:8000/api/v1/users', data)
            .then((response) => {
                setLoading(false);
                if (response.status === 200) {
                    setSucessfull("Account successfully created");
                    setTimeout(() => {
                        navigate('/eshop/signin');
                    }, 2000);
                }
            })
            .catch((error) => {
                setError(error.response.data);
                setLoading(false);
            });
    }
    
    
    

    return(
    <div>
<div className="signup">
    <h4>Sign Up</h4>
    <form onSubmit={handlesignup}>
       <label>Email</label><br/>
       <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/><br/>
       <label>Password</label><br/>
       <input type="password" placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)}/><br/>
       <label>Firstname</label><br/>
       <input type="Text" placeholder="Firstname" value={firstName} onChange={(e)=>setfirst(e.target.value)}/><br/>
       <label>LastName</label><br/>
       <input type="Text" placeholder="Lastname" value={lastName} onChange={(e)=>setlast(e.target.value)}/><br/>
       <label>Phone Number</label><br/>
       <input type="text" placeholder="contactNumberr" value={contactNumber} onChange={(e)=>setPhone(e.target.value)}/><br/>
       <button>Submit</button>
    </form>
    {loading && <p>loading</p>}
       {error && <p>error:{error}</p>}
       {successfully && <p>{successfully}</p>}
         
</div>
    </div>
    )
}

export default Signup;