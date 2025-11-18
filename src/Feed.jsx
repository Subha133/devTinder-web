import React from 'react'
import axios from "axios";
import {BASE_URL }from "./utills/constants";
import {useDispatch, useSelector} from "react-redux";
import { useEffect } from 'react';
import {addFeed} from "./utills/FeedSlice";

const Feed = () => {
   const feed = useSelector((store)=>store.feed);
   const dispatch=useDispatch();
   const getFeed = async()=>{
   try{
    if(feed) return;
     const res = await axios.get(BASE_URL + "/user/feed",{withCredentials:true});
    dispatch(addFeed(res.data));

   }catch(err){
    console.error(err.message);
   }
   }
   useEffect(()=>{
     getFeed();
   },[])
  return (

    feed && (<div className='flex justify-center px-1.5'>
        <div className="card  bg-amber-700 w-96 shadow-sm">
  <figure>
    <img
      src={feed[1].photoUrl}
      alt="Shoes" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{feed[0].firstName+" "+feed[0].lastName}</h2>
    
    
  </div>
</div>
    </div>)

  );
                                                                              
}

export default Feed
