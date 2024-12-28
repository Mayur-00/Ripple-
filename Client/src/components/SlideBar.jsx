import { CircleUser, Compass, House, Plus, Users } from 'lucide-react';
import { Link } from 'react-router-dom'

import React, { useState } from 'react'
import CreatePost from './CreatePost.jsx';


const SlideBar = () => {
  const [isCreatePostVisible, setIsCreatePostVisible] = useState(false);

  const handleCreatePostClick = () => {
    setIsCreatePostVisible(true);
  };

  const closeCreatePost = () => {
    setIsCreatePostVisible(false);
  };

  return (
    <>
      <aside className="h-full w-20 md:w-72 border-r border-zinc-700 flex flex-col items-center transition-all duration-200">
        <div className="hidden md:flex w-full h-32 justify-center items-center">
          <img
            className="h-32"
            src="../DALL_E_2024-12-22_11.10.32_-_An_ultra-minimalistic_and_aesthetic_logo_for_a_social_media_platform_named__Ripple_._The_design_features_a_single_ripple-like_curve_or_wave_symbol__in-removebg-preview.png"
            alt=""
          />
        </div>
          <Link to="/" className="w-4/5 ">
        <div className="w-4/5 h-16 flex gap-3 p-4 items-center hover:bg-zinc-800 cursor-pointer rounded-xl">
            <House className="text-white" />
            <p className="text-white font-bold hidden md:block">Home</p>
        </div>
          </Link>
          <Link to="/Explore" className="w-4/5 ">
        <div   className="w-4/5 h-16 flex gap-3 p-4 items-center hover:bg-zinc-800 cursor-pointer rounded-xl">
            <Compass className="text-white" />
            <p className="text-white hidden md:block">Explore</p>
        </div>
          </Link>
        <div
          className="w-4/5 h-16 flex gap-3 p-4 items-center hover:bg-zinc-800 cursor-pointer rounded-xl"
          id="createpost"
          onClick={handleCreatePostClick}
        >
          <Plus className="text-white" />
          <p className="text-white hidden md:block">Create</p>
        </div>
          <Link to="/Profile" className="flex gap-3 w-4/5 ">
        <div className="w-4/5 h-16 flex gap-3 p-4 items-center hover:bg-zinc-800 cursor-pointer rounded-xl">
            <CircleUser className="text-white size-"  />
            <p className="text-white hidden md:block">Profile</p>
        </div>
          </Link>
      </aside>

      {isCreatePostVisible && <CreatePost onClose={closeCreatePost} />}
    </>
  );
};

export default SlideBar;