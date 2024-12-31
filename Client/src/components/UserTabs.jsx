import React, { useEffect } from 'react'
import { useUsersStore } from '../store/useUsersStore'
import { useAuthStore } from '../store/useAuthStore';

const UserTabs = () => {

    const {suggestedUsers, getSuggestedUsers, isLoadingSuggestions, followUser, unFollowUser  } = useUsersStore();
   const {authUser, setAuthUser, checkAuth } = useAuthStore();

    useEffect(() => {
    getSuggestedUsers()
    checkAuth();
    
     
    }, [getSuggestedUsers, checkAuth]);

    const handleFollow = async  (data)=>{
     await followUser(data)
     await getSuggestedUsers();
     checkAuth() // Refresh suggested users
     
    }
    const handleUnFollow = async (data)=>{
      console.log("clicked");
      
    await  unFollowUser(data);

    await getSuggestedUsers(); 
    checkAuth()// Refresh suggested users
   
    }
    


    if(isLoadingSuggestions) return(
      <div

    className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
    role="status">
    <span
      className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
    >Loading...</span>
  </div>
    )

  return (
  

    <div className="h-[80%]  w-[100%] md:w-[50%]  rounded-md border-[1px] border-zinc-400 p-5 flex flex-col gap-4 overflow-y-auto ">
     {suggestedUsers.map((elem, idx)=>(
         <div  key={idx} className="  h-[10%] md:h-[15%]  w-[100%] bg-zinc-800 rounded-xl flex items-center justify-between p-4 ">
         <div className="flex items-center  ">
           <div className="h-10 w-10 rounded-full mr-5 overflow-hidden">
             <img src={elem.profilePic} alt="" className="h-full w-full object-cover" />
           </div>
           <h1 className="text-white text-lg">{elem.userName}</h1>
         </div>
   
         <button className="hover:text-blue-600">  {authUser?.following?.includes(elem._id) ?
                     <button onClick={()=> handleUnFollow(elem._id)}> unfollow</button>
                     : 
                      <button onClick={()=> handleFollow(elem._id)}> follow</button>
                    }</button>
       </div>
     ))}

  </div>
  )
}

export default UserTabs