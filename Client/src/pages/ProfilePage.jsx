import React, { useEffect } from "react";
import SlideBar from "../components/slidebar.jsx";
import { Grid3x3, Image } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore.js";
import { Link } from "react-router-dom";
import { usePostStore } from "../store/usePostStore.js";

const ProfilePage = () => {
  const { authUser, logout, checkAuth } = useAuthStore();
  const { userPosts, getPost } = usePostStore();

  useEffect(() => {
    getPost();
  }, [getPost, authUser]);

  const Logout = () => {
    logout();
  };

  return (
    <div className="flex  h-screen w-full bg-black relative ">
      <SlideBar />
      <div className="h-screen w-full flex flex-col items-center overflow-y-auto">
        <div id="top" className="w-full h-[90%] flex relative justify-center">
          <div className="h-full w-[40%]  relative">
            <div className="h-40 w-40  rounded-full absolute right-10 top-24">
              <img
                className="h-full w-full object-cover rounded-full"
                src={authUser.profilePic || "/avatar.png"}
                alt=""
              />
            </div>
          </div>
          <div className="h-full w-[60%]  px-10 py-10 ">
            <div className="flex items-center">
              <h1 className="text-3xl text-white inline-block">
                {`${authUser.userName}`}
              </h1>
              <span className="px-20">
                <Link to="/EditProfile">
                  <button className="h-8 w-32 rounded-md bg-[#262626] text-white">
                    Edit Profile
                  </button>
                </Link>
                <button
                  onClick={Logout}
                  className="h-8 w-32 ml-5 rounded-md bg-[#262626] text-red-600"
                >
                  Log Out
                </button>
              </span>
            </div>

            <div className="flex items-center gap-5 pt-5">
              <button className="inline-block text-lg text-white">
                {userPosts.length} Posts
              </button>
              <button className="text-lg text-white">
                {authUser.followers && authUser.followers.length} Followers
              </button>
              <button className="text-lg text-white">
                { authUser.following && authUser.following.length} Following
              </button>
            </div>
            {/* <div>
                  <h1 className="text-white pt-1">name</h1>
                </div> */}
            <div className="pt-10">
              <p className="text-white pr-60 pb-52  ">{authUser.bio}</p>
            </div>
          </div>
          <span className="h-[1px] w-[80%] bg-zinc-500 absolute bottom-0  "></span>
        </div>
        <div id="bottom" className="w-full flex justify-center  ">
          <div className="pt-10">
            <Grid3x3 className="inline-block text-white " />
            <span className="text-white text-lg pl-3">Posts</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-5">
          {userPosts.map((post) => (
            <div
              key={post._id}
              className="h-52 w-52  rounded-lg overflow-hidden"
            >
              {/* Render post content (image, caption, etc.) here */}
              <img
                cloudName="diudwpbhj"
                publicId={post.postImage}
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
