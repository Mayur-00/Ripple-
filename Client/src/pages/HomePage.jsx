import React from 'react'
import { useAuthStore } from '../store/useAuthStore'
import SlideBar from '../components/slidebar'
import StoriesBar from '../components/StoriesBar'

const HomePage = () => {
  const {logout}=useAuthStore()
  return (
    <div className='flex  h-screen w-full bg-zinc-900 relative '>
      <SlideBar />
      <StoriesBar/>
    
    </div>
  )
}

export default HomePage