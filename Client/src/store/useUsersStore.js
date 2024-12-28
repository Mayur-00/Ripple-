import {create} from "zustand";
import { axiosInstanace } from "../lib/axios";
import toast from "react-hot-toast";


export const useUsersStore = create((set)=>({ 
    suggestedUsers:[],
    users:null,
    isLoadingSuggestions:false,





getSuggestedUsers : async ()=>{
    try {

        const res = await axiosInstanace.get("/user/suggestedUsers");

        set({suggestedUsers:res.data})

        console.log(res.data)
    } catch (error) {
        console.log(error)              
        
    }
},


}))


