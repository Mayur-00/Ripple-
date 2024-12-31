import React, { useEffect } from "react";
import SlideBar from "../components/SlideBar.jsx";
import { Grid3x3, Image } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore.js";
import { Link } from "react-router-dom";
import { usePostStore } from "../store/usePostStore.js";

const ProfilePage = () => {
  const { authUser, logout, checkAuth } = useAuthStore();
  const { userPosts, getPost } = usePostStore();

  useEffect(() => {
    getPost();
    checkAuth()
  }, [getPost, authUser, checkAuth]);

  const Logout = () => {
    logout();
  };

  return (
    <div className="flex  h-screen w-full bg-white relative overflow-hidden ">
      <SlideBar />
      <div className="h-screen w-full flex flex-col items-center  overflow-y-auto ">
        <div id="top" className="w-full h-[90%] flex relative border-b-[1px] z-40 border-black justify-center">
          <div className="h-full w-[40%]  relative">
            <div className=" h-[14%] md:h-40 w-[50%] md:w-40  rounded-full absolute right-10 top-24">
              <img
                className="h-full w-full object-cover rounded-full"
                src={authUser.profilePic || "/avatar.png"}
                alt="profilePic"
              />
            </div>
          </div>
          <div className="h-full w-[60%]  px-0 md:px-10 py-10 ">
            <div className="flex items-center w-full">
              <h1 className=" text-2xl md:text-3xl text-black ">
                {`${authUser.userName}`}
              </h1>
              <span className="px-10 flex items-center justify-center gap-2 flex-col md:flex-row ">
                <Link to="/EditProfile">
                  <button className="h-8  md:h-8 w-20 md:w-32 rounded-md text-sm bg-[#262626] text-black">
                    Edit Profile
                  </button>
                </Link>
                <button
                  onClick={Logout}
                  className="h-8 md:h-8 w-20 md:w-32 ml-0 md:ml-5 text-sm  rounded-md bg-zinc-300 text-red-600"
                >
                  Log Out
                </button>
              </span>
            </div>

            <div className="flex items-center gap-5 pt-5">
              <button className="inline-block text-lg text-black">
                {userPosts.length} Posts
              </button>
              <button className="text-lg text-black">
                {authUser.followers && authUser.followers.length} Followers
              </button>
              <button className="text-lg text-black">
                { authUser.following && authUser.following.length} Following
              </button>
            </div>
            {/* <div>
                  <h1 className="text-white pt-1">name</h1>
                </div> */}
            <div className="pt-10">
              <p className="text-black pr-5 md:pr-72 md:pb-52 text-sm md:text-[15px] ">{authUser.bio}</p>
            </div>
          </div>
        </div>
        <div id="bottom" className="w-full flex justify-center  ">
          <div className="pt-10">
            <Grid3x3 className="inline-block text-black " />
            <span className="text-black text-lg pl-3">Posts</span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mt-5 p-1">
          {userPosts.map((post) => (
            <div
              key={post._id}
              className="h-52 w-52 border-[1px] border-black rounded-lg overflow-hidden shrink-0" 
            >
              {/* Render post content (image, caption, etc.) here */}
              <img
                src={post.postImage}  
                dpr="auto"
                className="object-cover h-full w-full "
                alt={post.postImage}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
