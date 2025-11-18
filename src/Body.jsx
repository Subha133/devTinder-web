import React from "react";
import {Outlet} from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import {BASE_URL} from "./utills/constants";
import {useDispatch, useSelector} from "react-redux";
import {addUser } from "./utills/userSlice";
import  { useEffect } from "react";
import axios from "axios";
import Login from "./Login";
import { useNavigate } from "react-router-dom";



const Body = ()=>{
  
      const Navigate = useNavigate();
      const dispatch = useDispatch();
      const userData = useSelector((store)=>store.user)
      const fetchUser = async ()=>{
        if(userData) return;
          try{
     
               const res= await axios.get(BASE_URL+"/profile",{
                   withCredentials:true,});
                dispatch(addUser(res.data));
               
             }catch(err)
             {
                if (err.status == 401)
                {
                  Navigate("/Login");
                }
                  
                console.error(err.message);
      
              }
    };

  useEffect(()=>{
       fetchUser();
    },[])
    return(
        <>
        <Navbar/>
       <div className="pt-16">
         <Outlet/>
       </div>
        <Footer/>

        </>
    )
}

export default Body;
