import React, { useRef, useState } from "react";
import {Image, Send, X} from "lucide-react"
import { usePostStore } from "../store/usePostStore.js";

const CreatePost = ({ onClose }) => {

  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const {createPost} = usePostStore();


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }
    
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const removeImage = (e) => {
    setImagePreview(null);

    if(fileInputRef.current) fileInputRef.current.value="" ;
  };

  const handleCreatePost = async () => {
    try {
      createPost({
        content: text,
        postImage: imagePreview,
      });
      setText("");
      setImagePreview(null);
      onClose();

    } catch (error) {
      console.log(`ERROR IN CREATE POST FUNCTION: ${error}`);
      
    }
  };


  return (
    <div className="fixed inset-0  flex items-center justify-center bg-black bg-opacity-50 z-50 ">
      <div className="bg-[#181818] text-white rounded-lg  w-[50%] overflow-hidden p-2 pt-0 ">
        <div className="flex w-[100%] h-[10%]  mb-2 p-3 justify-between border-b-[1px] items-center border-zinc-500 ">
          <button   className="px-4 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
            onClick={onClose}>Cancel</button>
          <h1>New Post</h1>
          <button  className="px-4 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600" disabled={!text.trim() && !imagePreview} onClick={handleCreatePost}>Post</button>
        </div>
        <form >

        <textarea
          className="w-full min-h-32 p p-2 bg-zinc-700 rounded-md text-white mb-4"
          placeholder="What's on your mind?"
          value={text}
          onChange={ (e) =>setText(e.target.value)}
          ></textarea>
           <div className="flex-1 flex gap-2">
         

          <input type="file" 
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          onChange={handleImageChange} />

          <button type="button"
          className={`hidden sm:flex btn btn-circle 
          ${imagePreview ? "text-emerald-500" : "text-zinc-400"}`}
          onClick={()=> fileInputRef.current?.click()}>
            <Image size={20} />

          </button>

        </div>

      
          </form>
        <div className="flex ">
        
        </div>
        <div className="p-4 w-full ">
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt="preview"
              className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
            />
            <button
              onClick={removeImage}
              className=" absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300 
        flex items-center justify-center "
              type="button"
            >
              <X className="size-3" />
            </button>
          </div>
        </div>
      )}
        
      </div>
      </div>
    </div>
  );
};

export default CreatePost;
