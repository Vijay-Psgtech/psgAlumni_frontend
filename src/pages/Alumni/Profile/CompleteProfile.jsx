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
        coordinates: [],
        photo: null,
    });

    const [locationQuery, setLocationQuery] = useState('');
    const [locationSuggestions, setLocationSuggestions] = useState([]);
    const [preview, setPreview] = useState('');

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
        const display = place.display_name.split(' ')[0];
        setFormData({
            ...formData,
            city: display,
            country: place.address?.country || '',
            coordinates: [lon,lat],
        });
        setLocationQuery(display);
        setLocationSuggestions([]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const payload = new FormData();
            for(let key in formData){
                if(key === 'coordinates'){
                    payload.append('coordinates', JSON.stringify(formData.coordinates));
                }else{
                    payload.append(key, formData[key]);
                }
            }
            await axiosInstance.put('/api/alumni/profile',payload,{
                headers: {
                    Authorization: `Bearer ${auth.token}`,
                },
            });
            toast.success("Profile updated successfully.");
            setTimeout(() => window.location.href = '/dashboard', 1500);
        }catch{
            console.log('Error',err);
            toast.error("Failed to update profile.");
        }
    };


    return (
        
        <div className="max-w-4xl mx-auto px-4 py-8">
            {/* Profile Card */}
            <div className="bg-white rounded-xl shadow-md p-6 flex flex-col sm:flex-row items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                <img
                    src={formData.photo ? URL.createObjectURL(formData.photo) : 'https://via.placeholder.com/100'}
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
                    value={formData.year}
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