import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axiosInstance from "../../utils/axiosInstace";
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, UserPlus } from "lucide-react";

export default function Register() {

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  const [formData, setFormData] = useState({ first_name: '', last_name: '', email: '', password: '', confirmPassword: '' });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const resetFields = () => setFormData( { first_name: '', last_name: '', email: '', password: '', confirmPassword: ''});

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    if(!strongPasswordRegex.test(formData.password)){
      toast.error("Password must be at least 8 characters and include uppercase, lowercase, number, and special character.");
      return;
    }
    try {
      await axiosInstance.post('/api/auth/register', formData);
      toast.success('Registered! Please login.');
      setFormData({ first_name: '', last_name: '', email: '', password: '', confirmPassword: '' });
      setTimeout(()=> { navigate('/login') },2000);
    } catch {
      toast.error('Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="flex w-full max-w-5xl bg-white rounded-2xl shadow-lg overflow-hidden">

        {/* Left branding panel */}
        <div className="hidden md:flex flex-col items-center justify-center w-1/2 bg-white shadow-2xl p-8 text-center">
          <img src="/psgcas.png" alt="Logo" className="h-20 mb-6" />
          <h2 className="text-2xl font-bold text-blue-800">PSG ARTS ALUMNI</h2>
          <p className="text-sm font-semibold text-gray-600 mt-4">
            Sign up to stay connected with your batch, department, and alumni network.
          </p>
        </div>

        {/* Right form panel */}
        <div className="w-full md:w-1/2 p-8">
          <div className="flex flex-col items-center mb-6">
            <div className="bg-blue-100 p-3 rounded-full mb-2">
              <UserPlus className="text-blue-700" size={32} />
            </div>
            <h2 className="text-xl font-semibold text-gray-800">Create Alumni Account</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="flex gap-3">
              <input
                name="first_name"
                placeholder="First Name"
                value={formData.first_name}
                onChange={handleChange}
                className="w-1/2 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                name="last_name"
                placeholder="Last Name"
                value={formData.last_name}
                onChange={handleChange}
                className="w-1/2 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <input
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Password Field */}
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
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

            {/* Confirm Password */}
            <div className="relative">
              <input
                name="confirmPassword"
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
              />
              <span
                className="absolute right-3 top-2.5 cursor-pointer text-gray-600"
                onClick={() => setShowConfirm(!showConfirm)}
              >
                {showConfirm ? <Eye size={20} /> : <EyeOff size={20} />}
              </span>
            </div>

            <div className="flex justify-between pt-3">
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
                SIGN UP
              </button>
            </div>
            <div className="text-center text-sm text-gray-600 mt-6">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-blue-600 font-medium hover:underline"
              >
                Sign in
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
