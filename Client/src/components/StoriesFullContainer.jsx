import React from 'react'

const StoriesFullContainer = ({onClose, story}) => {
    console.log(story)
  return (
     <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-[99]">
      <button onClick={onClose} className="absolute top-1 md:top-5  right-1 md:right-5 text-white">
        Close
      </button>
      <div className="w-11/12 h-[95%] md:w-[30%] relative bg-white rounded-lg overflow-hidden">

      <div className='absolute z-50 left-2 top-2 flex justify-center items-center gap-2'>

      <div className='bg-red-500 h-10 w-10 rounded-full overflow-hidden'><img className='h-full w-full object-cover' src={story?.owner.profilePic} alt="" /></div>
    <h1 className='text-white'>{story.owner.userName}</h1>
      </div>
      
   
        <img
          src={story?.image}
          alt="Story"
          className="w-full h-full object-cover"
        />

       

      </div>
    </div>
  )
}

export default StoriesFullContainer