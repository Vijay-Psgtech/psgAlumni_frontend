import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstace';
import { useAuth } from '../../Context/AuthContext';
import { Eye, EyeOff, LogIn } from "lucide-react";

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const resetFields = () => setFormData( { email: '', password: ''});

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post('/api/auth/login', formData);
      const { token, user } = res.data;
      console.log(res.data);
      if(token) {
        login(token, user.name, user.id);
        if(user.role === 'alumni'){
          navigate('/alumni/dashboard');
        }else{
          navigate('/admin/dashboard');
        }
      }
    } catch(err) {
      const errorMsg = err.response?.data?.message || 'Login failed. Please try again.';
      toast.error(errorMsg);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="flex w-full max-w-4xl bg-white rounded-2xl shadow-lg overflow-hidden">

        {/* Left Panel - Branding */}
        <div className="hidden md:flex flex-col items-center justify-center w-1/2 bg-white shadow-2xl p-8 text-center">
          <img src="/psgcas.png" alt="Logo" className="h-20 mb-6" />
          <h2 className="text-2xl font-bold text-blue-800">Welcome Back!</h2>
          <p className="text-sm font-semibold text-gray-600 mt-4">
            Sign in to connect with your alumni network and stay updated.
          </p>
        </div>

        {/* Right Panel - Login Form */}
        <div className="w-full md:w-1/2 p-8">
          <div className="flex flex-col items-center mb-6">
            <div className="bg-blue-100 p-3 rounded-full mb-2">
              <LogIn className="text-blue-700" size={32} />
            </div>
            <h2 className="text-xl font-semibold text-gray-800">Login</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
              />
              <span
                className="absolute right-3 top-2.5 cursor-pointer text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </span>
            </div>

            <div className="flex justify-between items-center text-sm">
              <button
                type="button"
                className="text-blue-600 hover:underline"
              >
                Forgot Password?
              </button>
            </div>

            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={resetFields}
                className="text-blue-600 hover:underline font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-700 hover:bg-blue-800 text-white px-5 py-2 rounded-lg shadow"
              >
                SIGN IN
              </button>
            </div>
            <div className="text-center text-sm text-gray-600 mt-6">
              Don’t have an account?{" "}
              <a
                href="/register"
                className="text-blue-600 font-medium hover:underline"
              >
                Create one
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
