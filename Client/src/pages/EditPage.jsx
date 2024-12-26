import React, { useState } from "react";
import SlideBar from "../components/slidebar";
import { Camera, User } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import toast from "react-hot-toast";

const EditPage = () => {
  const { authUser, isUpdatingProfile, updatePhoto, updatebio } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);
  const [bio, setBio] = useState('');
  
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      try {
        await updatePhoto({ profilePic: base64Image }); // Ensure this doesn't return an object to render
      } catch (error) {
        console.error("Error updating photo:", error);
      }
    };
  };
  const handleBioChange = async (e) =>{
    e.preventDefault()
    try {
    await  updatebio({ bio:bio})
    } catch (error) {
      console.log(error)      
    }
    
  }

  return (
    <div className="flex  h-screen w-full bg-black relative">
      <SlideBar />
      <div className="h-screen w-full relative flex flex-col gap-10 items-center overflow-y-auto">
        <nav className="h-10 w-full p-10">
          <h1 className=" text-2xl  text-white ">Edit Profile</h1>
        </nav>
        <div className="bg-zinc-950 h-28 w-[70%] rounded-3xl flex justify-between items-center p-5">
          <div className="h-24 w-24 rounded-full object-cover object-center relative">
            <img src={selectedImg || authUser.profilePic || "/avatar.png"} alt="" className="rounded-full object-cover h-full w-full" />
            <label
              htmlFor="avatar-upload"
              className={`
                  absolute bottom-0 right-0 
                  bg-base-content hover:scale-105
                  p-2 rounded-full cursor-pointer 
                  transition-all duration-200
                 
                `}
            >
              <Camera className="w-5 h-5 text-base-200" />
              <input
                type="file"
                id="avatar-upload"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={isUpdatingProfile}
              />
            </label>
          </div>
          <p className="text-sm text-zinc-400">
            {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
          </p>

          <button className="h-10 w-40 bg-blue-600 text-white rounded-xl">
            Change Photo
          </button>
        </div>

       
        
        <div className="h-[20%] w-[70%] bg-zinc-950 flex  items-center justify-center relative rounded-3xl">
          <h1 className="text-lg  text-white  absolute left-3 top-1">Bio</h1>
          <form onSubmit={handleBioChange} className="flex items-center justify-between h-[90%] w-[90%] " >
          <textarea
            name="bio"
            id="bio "
          
            onChange={(e)=>setBio(e.target.value)}
            className="h-[60%] w-[60%]  bg-transparent border-[1px] border-zinc-900 text-white resize-none rounded-xl overflow-y-scroll p-2"
          >{authUser.bio}</textarea>
          <button type="submit" className={`h-10 w-20 bg-[#262626] rounded-md text-white  transition-all duration-200  `}>Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditPage;
