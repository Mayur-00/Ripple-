import { create } from "zustand";
import { axiosInstanace } from "../lib/axios";
import toast from "react-hot-toast";


export const useStoryStore = create((set)=>({
    AuthUserStory:null,
    allStorys:[],
    isGettingStorys:false,
    isLoadingStory:false,
    isCreatingStory:false,

    createStory:async (image)=>{
  
        try {
            set({isCreatingStory:true})
            const res= await axiosInstanace.post("user/createStory",image)
            set({AuthUserStory:res.data});
            toast.success("Story Created SuccessFully")
        } catch (error) {
            console.log("error in create Story function:", error);
            toast.error("failed to create Story");
            
        }finally{
            set({isCreatingStory:false})
        }
    },

    getStorys: async ()=>{
        try {
            set({isGettingStorys:true});
            const res = await axiosInstanace.get("/user/stories");
            set({allStorys:res.data});
            // toast.success("storys fetched successfully")
            
        } catch (error) {
            console.log("error in getStorys Function", error);
            toast.error("fecthing storys failed")
        }finally{
            set({isGettingStorys:false})
        }
    },

    getStoryForAuthUser: async ()=>{
        try {
            set({isGettingStorys:true});
            const res = await axiosInstanace.get("/user/MyStory");
            set({ AuthUserStory: res.data });
            // toast.success("storys fetched successfully")
            
        } catch (error) {
            // console.log("error in getStorys Function", error);
            // toast.error("fecthing storys failed")
        }finally{
            set({isGettingStorys:false})
        }
    }
}))