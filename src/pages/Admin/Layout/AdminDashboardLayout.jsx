import React,{useState} from "react";
import Sidebar from "./Sidebar";
import TopNavbar from "./TopNavbar";

export default function AdminDashboardLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    return (
    <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 flex flex-col">
            <TopNavbar />
            <main className="p-4 overflow-y-auto">{children}</main>
        </div>
        </div>
  );
}