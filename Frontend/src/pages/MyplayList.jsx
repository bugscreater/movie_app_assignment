import React, { useEffect, useState,useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Card2 from "../components/Card2";
import "./myplaylist.css";
import { Link } from "react-router-dom";
import { Context } from "../Context";
import {base_url} from "../Config";
import { useNavigate } from "react-router-dom";



const MyplayList = () => {
  const { playlistname,author,access} = useParams();
  const [lists, setLists] = useState();
  const{is_change} = useContext(Context);
  const[playlistchange,setPlaylistchange] = is_change;
  
  const navigate = useNavigate();
  
  const user_email = localStorage.getItem('user');

  const fetchplaylist = async () => {
    await axios
      .post(
        
        `${base_url}fetchplaylist`,
        { playlistname: playlistname,email:author},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        setLists(res.data.lists);
       
        
      })
      .catch((error) => {
        console.log(error);
      });
  };

  
  useEffect(() => {
    fetchplaylist();
    
    
  }, [playlistchange]);

  
  if(author !== user_email){
     
      if(access !== "Anyone"){
          console.log(access);
          navigate("/home");
          return;
      }
      
  }
  

  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",padding: "5px", marginLeft: "12px"}}>
        <h1>{playlistname}</h1>

        <Link to="/home" style={{color:"black",fontSize:"25px",marginRight:"14px"}}>Home</Link>
      </div>

      <div className="movie-container">
        {lists &&
          lists.map((id) => {
            return <Card2 id={id} playlistname = {playlistname} lists = {lists}/>;
          })}
      </div>
    </div>
  );
};

export default MyplayList;
