import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { Context } from "../Context";
import { useContext } from "react";



const ProtectedRoute = ({children}) => {
 const{handlelogout} = useContext(Context);
 const[logout,setlogout] = handlelogout;
       
 const[isloggedin,setisloggedin] = useState();
 useEffect(()=>{
   let user = localStorage.getItem("user");
   if(user){
    setisloggedin(true);
   }
   else{
    setisloggedin(false);
   } 
 },[logout])
 if (!localStorage.getItem("user")) {
 return <Navigate to="/" replace />;
 }
 return children;
};
export default ProtectedRoute;