import Navbar from "./Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./Body";
import Login from "./Login";
import {Provider} from "react-redux";
import appStore from "./utills/appStore";
import Feed from "./Feed";
import Profile from "./Profile";
import EditProfile from "./EditProfile";
import Signup from "./Signup";


function App() {
   

  return (
    <>
    <Provider store ={appStore}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body/>}>
            <Route path="/" element={<Feed/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/editprofile" element={<EditProfile/>}/>
            <Route path="/signup" element={<Signup/>}> </Route>
          </Route>

        </Routes>
      </BrowserRouter>
      
    </Provider>
    
    </>
  )
}

export default App;
