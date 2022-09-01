import React from "react";
import { Context } from "../Context";
import { useContext } from "react";

const Searchbar = ({ optimizedFn }) => {
  const{handlelogout} = useContext(Context);
  const[logout,setlogout] = handlelogout;
  
  const logout_func = () =>{
    localStorage.clear();
    setlogout(!logout);
  }
  return (
    <>
      <div className="search_box">
        <input
          type="text"
          className="form-control"
          placeholder="search for movies"
          onChange={(e) => {
            optimizedFn(e.target.value);
          }}
        />
      </div>
      <div>
        <button
          onClick={logout_func}
          style={{
            position:"absolute",
            background: "red",
            color: "white",
            top: "10px",
            width: "100px",
            right:"10px",
            padding:"8px",
            border:"none"
          }}
        >
          Log out
        </button>
      </div>
    </>
  );
};

export default Searchbar;
