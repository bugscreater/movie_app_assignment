import React, { useEffect, useState } from "react";
import "./card2.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Context } from "../Context";
import { useContext } from "react";
import { base_url } from "../Config";

const Card2 = ({ id, playlistname, lists }) => {
  const navigate = useNavigate();
  const [movie, setMovie] = useState();
  const{is_change} = useContext(Context);
  const[playlistchange,setPlaylistchange] = is_change;
  const getmovie = async () => {
    const url2 = `http://www.omdbapi.com/?i=${id}&apikey=593cd9fa`;
    const response2 = await fetch(url2);
    const responseJSON2 = await response2.json();
    setMovie(responseJSON2);
  };
  useEffect(() => {
    getmovie();
  }, []);

  const RemoveMovie = async () => {
    if (lists.length === 1) {
      await axios
        .post(
         
          `${base_url}deleteplaylist`,
          { playlistname: playlistname },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
         
          setPlaylistchange(!playlistchange);
        })
        .catch((err) => {
          console.log(err);
        });
      navigate("/home");  
    }
    else{
      await axios
      .post(
       
        `${base_url}removemovie`,
        { playlistname: playlistname, movie_id: id },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
       
        setPlaylistchange(!playlistchange);
      })
      .catch((err) => {
        console.log(err);
      });
    }
    
  };

  return (
    <React.Fragment>
      {movie ? (
        <div className="card2">
          <div className="img">
            <img
              src={movie.Poster}
              alt="loading..."
              className="img_container"
            />
          </div>
          <div className="btn-container">
            <button className="btn-1">
              <Link to={`/moviedetails/${movie.imdbID}`}>view details</Link>
            </button>
            <button className="btn-2" onClick={RemoveMovie}>
              Remove from playlist
            </button>
          </div>
        </div>
      ) : null}
    </React.Fragment>
  );
};

export default Card2;
