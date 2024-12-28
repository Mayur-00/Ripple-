import React, { useEffect, useLayoutEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import SlideBar from "../components/slidebar";
import StoriesBar from "../components/StoriesBar";
import { Heart, HeartOff, MessageCircle } from "lucide-react";
import { usePostStore } from "../store/usePostStore";

const HomePage = () => {
  const { feedposts, getPostsForFeed, likePost } = usePostStore();
  const { authUser } = useAuthStore();

  const handleLike = (postId) => {
    likePost(postId).then(() => getPostsForFeed());
  };

  useEffect(() => {
    getPostsForFeed();
  }, [getPostsForFeed]);

  const { logout } = useAuthStore();
  
  return (
    <div className="flex h-screen w-full bg-black relative ">
      <SlideBar />
      <div className="flex flex-col w-full   ">
        <StoriesBar />
        <div className="h-full w-full flex flex-col  overflow-y-auto  items-center ">
          {feedposts.map((post) => (
            <div className="min-h-[130%] mt-5 w-[40%] relative overflow-hidden flex flex-col items-center shrink-0 border-b-[1px] border-zinc-600 ">
              <div className="h-[10%] w-full  flex items-center p-2 mb-2 ">
                <div className="h-[40px] w-[40px] rounded-full bg-zinc-500 mr-3 overflow-hidden">
                  <img
                    className="h-full w-full object-cover object-center"
                    src={post.auther.profilePic || "/avatar.png"}
                    alt=""
                  />
                </div>
                <h1 className="text-white mr-56 font-bold">
                  {post.auther.userName}
                </h1>
                <button className="h-[70%] w-[20%] bg-blue-600 hover:bg-blue-800 rounded-md text-white flex justify-center items-center ">
                  Follow
                </button>
              </div>
              <div className="h-[80%] w-[99%] rounded-md overflow-hidden  ">
                <img
                  className="h-[100%] w-[100%] object-cover"
                  src={post.postImage}
                />
              </div>
              <div className="w-full flex p-2 pb-0 gap-1 items">
                <div className=" inline-block">
                  <button onClick={() => handleLike(post._id)}>
                    {post.likes.indexOf(authUser._id) === -1 ? (
                      <Heart className="size-8" />
                    ) : (
                      <HeartOff className="size-8" />
                    )}
                  </button>
                  <p className="text-sm"> {`${post.likes.length} Likes`}</p>
                </div>
                <div>
                  <button>
                    <MessageCircle className="size-8" />
                  </button>
                </div>
              </div>
              <div className="w-full flex justify-start">
                
                <p className="text-white  mb-5">{post.postContent}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default HomePage;
