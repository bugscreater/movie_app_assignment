import React, { useState } from "react";
import "./card.css";
import Modal from "../Modal/Modal";
import { Link } from "react-router-dom";


const Card = ({ movie }) => {
  
  const[modal_control,setmodal_control] = useState(false);

 
  return (
    <>
    <div className="container">
      <img src={movie.Poster} alt="loading..." className="img_container" />
      <div className="btn-container">
        <button className="btn-1">
          <Link to = {`/moviedetails/${movie.imdbID}`}>view details</Link>
          
        </button>

        <button className="btn-2" onClick={()=>setmodal_control(!modal_control)}>Add to playlist</button>
      </div>
    </div>
    {
      modal_control?<Modal setmodal_control = {setmodal_control} movie = {movie}/>:null
    }
    </>
  );
};

export default Card;
