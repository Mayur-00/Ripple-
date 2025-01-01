import React, { useEffect, useState } from "react";
import { usePostStore } from "../store/usePostStore";
import toast from "react-hot-toast";

const ShowCommnets = ({ onClose, post }) => {
  const {createComment, getComments, isLoadingComments,isCreatingComment,allComments} = usePostStore();
  const [comment, setComment] = useState("");

  useEffect(() => {
   getComments(post._id)
  }, [getComments])
  // console.log(allComments);
  
  

 const handleSubmit = async (e)=>{
try {
    e.preventDefault();
      await createComment(post._id, comment);
      setComment("") 
      await getComments(post._id);
       
} catch (error) {
  console.log(error)
  
}

 };


  return (
    <div className="h-full w-full absolute bg-black bg-opacity-50 z-[99] flex justify-center items-center">
      <div className="h-[70%] w-[70%] bg-white rounded-md flex overflow-hidden ">
        <div
          id="postImageContainer"
          className="h-full w-[50%] bg-yellow-100 overflow-hidden"
        >
          <img
            src={post?.postImage}
            alt="postImage"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="h-full w-[50%]  bg-white flex flex-col ">
          <div className="h-[15%] w-full flex items-center gap-5 p-2  border-b-[1px] border-zinc-800 ">
            <div className="h-10 w-10 bg-red-600 rounded-full overflow-hidden">
              <img
                src={post?.auther?.profilePic}
                alt="autherDp"
                className="h-full w-full object-cover"
              />
            </div>
            <h1 className="text-black ">{post?.auther?.userName}</h1>
          </div>
          <div className="h-[70%] w-full overflow-auto flex flex-col gap-2 p-2">
           {allComments.length === 0 ? (
             <div className="h-full w-full bg-zinc-100 flex  justify-center items-center">
             <h1>No Comments to show</h1>
           </div>
           ) : 
           allComments.map((comment)=>(
            <div className="h-20 w-full rounded-xl  border-[1px] border-zinc-800 px-2 overflow-auto">
            <div className="h-[50%] w-full  flex items-center py-2 gap-2">
              <div className="h-8 w-8 rounded-full overflow-hidden  bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-500 p-[2px] ">
                <div className="h-full w-full  rounded-full overflow-hidden"><img src={comment?.user?.profilePic} alt="" className="h-full w-full object-cover" /></div>
                
              </div>
              <h1 className="text-black text-sm font-bold">{comment?.user?.userName}</h1>
            </div>
            <h1 className="text-black">{comment.comment}</h1>

           </div>
           ))
           }
           
          </div>
          

          <form onSubmit={(e)=>handleSubmit(e)} className="h-[15%] w-full  flex items-center justify-between p-1 border-t-[1px] border-zinc-800">
            <input
              type="text"
              name="comment"
              placeholder="Add a Comment"
              value={comment}
              onChange={(e)=> setComment(e.target.value)}
              className="h-[80%] w-[60%] rounded-lg bg-white p-2 text-black placeholder:text-black border-[1px] border-zinc-800 "
            />
            <button
              className="h-[60%] w-[20%] bg-blue-500 flex justify-center items-center text-white rounded-lg border-[1px] border-zinc-800"
              type="submit"
            >
              Post
            </button>
          </form>
        </div>
      </div>
      <button onClick={onClose} className="absolute top-5 right-5 text-black">
        close
      </button>
    </div>
  );
};

export default ShowCommnets;
