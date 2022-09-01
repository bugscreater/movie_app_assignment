import React from 'react'
import { useState } from 'react';
import "./signin.css";
import {Link} from "react-router-dom";
import { base_url } from '../Config';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Signin = () => {
  const[email,setEmail] = useState();
  const[password,setPassword] = useState();
  const navigate = useNavigate();

  const setguestuser = () =>{
    setEmail("pandeyshubhambhu09@gmail.com");
    setPassword("123456");
  }

  const handlesubmit = async(e) =>{
    e.preventDefault();
    
    await axios.post(`${base_url}login`,{email:email,password:password},{
      headers: {
        "Content-Type": "application/json",
      },
    }).then((user)=>{
      localStorage.setItem("user",email);
      navigate("/home");
    }).catch(err=>{
      alert("something went wrong.")
      console.log(err);
    }) 
    
  }

  return (
    <div className='my_container'>
         <div className="my_card">
            <div className="inner-box">
                <div className="card-front">
                    <h2 className='login'>Login</h2>
                    <form onSubmit={handlesubmit}>
                    <input type="email" placeholder='Enter your mail id' required className='input-box' onChange={(e)=>{setEmail(e.target.value)}}
                    value = {email}
                    />
                    <input type="password" placeholder='Enter your password' required className='input-box' onChange={(e)=>{setPassword(e.target.value)}}
                    value = {password}/>
                    <button className='submit-btn my_btn'>Submit</button>
                    
                    </form>
                    <button className='my_btn' type='button' onClick={setguestuser}>Signin as Guest User</button>
                    <button className='my_btn' type='button'><Link to = "/signup" style={{margin:"auto"}}>I'm new here</Link></button>
                    <a href="">Forget Password?</a>
                </div>
                <div className="card-back"></div>
            </div>
         </div>
    </div>
  )
}

export default Signin