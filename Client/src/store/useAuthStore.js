import {create} from "zustand";
import { axiosInstanace } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set)=>({
    authUser:null,
    isSigningUp:false,
    isLoggingIn:false,
    isUpdatingProfile:false,

    isCheckingAuth:true,

    checkAuth:async () =>{
        try {
            const res = await axiosInstanace.post("/auth/check");
            set({authUser:res.data});
        } catch (error) {
            set({authUser:null})
            console.log("error in check auth :", error)
            
        }finally{
            set({isCheckingAuth:false});
        }
    },

    signup: async (data) => {
        set({isSigningUp:true});
        try {
            const res = await axiosInstanace.post("/auth/signup", data);
            console.log(res.data);
            set({authUser:res.data});

            toast.success("account Created Successfully");
    

        } catch (error) {
            console.log("error in the signup function:", error);
            toast.error(error.res.message)
        
        }finally{
            set({isSigningUp:false});
        };
    },
    login : async (data) => {
        set({isLoggingIn:true})
        try {
            const res = await axiosInstanace.post("auth/login", data);
            set({authUser:res.data});

            console.log(res.data);
            toast.success("Logged In Succesfully 😍")
            
            
        } catch (error) {
            console.log('Error In Login Function: ', error);
            toast.error("Some Error Occurred 😭 ")
            
        }finally{
            set({isLoggingIn:false})
        };
    },
    logout: async () => {
        try {
            await axiosInstanace.post("/auth/logout");
            set({authUser:null});
            toast.success("Logged Out Succesfully 🫡");
        } catch (error) {
            console.log("Error in Logout State Function:", error);
            toast.error("An Error Occured While Logging Out");
        
        }
    },
    updatePhoto: async (data) => {
        set({ isUpdatingProfile: true });
        try {
          const res = await axiosInstanace.put("/user/update-profilePic", data);
          set({ authUser: res.data })
          toast.success("Profile Picture Updated SuccessFully")
        } catch (error) {
          toast.error(error);
          console.log("error in update profile function :" + error);
    
    
        }
        finally {
          set({ isUpdatingProfile: false })
        }
    
      },
    updatebio: async (data) => {
        set({ isUpdatingProfile: true });
        try {
          const res = await axiosInstanace.put("/user/update-bio", data);
          set({ authUser: res.data })
          toast.success("Profile bio Updated SuccessFully")
        } catch (error) {
          toast.error(error);
          console.log("error in update profile function :" + error);
    
    
        }
        finally {
          set({ isUpdatingProfile: false })
        }
    
      },
      setAuthUser: (user) => set({ authUser: user }), // Update the entire user object

}));