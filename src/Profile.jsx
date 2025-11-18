import React from 'react'
import {useSelector} from "react-redux";
import EditProfile from "./EditProfile";

const profile = () => {

  const user = useSelector((store)=>store.user)
  return (
    <div className="p-4 text-orange-500">
      <EditProfile user={user}/>
    </div>
  )
}

export default profile
