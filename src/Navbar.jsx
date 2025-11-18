import React from 'react'
import { useDispatch,useSelector } from "react-redux";
import {Link} from "react-router-dom";
import axios from "axios";
import {BASE_URL} from "./utills/constants";
import { useNavigate } from "react-router-dom";
import {removeUser} from "./utills/userSlice";


const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
 
  const handleLogout = async()=>{
   try{
     await axios.post(BASE_URL+"/logout",{},{
      withCredentials:true,
    })
    dispatch(removeUser());
    navigate("/login");
   }catch(err){
    console.error(err.message);
   }
  }

  const user = useSelector((store)=>store.user)
  return (
    <div>
        <div className="navbar bg-info-content shadow-sm fixed top-0">
  <div className="flex-1">
    <Link to="/" className="btn btn-ghost text-xl">DevTinder</Link>
  </div>
  <div className="flex gap-2">
    {/* <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" /> */}
    {user && <div className="dropdown dropdown-end flex items-center">
      <h1 className='px-4'>welcome, {user.firstName}</h1>
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="userPhoto"
            src={user.photoUrl}/>
        </div>
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li>
          <Link to="/profile"className="justify-between">
            Profile
            <span className="badge">New</span>
          </Link>
        </li>
        <li><a>Settings</a></li>
        <li><a onClick={handleLogout}>Logout</a></li>
      </ul>
    </div>}
  </div>
</div>
    </div>
  )
}

export default Navbar;
