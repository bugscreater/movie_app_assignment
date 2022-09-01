import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./moviedetails.css";

const Moviedetails = () => {
  const { id } = useParams();

  const [movie, setMovie] = useState();
  const getmovie = async () => {
    const url2 = `http://www.omdbapi.com/?i=${id}&apikey=593cd9fa`;
    const response2 = await fetch(url2);
    const responseJSON2 = await response2.json();
    setMovie(responseJSON2);
   
  };
  useEffect(() => {
    getmovie();
  }, []);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "5px",
          marginLeft: "12px",
        }}
      >
        <h1>{movie ? movie.Title : null}</h1>
        <Link
          to="/home"
          style={{ color: "black", fontSize: "25px",marginRight:"14px"}}
        >
          Home
        </Link>
      </div>
      {
        movie?<div className="my_container1">
        <div className="img_container">
          <img src={movie.Poster} alt="" className="img" />
        </div>
        <div className="moviedetails">
            <p>Movie Plot : {movie.Plot.length <=140?movie.Plot:movie.Plot.slice(0,140)+"..."}</p>
            <p>Actors : {movie.Actors}</p>
            <p>IMDB Ratings : {movie.imdbRating}</p>
            <p>IMDB Votings : {movie.imdbVotes}</p>
            <p>Released date : {movie.Released}</p>
            <p>Director : {movie.Director}</p>
            <p>Country : {movie.Country}</p>
            <p>Generes : {movie.Genre}</p>
        </div>
      </div>:null
      }
      
    </div>
  );
};

export default Moviedetails;
