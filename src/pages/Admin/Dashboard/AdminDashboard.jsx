import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  Legend
} from 'recharts';
import { Users, CalendarCheck, Image, MapPin, Mail } from 'lucide-react';
import AlumniMap from '../../FindAlumni/AlumniMap';

const alumniData = [
  { year: '2018', alumni: 320 },
  { year: '2019', alumni: 450 },
  { year: '2020', alumni: 390 },
  { year: '2021', alumni: 510 },
  { year: '2022', alumni: 610 },
];

const eventData = [
  { month: 'Jan', events: 3 },
  { month: 'Feb', events: 2 },
  { month: 'Mar', events: 4 },
  { month: 'Apr', events: 3 },
  { month: 'May', events: 5 },
  { month: 'Jun', events: 3 },
  { month: 'July', events: 2 },
  { month: 'Aug', events: 4 },
  { month: 'Sep', events: 3 },
  { month: 'Oct', events: 5 },
];

const alumniList = [
  {
    name: 'Anjali R',
    batch: '2018',
    branch: 'Computer Science',
    email: 'anjali@example.com',
    avatar: 'https://i.pravatar.cc/40?img=1'
  },
  {
    name: 'Karthik M',
    batch: '2019',
    branch: 'Physics',
    email: 'karthik@example.com',
    avatar: 'https://i.pravatar.cc/40?img=2'
  },
  {
    name: 'Divya P',
    batch: '2020',
    branch: 'Commerce',
    email: 'divya@example.com',
    avatar: 'https://i.pravatar.cc/40?img=3'
  }
];

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-md p-6 flex items-center gap-4">
          <div className="bg-blue-100 text-blue-600 p-3 rounded-full">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-1">Total Alumni</h2>
            <p className="text-3xl font-bold text-blue-600">2,340</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 flex items-center gap-4">
          <div className="bg-green-100 text-green-600 p-3 rounded-full">
            <CalendarCheck className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-1">Events Organized</h2>
            <p className="text-3xl font-bold text-green-600">18</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 flex items-center gap-4">
          <div className="bg-purple-100 text-purple-600 p-3 rounded-full">
            <Image className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-1">Gallery Uploads</h2>
            <p className="text-3xl font-bold text-purple-600">47</p>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4">Alumni by Year</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={alumniData}>
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="alumni" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4">Monthly Events Trend</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={eventData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="events" stroke="#10b981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Alumni Map Section */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <MapPin className="text-blue-500 w-5 h-5" />
          <h2 className="text-lg font-semibold">Alumni Map Overview</h2>
        </div>
        <AlumniMap height="400px"/>
      </div>

      {/* Newsletter Section */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Mail className="text-rose-500 w-5 h-5" />
          <h2 className="text-lg font-semibold">Newsletter Overview</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-rose-100 text-rose-700 rounded-lg p-4">
            <h3 className="text-sm font-medium">Total Subscribers</h3>
            <p className="text-2xl font-bold">1,256</p>
          </div>
          <div className="bg-rose-100 text-rose-700 rounded-lg p-4">
            <h3 className="text-sm font-medium">Newsletters Sent</h3>
            <p className="text-2xl font-bold">34</p>
          </div>
          <div className="bg-rose-100 text-rose-700 rounded-lg p-4">
            <h3 className="text-sm font-medium">Last Sent</h3>
            <p className="text-2xl font-bold">June 30</p>
          </div>
        </div>
      </div>

      {/* User Data Table */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-lg font-semibold mb-4">Recently Registered Alumni</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left border border-gray-200">
            <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
              <tr>
                <th className="py-3 px-4 border-b">Name</th>
                <th className="py-3 px-4 border-b">Batch</th>
                <th className="py-3 px-4 border-b">Branch</th>
                <th className="py-3 px-4 border-b">Email</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {alumniList.map((alumni, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="py-3 px-4 border-b flex items-center gap-3 font-medium">
                    <img
                      src={alumni.avatar}
                      alt={alumni.name}
                      className="w-8 h-8 rounded-full border object-cover"
                    />
                    {alumni.name}
                  </td>
                  <td className="py-3 px-4 border-b">{alumni.batch}</td>
                  <td className="py-3 px-4 border-b">{alumni.branch}</td>
                  <td className="py-3 px-4 border-b">{alumni.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
