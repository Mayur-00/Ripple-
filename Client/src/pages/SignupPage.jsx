import React, { useState } from "react";
import { use } from "react";
import { useAuthStore } from "../store/useAuthStore";
import toast from "react-hot-toast";
import { Eye, EyeOff, Loader2, Lock, Mail, User } from "lucide-react";
import { Link } from "react-router-dom";

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    userName:"",
    email:"",
    password:""
  });

 const {signup, isSigningUp} = useAuthStore();

 const validateForm = () =>{
  if(!formData.userName.trim()) return toast.error("User Name Is Required !");
  if(!formData.email.trim()) return toast.error("Email Is Required !");
  if(!formData.password) return toast.error("Password Is Required !");
  if(formData.password.length < 6) return toast.error("Password Must Be At Least 6 Characters");

  return true;

};

const handleSubmit = (e) =>{
    e.preventDefault();

    const success = validateForm();
    
    if(success === true) signup(formData);
    console.log(formData);
    
}



 const {} = useAuthStore()



  return (
    <div className="h-screen w-full flex justify-center items-center bg-zinc-100 ">
      <div className=" h-screen w-full sm:w-96 sm:h-3/4 bg-white border border-zinc-400 rounded-lg flex flex-col p-4 ">
        <h4>Welcome to our app </h4>
        <h2 className="text-black text-3xl">Create A Account</h2>
        <div>
        <form onSubmit={handleSubmit} className='space-y-6 mt-20 sm:space-y-1 sm:mt-1'>
              {/* fullName */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">User Name</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="size-5 text-zinc-500" />
                </div>
                <input
                  type="text"
                  className={`input input-bordered text-zinc-500 border-zinc-400 w-full pl-10 bg-white`}
                  placeholder="John Doe"
                  value={formData.userName}
                  onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
                />
              </div>
            </div>
            {/* Mail */}

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="size-5 text-zinc-500" />
                </div>
                <input
                  type="email"
                  className={`input  border-zinc-400 text-zinc-500 w-full pl-10 bg-white`}
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="size-5 text-zinc-500" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className={`input input-bordered text-zinc-500 border-zinc-400 w-full pl-10 bg-white`}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="size-5 text-zinc-500" />
                  ) : (
                    <Eye className="size-5 text-zinc-500" />
                  )}
                </button>
              </div>
            </div>

            <button type="submit" className="btn btn-primary text-white w-full bg-blue-600" disabled={isSigningUp}>
              {isSigningUp ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Create Account"
              )}
            </button> 


            </form>
            
            <div className="text-center mt-2">
            <p className="text-zinc-500">
              Already have an account?{" "}
              <Link to="/login" className="link link-primary">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
