  import React, { useEffect } from "react";
  import SlideBar from "../components/SlideBar";
  import { useUsersStore } from "../store/useUsersStore";
import UserTabs from "../components/userTabs";

  const ExplorePage = () => {
    const {suggestedUsers, isLoadingSuggestions, getSuggestedUsers}= useUsersStore();


    



    return (
      <div className="h-screen w-full flex bg-black">
        <SlideBar />

        <div className="h-full w-full flex flex-col items-center">

          <div className="p-10 ">
            <h1 className="text-white text-3xl font-bold">Explore People</h1>
          </div>
          <UserTabs /> 
        </div>
      </div>
    );
  };

  export default ExplorePage;
