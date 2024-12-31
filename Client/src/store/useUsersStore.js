import {create} from "zustand";
import { axiosInstanace } from "../lib/axios";
import toast from "react-hot-toast";


export const useUsersStore = create((set)=>({ 
    suggestedUsers:[],
    users:null,
    isLoadingSuggestions:false,





getSuggestedUsers : async ()=>{
    try {
        set({isLoadingSuggestions:true})
        const res = await axiosInstanace.get("/user/suggestedUsers");

        set({suggestedUsers:res.data})

        console.log(res.data)
    } catch (error) {
        console.log(error)              
        
    }finally{
        set({isLoadingSuggestions:false})
    }
},


followUser: async (targetedUserid) =>{
    try {
        const res = await axiosInstanace.post(`/user/follow/${targetedUserid}`);
        toast.success("user followed successfully 😍")
        return(res.data)
    } catch (error) {
        console.log("error in follow user function :" , error);
        toast.error("an error accured while following the user 😭")
        
        
    }
},
unFollowUser: async (targetedUserid) =>{
    try {
        console.log("2 clicked")
        const res = await axiosInstanace.post(`/user/remove/${targetedUserid}`);
        toast.success("user unFollowed successfully 😍")
        return(res.data)
    } catch (error) {
        console.log("error in unFollow user function :" , error);
        toast.error("an error accured while following the user 😭")
        
        
    }
}
}))


