import React, { useEffect, useLayoutEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import SlideBar from "../components/SlideBar";
import StoriesBar from "../components/StoriesBar";
import { Heart, HeartOff, MessageCircle } from "lucide-react";
import { usePostStore } from "../store/usePostStore";
import { useUsersStore } from "../store/useUsersStore";
import CreateStory from "../components/CreateStory";
import ShowCommnets from "../components/ShowCommnets";
import { useState } from "react";

const HomePage = () => {
  const { feedposts, getPostsForFeed, likePost, isPostsLoading } =
    usePostStore();
  const { authUser, checkAuth } = useAuthStore();

  const {
    suggestedUsers,
    getSuggestedUsers,
    isLoadingSuggestions,
    followUser,
    unFollowUser,
  } = useUsersStore();

  const [isFullScreen, setIsFullScreen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  
  const toggleFullScreen= (post) =>{
    setSelectedPost(post)
    setIsFullScreen(true)
  };
  
  const closeFullScreen = ()=>{
    setIsFullScreen(false)
    setSelectedPost(null);
  };

  const handleLike = (postId) => {
    likePost(postId).then(() => getPostsForFeed());
  };

  useEffect(() => {
    getPostsForFeed();
  }, [getPostsForFeed]);

  const handleFollow = async (data) => {
    await followUser(data);
    await getPostsForFeed();
    checkAuth(); // Refresh suggested users
  };
  const handleUnFollow = async (data) => {
    console.log("clicked");

    await unFollowUser(data);
    await getPostsForFeed();
    checkAuth(); // Refresh suggested users
  };

  return (
    <div className="flex flex-col md:flex-row h-screen w-full bg-white relative ">
      <div className="flex flex-col w-full   ">
        <StoriesBar />
        <div className="h-full w-full flex flex-col bg-white  overflow-y-auto  items-center ">
          {isPostsLoading && (
            <div
              className="inline-block h-8 w-8 animate-spin rounded-full  border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] absolute"
              role="status"
            >
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                Loading...
              </span>
            </div>
          )}
          {feedposts.map((post, idx) => (
            <div
              key={idx}
              className=" max-h-[90%] md:min-h-[130%] mt-5 w-[100%] md:w-[40%] relative overflow-hidden flex flex-col items-center shrink-0 border-[1px] rounded-xl mb-20 border-zinc-800 "
            >
              <div className=" h-[10%] md:h-[10%] w-[100%] md:w-full  flex items-center p-2 mb-2 ">
                <div className=" h-[40px] md:h-[40px] w-[40px]  md:w-[40px] rounded-full bg-zinc-500 mr-3 overflow-hidden">
                  <img
                    className="h-full w-full object-cover object-center"
                    src={post.auther.profilePic || "/avatar.png"}
                    alt=""
                  />
                </div>
                <h1 className="text-black mr-60 font-bold">
                  {post.auther.userName}
                </h1>
                <div className=" h-[30px] sm:h-[70%] w-[70px] sm:w-[20%] ">
                  {authUser?.following?.includes(post.auther._id) ? (
                    <button
                      className=" h-full w-full bg-zinc-600 hover:bg-blue-800 rounded-md text-white text-xs flex justify-center items-center"
                      onClick={() => handleUnFollow(post.auther._id)}
                    >
                      {"Unfollow"}
                    </button>
                  ) : (
                    <button
                      className=" h-full w-full bg-blue-600 hover:bg-blue-800 rounded-md text-white text-xs flex justify-center items-center"
                      onClick={() => handleFollow(post.auther._id)}
                    >
                      {"Follow"}
                    </button>
                  )}
                </div>
              </div>
              <div className="  h-[60%] md:h-[80%]  w-[100%] md:w-[99%] rounded-md overflow-hidden  ">
                <img
                  className="h-[100%] w-[100%] object-cover"
                  src={post.postImage}
                />
              </div>
              <div className="w-full flex p-2 pb-0 gap-1 items">
                <div className=" inline-block">
                  <button
                    onClick={() => handleLike(post._id)}
                    className={`${
                      post.likes.indexOf(authUser._id) === -1
                        ? "text-black"
                        : "text-red-600 fill-red-600"
                    }`}
                  >
                    {post.likes.indexOf(authUser._id) === -1 ? (
                      <Heart className="size-8 " />
                    ) : (
                      <HeartOff className="size-8" />
                    )}
                  </button>
                  <p className="text-sm"> {`${post.likes.length} Likes`}</p>
                </div>
                <div>
                  <button onClick={()=> toggleFullScreen(post)} className="text-black">
                    <MessageCircle className="size-8" />
                  </button>
                </div>
              </div>
              <div className="w-full flex justify-start">
                <p className="text-black  mb-5">{post.postContent}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <SlideBar />
      {isFullScreen && (<ShowCommnets post={selectedPost} onClose={closeFullScreen} />)}
    </div>
  );
};

export default HomePage;
