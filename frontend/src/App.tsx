import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/home";
import AuthCallbackPage from "./pages/Authcallback/AuthCallbackPage ";
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";
import Mainlayout from "./layout/Mainlayout";
import Chatpage from "./pages/Chatpage";
import AlbumPage from "./pages/AlbumsPage";
import Admin from "./pages/Adminpage/Admin";
import {Toaster} from "react-hot-toast"
import ErrorPage from "./pages/ErrorPage";

function App() {
  

  return (
    <>
   
     <Routes>
     
      <Route path="/ss0-callback" element={<AuthenticateWithRedirectCallback signUpForceRedirectUrl={"/auth-callback"}/>}></Route>
      <Route path="/auth-callback" element={<AuthCallbackPage/>}></Route>

      <Route path="/admin" element={<Admin/>}></Route>

        <Route  element={<Mainlayout/>}>
             <Route path="/" element={<Home/>}/>
             <Route path="/chat" element={<Chatpage/>}/>
             <Route path="/albums/:albumId" element={<AlbumPage/>}/>
             <Route path="*" element={<ErrorPage/>}></Route>
        </Route>

     </Routes>
     <Toaster/>
    </>
  )
}

export default App
