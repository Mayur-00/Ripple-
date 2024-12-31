import { Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import CreateStory from "./CreateStory";
import { useStoryStore } from "../store/useStoryStore";
import StoriesFullContainer from "./StoriesFullContainer";

const StoriesBar = () => {
  const [isVisible, setIsVisible] = useState(false);
    const [isCreatePostVisible, setIsCreatePostVisible] = useState(false);
    const [isfullScreen, setIsFullScreen] = useState(false);
    const [selectedStory, setSelectedStory] = useState(null); // To store the currently selected story

    const {AuthUserStory, getStoryForAuthUser, getStorys, allStorys}= useStoryStore();

    useEffect(() => {
      getStoryForAuthUser()
      getStorys()
    
    }, [getStoryForAuthUser, getStorys])
    

    console.log(AuthUserStory)
    console.log(allStorys)
  

  
    const handleCreatePostClick = () => {
      setIsCreatePostVisible(true);
    };
  
    const closeCreatePost = () => {
      setIsCreatePostVisible(false);
    };

    const handleStoryClick = (story) => {
      setSelectedStory(story); // Set the selected story
      setIsFullScreen(true); // Make the full-screen container visible
    };
  
    const closeFullScreen = () => {
      setIsFullScreen(false);
      setSelectedStory(null);
    };
  return (
   <>
    <nav
      id="navbar"
      className="h-32 w-full pl-5   md:pl-80 flex items-center p-5 gap-5 overflow-x-auto relative  backdrop-blur-xl  bg-opacity-12   border-zinc-700"
    >
      {isVisible && (
        <div
          className="0 text-black text-sm rounded shadow-lg absolute  top-0
          animate-fade-in"
        >
          Create Story
        </div>
      )}
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        id="border"
        className="
    h-16 w-16 rounded-full bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-500 p-[2px]
  "
      >
        <div onClick={handleCreatePostClick} className="h-full w-full bg-zinc-600 rounded-full flex justify-center items-center">
          <Plus className="text-white size-12" />
        </div>
      </div>
      { AuthUserStory && (
        <div
        id="border"
        className="
      h-16 w-16 rounded-full bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-500 p-[2px] overflow-hidden
  "
      >
        <div className="h-full w-full overflow-hidden rounded-full"> <img className="h-full w-full object-cover" src={AuthUserStory?.image || ""} alt="" /></div>
      </div>
      )}
      {allStorys.map((story)=>(
          <div
          key={story._id}
          id="border"
          onClick={() => handleStoryClick(story)}
          className="
      h-16 w-16 rounded-full bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-500 p-[2px]
    "
        >
          <div  className="h-full w-full  rounded-full overflow-hidden"> <img className="h-full w-full object-cover" src={story?.image || ""} alt="" /></div>
        </div>
      ))}
    
    </nav>
  {isCreatePostVisible && <CreateStory  onClose={closeCreatePost} />}
  {isfullScreen && <StoriesFullContainer story={selectedStory } onClose={closeFullScreen} />}
   </>

  );
};

export default StoriesBar;
