import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/home";
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";
import Mainlayout from "./layout/Mainlayout";
import Chatpage from "./pages/Chatpage";
import AlbumPage from "./pages/AlbumsPage";
import Admin from "./pages/Adminpage/Admin";
import {Toaster} from "react-hot-toast"
import ErrorPage from "./pages/ErrorPage";
import AuthCallbackPage from "./pages/Authcallback/AuthCallbackPage";


function App() {
  

  return (
    <>
   
     <Routes>
     
      <Route
					path='/sso-callback'
					element={<AuthenticateWithRedirectCallback signUpForceRedirectUrl={"/auth-callback"} />}
				/>
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
