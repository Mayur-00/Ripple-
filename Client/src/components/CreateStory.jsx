import React, { useRef, useState } from "react";
import { usePostStore } from "../store/usePostStore";
import { Image, X } from "lucide-react";
import { useStoryStore } from "../store/useStoryStore";

const CreateStory = ({ onClose, data }) => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

const {createStory,AuthUserStory} = useStoryStore()

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

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleCreatePost = async () => {
    try {
     await createStory({
      image:imagePreview
     })
    } catch (error) {

      console.log(`ERROR IN CREATE story FUNCTION: ${error}`);
    }
  };
  return (
    <div className="fixed inset-0  flex items-center justify-center bg-black bg-opacity-50 z-[99] ">
      <div className="bg-[white] text-white rounded-lg   w-[90%] md:w-[40%] overflow-hidden p-2 pt-0 ">
        <div className="flex w-[100%] h-[10%]  md:h-[15%]  mb-2 p-3 justify-between border-b-[1px] items-center border-zinc-500 ">
          <button
            className="px-4 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
            onClick={onClose}
          >
            Cancel
          </button>
          <h1 className="text-black font-bold">Create Story</h1>
          <button
            className="px-4 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            disabled={!text.trim() && !imagePreview}
            onClick={handleCreatePost}
          >
            Publish
          </button>
        </div>
        <form>
          <div className="flex-1 flex gap-2">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handleImageChange}
            />

            <button
              type="button"
              className={` sm:flex btn hover:bg-zinc-600 bg-zinc-500 h-[200px] w-[99%] `}
              onClick={() => fileInputRef.current?.click()}
            >
              {imagePreview ? (
            
                  <div className="h-[100%] w-[100%] relative">
                    <img
                      src={imagePreview}
                      alt="preview"
                      className="w-full h-full object-cover rounded border border-zinc-700"
                    />
                    <button
                      onClick={removeImage}
                      className=" absolute top-1 right-1 w-5 h-5 rounded-full bg-base-300 
                             flex items-center justify-center "
                      type="button"
                    >
                      <X className="size-3" />
                    </button>
                  </div>
         
              ) : (<div>Click Here Upload Image</div>) }
              
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateStory;
