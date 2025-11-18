import axios from 'axios';
import React from 'react';
import {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "./utills/userSlice";
import {useNavigate} from "react-router-dom";
import {BASE_URL} from "./utills/constants";



const Login = () => {

    const [emailId, setEmailId] = useState("jit@gmail.com");
    const [password, setPassword] = useState("Spider1#9*");
    const dispatch = useDispatch();
    const navigate =useNavigate();
    const [error, setError] = useState("");
    const userDataCheck = useSelector((store)=>store.user)
 
    const handleLogin = async ()=>{
      try{
        if(userDataCheck) return;
        const res = await axios.post(BASE_URL+"/login",{
          emailId,password,
        },{withCredentials:true});
        
        dispatch(addUser(res.data));
        return navigate("/");
      } catch(e){
        setError(e.message);
      }
    }
  return (
    <div className="h-screen flex items-center justify-center bg-black-950">
      <div className="flex flex-col items-center justify-center gap-4 bg-gray-700 p-8 rounded-2xl shadow-lg">
        <label className="input input-bordered flex items-center gap-2 w-72">
          <svg
            className="h-5 w-5 opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
          <input type="email" value = {emailId} onChange={(e)=>setEmailId(e.target.value)}  placeholder="mail@site.com" className="grow" required />
        </label>

        <label className="input input-bordered flex items-center gap-2 w-72">
          <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="********" className="grow" required />
        </label>
        <p>{error}</p>
        <button className="btn btn-neutral w-72" onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
};

export default Login;
