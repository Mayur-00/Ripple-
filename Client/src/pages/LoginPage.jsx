import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore';
import { Eye, EyeOff, Loader2, Lock, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] =useState({
    userName:"",
    password:""

  });

  const validateForm = () =>{
    if(!formData.userName.trim()) return toast.error("User Name Is Required !");
    if(!formData.password) return toast.error("Password Is Required !");
    if(formData.password.length < 6) return toast.error("Password Must Be At Least 6 Characters");

    return true
  }

  const {login, isLoggingIn} = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();

    const Success = validateForm();

    if(Success === true) login(formData);

    console.log("login Succes", formData);
    
  }


  return (
    <div className="h-screen w-full flex justify-center items-center bg-zinc-100 ">
    <div className="w-full h-screen  sm:w-96 md:h-3/4 bg-white border border-zinc-400 rounded-lg flex  flex-col p-4 ">
      <h4>Hello User</h4>
      <h2 className="text-black text-3xl">Welcome Back 👋</h2>
      <div>
      <form onSubmit={handleSubmit} className='space-y-5 mt-20 sm:mt-6'>
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

          <button type="submit" className="btn btn-primary text-white w-full bg-blue-600" disabled={isLoggingIn}>
            {isLoggingIn ? (
              <>
                <Loader2 className="size-5 animate-spin" />
                Loading...
              </>
            ) : (
              "Log In"
            )}
          </button> 


          </form>
          
          <div className="text-center mt-2">
          <p className="text-zinc-500">
           Don't have an account?{" "}
            <Link to="/signup" className="link link-primary">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  </div>
  )
}

export default LoginPage