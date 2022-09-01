import React, { useEffect } from "react";
import { useState } from "react";
import PlaylistCard from "./PlaylistCard";
import "./playlist.css";
import { Context } from "../Context";
import { useContext } from "react";
import {base_url} from "../Config";
import axios from "axios";

const PlayList = () => {
  const [playlist, setPlaylist] = useState();
  const {is_change} = useContext(Context);
  const[playlistchange,setPlaylistchange] = is_change;

  const fetchplaylist = async () => {
    const email = localStorage.getItem("user");
    
    await axios.post(`${base_url}getallplaylist`,{email:email},{
      headers: {
        "Content-Type": "application/json",
      },
    }).then((posts)=>{
      
      setPlaylist(posts.data);
     
    }).catch(err=>{
       console.log(err);
    }) 
   
    
  };

  useEffect(() => {
    fetchplaylist();
  }, [playlistchange]);

  return (
    <div style={{marginTop:"10px"}}>
      {
        playlist && playlist.length>0 && <h3 style={{padding:"5px",marginLeft:"10px"}}>My PlayList</h3>
        
      }
      
      <div className="list">
        {playlist && playlist.map((list) => {
            return <PlaylistCard list={list}/>;
        })}
      </div>
    </div>
  );
};

export default PlayList;
