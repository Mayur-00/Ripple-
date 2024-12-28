import {create} from "zustand";
import { axiosInstanace } from "../lib/axios";
import toast from "react-hot-toast";

export const usePostStore = create((set)=>({
    users: [],
    userPosts: [],
    feedposts: [],
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


    getPostsForFeed: async () => {
        set({isPostsLoading:true});
        try {
            const res = await axiosInstanace.get("/user/posts");
            console.log(res.data);
            set({feedposts: res.data});
            toast.success("Posts fetched successfully");
        } catch (error) {
            console.log(`ERROR IN GET POSTS FUNCTION: ${error}`);
            toast.error("Failed to fetch posts");
            
        }finally{
            set({isPostsLoading:false});
        };
    },

    
    likePost: async (postId)=>{

        try {
            const res = await axiosInstanace.put(`/user/like/${postId}`);
            return res.data
            toast.success("post Liked Succefully")
        } catch (error) {
            console.log("error in the likePost state function : ", error)
            toast.error("an error while liking the post")
            
        }

    }
}))