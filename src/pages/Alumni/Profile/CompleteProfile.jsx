import React, { useState, useEffect } from 'react';
import axiosInstance from '../../../utils/axiosInstace';
import { toast } from 'react-toastify';
import { useAuth } from '../../../Context/AuthContext';

const CompleteProfile = () => {
    const {auth} = useAuth();
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        batch: '',
        branch: '',
        passingYear: '',
        city: '',
        country: '',
        lat: '',
        lon: '',
        coordinates: [],
        photo: null,
    });

    const [locationQuery, setLocationQuery] = useState('');
    const [locationSuggestions, setLocationSuggestions] = useState([]);
    const [preview, setPreview] = useState('');

    useEffect(()=>{
        const fetchAlumniUserNamebyId = async () => {
            try{
                const res = await axiosInstance.get(`/api/alumni/AlumniUserName/${auth.id}`);
                const users = res.data.AlumniUserData?.[0];
                const profiles = users.alumniprofiles?.[0];
                setFormData({
                    first_name: users.first_name,
                    last_name: users.last_name,
                    email: users.email,
                    ...profiles,
                });
                setLocationQuery(profiles.city);
            }catch(err){
                console.error("Failed to fetch",err);
            }
        }
        fetchAlumniUserNamebyId();
    },[]);

    useEffect(()=>{
        if(locationQuery.length < 3) return;
        const timeOut = setTimeout(()=>{
            fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${locationQuery}`)
            .then(res=>res.json())
            .then(data=>setLocationSuggestions(data));
        },400);
        return () => clearTimeout(timeOut);
    },[locationQuery]);

    const handleInput = (e) => {
        const { name, value, files } = e.target;
        if( name === 'photo' && files?.[0]){
            const file = files[0];
            if(file.size > 2 * 1024 * 1024)
                return toast.error("File must be under 2MB.");
            if(!["image/jpeg", "image/png"].includes(file.type))
                return toast.error("Only JPG and PNG formats allowed.");
            setFormData((prev)=>({...prev, photo: file }));
            setPreview(URL.createObjectURL(file));
        }else{
            setFormData((prev)=>({...prev,[name]: value}));
        }
    }

    const handleLocationSelect = (place) => {
        const lat = parseFloat(place.lat);
        const lon = parseFloat(place.lon);
        const city = place.address?.city || place.address?.town || place.address?.village || '';
        const country = place.address?.country || '';

        console.log('loc',place);
        setFormData({
            ...formData,
            city: city || place.display_name,
            country,
            lat,
            lon,
            coordinates: [lon,lat],
        });
        setLocationQuery(place.display_name);
        setLocationSuggestions([]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const form = new FormData();
            form.append('first_name', formData.first_name);
            form.append('last_name', formData.last_name);
            form.append('email', formData.email);
            form.append('batch', formData.batch);
            form.append('branch', formData.branch);
            form.append('passingYear', formData.passingYear);
            form.append('city', formData.city);
            form.append('country', formData.country);
            form.append('latitude', formData.lat);
            form.append('longitude', formData.lon);
            form.append('coordinates', formData.coordinates);
            if (formData.photo instanceof File) {
                form.append("photo", formData.photo);
            }
            console.log('formData',formData);
            if (!formData.coordinates.length) 
                return toast.error('Please select a location from suggestions.');
            await axiosInstance.post('/api/alumni/complete-profile',form,{
                headers: {
                    Authorization: `Bearer ${auth.token}`,
                },
            });
            toast.success("Profile updated successfully.");
            //setTimeout(() => window.location.href = '/alumni/dashboard', 1500);
        }catch{
            toast.error("Failed to update profile..");
        }
    };
    const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5174";
    const resolvedPhoto =
    preview ||
    (formData.photo instanceof File
      ? URL.createObjectURL(formData.photo)
      : formData.photo?.startsWith("http")
      ? formData.photo
      : `${BASE_URL}/${formData.photo}`) ||
    "/default-avatar.png";


    return (
        
        <div className="max-w-4xl mx-auto px-4 py-8">
            {/* Profile Card */}
            <div className="bg-white rounded-xl shadow-md p-6 flex flex-col sm:flex-row items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                <img
                    src={resolvedPhoto}
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover border-4 border-blue-500"
                />
                <div>
                    <h2 className="text-2xl font-semibold text-gray-800">{formData.first_name} {formData.last_name}</h2>
                    <p className="text-sm text-gray-600">{formData.email}</p>
                </div>
                </div>
            </div>

            {/* Edit Profile Form */}
            <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-xl font-semibold mb-4 text-blue-600">Edit Your Profile</h3>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                    type="text"
                    name="batch"
                    placeholder="Batch (e.g. 2018-2022)"
                    value={formData.batch}
                    onChange={handleInput}
                    className="border p-2 rounded-lg"
                />
                <input
                    type="text"
                    name="branch"
                    placeholder="Branch (e.g. CSE)"
                    value={formData.branch}
                    onChange={handleInput}
                    className="border p-2 rounded-lg"
                />
                <input
                    type="text"
                    name="year"
                    placeholder="Passing Year"
                    value={formData.passingYear}
                    onChange={handleInput}
                    className="border p-2 rounded-lg"
                />
                <input
                    type="text"
                    value={locationQuery}
                    onChange={(e) => setLocationQuery(e.target.value)}
                    placeholder="Search Location"
                    className="w-full px-4 py-2 border rounded"
                    />
                    {locationSuggestions.length > 0 && (
                    <ul className="max-h-40 overflow-y-auto border rounded bg-white text-sm">
                        {locationSuggestions.map((place, idx) => (
                        <li
                            key={idx}
                            className="p-2 hover:bg-blue-50 cursor-pointer"
                            onClick={() => handleLocationSelect(place)}
                        >
                            {place.display_name}
                        </li>
                        ))}
                    </ul>
                    )}
                <div className="col-span-1 md:col-span-2">
                    <label className="block mb-1 font-medium text-gray-600">Upload Profile Photo</label>
                    <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={handleInput}
                    className="border p-2 rounded-lg w-full"
                    />
                </div>
                <div className="col-span-1 md:col-span-2">
                    <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg mt-2"
                    >
                    Save Profile
                    </button>
                </div>
                </form>
            </div>
        </div>
    )
}

export default CompleteProfile