import {create} from "zustand";
import { axiosInstanace } from "../lib/axios";
import toast from "react-hot-toast";

export const usePostStore = create((set)=>({
    users: [],
    userPosts: [],
    posts: [],
    selectedpost: null,
    isUsersLoading: false,
    isPostsLoading: false,

    createPost: async (data) => {
        
        try {
            const res = await axiosInstanace.post("/user/createPost", data);
            console.log(res.data)
            toast.success("Post created successfully")
        } catch (error) {
            toast.error("Failed to create post")
            console.log(`ERROR IN CREATE POST FUNCTION: ${error}`);
        }
    },

    getPost: async () => {
        
        try {
            set({isPostsLoading:true})
            const res = await axiosInstanace.get("/user/getPost" );
            console.log(res.data)
            set({userPosts:res.data})
        } catch (error) {
            console.log(`ERROR IN CREATE POST FUNCTION: ${error}`);
        }finally{
            set({isPostsLoading:false});
        }
    },
}))