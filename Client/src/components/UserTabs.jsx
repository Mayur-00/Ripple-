import React, { useEffect } from 'react'
import { useUsersStore } from '../store/useUsersStore'

const UserTabs = () => {

    const {suggestedUsers, getSuggestedUsers} = useUsersStore();

    useEffect(() => {
    getSuggestedUsers()
    
     
    }, [])
    console.log(suggestedUsers)
    




  return (
    <div className="h-[80%] w-[50%]  rounded-md border-[1px] border-zinc-400 p-5 flex flex-col gap-4 overflow-y-auto ">
     {suggestedUsers.map((elem)=>(
         <div   className="h-[15%] w-[100%] bg-zinc-800 rounded-xl flex items-center justify-between p-4 ">
         <div className="flex items-center  ">
           <div className="h-10 w-10 rounded-full mr-5 overflow-hidden">
             <img src={elem.profilePic} alt="" className="h-full w-full object-cover" />
           </div>
           <h1 className="text-white text-lg">{elem.userName}</h1>
         </div>
   
         <button className="hover:text-blue-600">Follow</button>
       </div>
     ))}

  </div>
  )
}

export default UserTabs