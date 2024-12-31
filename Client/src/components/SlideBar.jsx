import { CircleUser, Compass, House, PanelLeft, Plus, Users } from "lucide-react";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import CreatePost from "./CreatePost.jsx";
import { useAuthStore } from "../store/useAuthStore.js";

const SlideBar = () => {
  const [isCreatePostVisible, setIsCreatePostVisible] = useState(false);
  const [tooggelSlide, setToggleSlide] = useState(true);
   const {authUser} = useAuthStore();

  const handleCreatePostClick = () => {
    setIsCreatePostVisible(true);
  };

  const closeCreatePost = () => {
    setIsCreatePostVisible(false);
  };

  return (
    <>
     
        <aside className="h-14 md:h-full bg-white md:bg-white w-full md:w-72 border-r-[1px] border-t-[1px] border-black flex flex-row md:flex-col fixed bottom-0  md:left-0  items-center transition-all duration-200  z-50">
          <div className="hidden md:flex w-full h-32 justify-center items-center">
           <h1 className="font-mono text-[40px] text-black">Ripple</h1>
          </div>
          <Link to="/" className="w-4/5 ">  
            <div className="w-4/5 h-16 flex gap-3 p-4 items-center  md:hover:bg-zinc-300 cursor-pointer rounded-xl">
              <House className="text-black size-7" />
              <p className="text-black font-bold hidden md:block">Home</p>
            </div>
          </Link>
          <Link to="/Explore" className="w-4/5 ">
            <div className="w-4/5 h-16 flex gap-3 p-4 items-center hover:bg-zinc-300 cursor-pointer rounded-xl">
              <Compass className="text-black size-7" />
              <p className="text-black hidden md:block">Explore</p>
            </div>
          </Link>
          <div
            className="w-4/5 h-16 flex gap-3 p-4 items-center hover:bg-zinc-300 cursor-pointer rounded-xl"
            id="createpost"
            onClick={handleCreatePostClick}
          >
            <Plus className="text-black size-7" />
            <p className="text-black hidden md:block">Create</p>
          </div>
          <Link to="/Profile" className="flex gap-3 w-4/5 ">
            <div className="w-4/5 h-16 flex gap-3 p-4 items-center hover:bg-zinc-300 cursor-pointer rounded-xl">
            { authUser.profilePic ? (  <img className="h-8 w-8 rounded-full" src={authUser?.profilePic || "/avatar.png"} alt="" />):  <CircleUser className="text-white size-7" />}
          
              <p className="text-black hidden md:block">Profile</p>
            </div>
          </Link>
        
        </aside>
      
    

      {isCreatePostVisible && <CreatePost onClose={closeCreatePost} />}
    </>
  );
};

export default SlideBar;
