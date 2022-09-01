import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import axios from "axios";
import { Context } from "../Context";
import { useContext } from "react";
import { base_url } from "../Config";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  maxWidth: "90vw",
  color: "black",
  p: 4,
};

export default function BasicModal({ setmodal_control, movie }) {
  const [open, setOpen] = React.useState(true);

  const[playlist, setPlaylist] = useState();
  const[index, setIndex] = useState(0);
  const[listname,setListname] = useState();
  const[access,setAccess] = useState("only me");

  const{is_change} = useContext(Context);
  const[playlistchange,setPlaylistchange] = is_change;

  const handleClose = () => {
    setOpen(false);
    setmodal_control(false);
  };

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

  const setindex = async (e) => {
    let index = e.target.selectedIndex;
    setIndex(index);
    if(index !== 0){
      setListname(e.target.value);
    }
  };

  const handleSubmit = async() =>{
      
      if(index !== 0){
        
        let id = movie.imdbID;

        if(!listname){
          return;
        }
    
        await axios
          .post(
            
            `${base_url}Addtoexistingplaylist`,
            { playlistname: listname, movie_id: id,access:access},
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then((res) => {
            
            setPlaylistchange(!playlistchange);
          })
          .catch((error) => {
            console.log(error);
          });

      }
      else{
        
        if(!listname){
          return;
        }
        let id = movie.imdbID;
        let email = localStorage.getItem("user");
        
    
        await axios
          .post(
            
            `${base_url}Addtonewplaylist`,
            
            { playlistname: listname, movie_id: id, email: email,access:access},
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then((res) => {
           
            setPlaylistchange(!playlistchange);
          })
          .catch((error) => {
            console.log(error);
          });

      }
      handleClose();
      return;
  }

  React.useEffect(() => {
    fetchplaylist();
  }, []);
  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h5">
            Select Playlist
          </Typography>
          <Box sx={{ mt: 2 }}>
            <select onChange={setindex}>
              <option>Add to new playlist</option>

              {playlist &&
                playlist.map((list) => {
                  return (
                    <option value={list.playlistname}>
                      {list.playlistname}
                    </option>
                  );
                })}
            </select>
          </Box>
          {
             index===0?<Box sx={{ mt: 2 }}>
            
             <Box sx={{ mt: 2 }}>
               <input type="text" placeholder="Create a new playlist" onChange={(e)=>{setListname(e.target.value)}}/>
             </Box>
           </Box>:null
          }
         

          <Box sx={{ mt: 2 }}>
            <Typography id="modal-modal-title" variant="h6" component="h5">
              Acess to this playlist
            </Typography>
            <Box sx={{ mt: 2 }}>
              <select onChange = {(e)=>{setAccess(e.target.value)}}>
                <option>Only me</option>
                <option>Anyone</option>
              </select>
            </Box>
          </Box>
          <Box sx = {{mt:2,display:"flex",justifyContent:"center"}}>

          <button onClick={handleClose} style={{padding:"5px",margin:"4px",width:"100%"}}>Close</button>
          <button onClick={handleSubmit} style={{padding:"5px",margin:"4px",width:"100%"}}>Submit</button>
          </Box>
        </Box>
        
      </Modal>
    </div>
  );
}
