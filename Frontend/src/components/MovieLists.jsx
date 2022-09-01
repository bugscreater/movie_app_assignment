import React from "react";
import Card from "./Card";
import "./movielist.css";


const MovieLists = ({ movies }) => {
  return (
    <React.Fragment>
      <div className="list">
       
          {movies &&
            movies.Search &&
            movies.Search.map((movie, index) => {
              return <Card movie={movie} />;
            })}
        
      </div>
     
    </React.Fragment>
  );
};

export default MovieLists;
