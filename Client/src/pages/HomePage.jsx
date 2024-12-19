import React from 'react'
import { useAuthStore } from '../store/useAuthStore'

const HomePage = () => {
  const {logout}=useAuthStore()
  return (
    <div className='text-red-600'>HomePage
    <button onClick={logout}>Logout</button></div>
  )
}

export default HomePage