import React from "react";

const StoriesBar = () => {
  return (
    <nav
      id="navbar"
      className="h-32 w-full flex items-center p-5 gap-5 overflow-x-auto   backdrop-blur-xl bg-transparent bg-opacity-12   border-zinc-700"
    >
      <div
        id="border"
        className="
    h-16 w-16 rounded-full bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-500 p-[2px]
  "
      >
        <div className="h-full w-full bg-zinc-600 rounded-full"></div>
      </div>
    </nav>
  );
};

export default StoriesBar;
