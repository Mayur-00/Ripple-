import { useEffect, useState } from 'react'
import { Router, Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import SignupPage from './pages/SignupPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import { useAuthStore } from './store/useAuthStore.js'
import {Loader} from "lucide-react"
import {Toaster} from "react-hot-toast"

function App() {

  const {authUser, checkAuth, isCheckingAuth}=useAuthStore();

  useEffect(() => {
  
    checkAuth();
  }, [checkAuth]);

  console.log(authUser)

  if(isCheckingAuth && !authUser) return(
    <div className='flex items-center justify-center h-screen'>
      <Loader className='size-10 animate-spin'/>
    </div>
  )
  
 

  return (
     
       <div>
         <Routes>
          <Route path='/' element={ authUser? <HomePage/> : <Navigate to="/login"/>} />
          <Route path='/Login' element={!authUser? <LoginPage/> : <Navigate to="/"/>} />
          <Route path='/Signup' element={!authUser ? <SignupPage/> : <Navigate to="/"/>} />
          <Route path='/Profile:id' element={ authUser ? <ProfilePage/>: <Navigate to="/login"f/>} />

        </Routes>
        <Toaster />
       </div>
       
      
  )
}

export default App
