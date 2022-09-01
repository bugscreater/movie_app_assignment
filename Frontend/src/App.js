import React, { useState,useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {Routes, Route } from "react-router-dom";
import MyplayList from "./pages/MyplayList";
import HomePage from "./pages/HomePage";
import Moviedetails from "./pages/Moviedetails";
import Signup from "./Authentication/Signup";
import Signin from "./Authentication/Signin";
import ProtectedRoute from "./Protected/ProtectedRoute";

const App = () => {
  
  

  return (
    <>
      
      <Routes>
        <Route path = "/" element= {<Signin/>}/>
        <Route path = "/signup" element= {<Signup/>}/>
        <Route path = "/home" element= {<ProtectedRoute><HomePage/></ProtectedRoute>}/>
        <Route path="watchplaylist/:playlistname/:author/:access" element={<ProtectedRoute><MyplayList/></ProtectedRoute>} />
        <Route path="moviedetails/:id" element={<ProtectedRoute><Moviedetails/></ProtectedRoute>} />
      </Routes>

    </>
  );
};

export default App;
