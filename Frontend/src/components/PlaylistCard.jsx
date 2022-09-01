import React from "react";
import { useState, useEffect } from "react";
import "./playlistcard.css";
import { Link } from "react-router-dom";

const PlaylistCard = ({ list }) => {
  const [thumbnail, setThumbnail] = useState();
  const movie_id = list.lists[0];

  const email = localStorage.getItem("user");
  const getthumbnail = async () => {
    const url2 = `http://www.omdbapi.com/?i=${movie_id}&apikey=593cd9fa`;
    const response2 = await fetch(url2);
    const responseJSON2 = await response2.json();
    setThumbnail(responseJSON2.Poster);
   
  };
  useEffect(() => {
    getthumbnail();
  }, []);
  

  return (
    <div className="card card_list">
      <div className="card-body">
        <img className="thumbnail" src={thumbnail} alt="loading..." />
        <div style={{marginTop:"5px"}}>
          <h5 className="card-title">{list.playlistname}</h5>
          <p className="card-text">Total movies : {list.lists.length}</p>
          <p className="card-text">Access : {list.access}</p>

          <Link to={`/watchplaylist/${list.playlistname}/${list.email}/${list.access}`} className="btn btn-primary">
            Watch Playlist
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PlaylistCard;
