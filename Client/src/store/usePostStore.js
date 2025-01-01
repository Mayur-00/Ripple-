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
    isLoadingComments:false,
    isCreatingComment:false,
    userComment:null,
    allComments:[],

    createPost: async (data) => {
        
        try {
            const res = await axiosInstanace.post("/user/createPost", data);
            // console.log(res.data)
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
            // console.log(res.data)
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
            // console.log(res.data);
            set({feedposts: res.data});
        } catch (error) {
            console.log(`ERROR IN GET POSTS FUNCTION: ${error}`);
            toast.error("Failed to get posts");
            
        }finally{
            set({isPostsLoading:false});
        };
    },

    
    likePost: async (postId)=>{

        try {
            const res = await axiosInstanace.put(`/user/like/${postId}`);
            toast.success("post Liked Succefully")
            return res.data
        } catch (error) {
            console.log("error in the likePost state function : ", error)
            toast.error("an error while liking the post")
            
        }

    },

    createComment: async (postid, comment) =>{
        try {
            set({isCreatingComment:true});
            const res= await axiosInstanace.post(`/user/addComment/${postid}`,comment);
            set({userComment:res.data.comment});
            toast.success("commnet added successfully")


        } catch (error) {
            toast.error("unable to add comment");
            console.log("error in create comment function", error);
            
        }finally{
            set({isCreatingComment:false});
        }
    },

    getComments: async (postId) =>{
        try {
            set({isLoadingComments:true});

            const res = await axiosInstanace.get(`/user/getComments/${postId}`);
            set({allComments:res.data.Comments});
            toast.success("comments fetched successfully")

        } catch (error) {
            toast.error("unable to fetch comments")
            console.log("error in getComments function", error)
            
        }finally{
            set({isLoadingComments:false});
        }
    }
}))