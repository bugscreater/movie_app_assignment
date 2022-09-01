import React, { useState, useEffect, useCallback } from "react";
import MovieLists from "../components/MovieLists";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../components/Header";
import Searchbar from "../components/Searchbar";
import PlayList from "../components/PlayList";
import "../App.css";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState();

  const fetchmovies = async (value) => {
    if (!value) {
       value = "avengers";
    }
    const url = `http://www.omdbapi.com/?s=${value}&apikey=593cd9fa`;
    const response = await fetch(url);
    const responseJson = await response.json();
    setMovies(responseJson);
  };

  const debounce = (func) => {
    let timer;
    return function (...args) {
      const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, 500);
    };
  };

  const optimizedFn = useCallback(debounce(fetchmovies), []);

  useEffect(() => {
    fetchmovies();
  }, []);
  return (
    <div>
      <header className="header">
        <Header />
        <Searchbar optimizedFn={optimizedFn} />
       
      </header>

      <div>
        <MovieLists movies={movies} />
      </div>

      <div>
        <PlayList />
      </div>
    </div>
  );
};

export default HomePage;
