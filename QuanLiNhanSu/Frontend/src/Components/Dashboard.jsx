import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Users, Building2, DollarSign, Search, Home, LogOut,  UserCheck, Award, AlertCircle,BarChart2, Clock  } from 'lucide-react';

const Dashboard = () => {
  const [userInfo, setUserInfo] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3000/api/auth/userinfo", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserInfo(response.data);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchUserInfo();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");  // Remove token from localStorage
    navigate("/login");  // Navigate to the login page
  };

  if (!userInfo) {
    return (
      <div className="w-[280px] min-h-screen bg-blue-600 flex items-center justify-center">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
        </div>
      </div>
    );
  }

  const menuItems = [
    { title: "Trang chủ", icon: <Home className="w-5 h-5" />, path: "" },
    { title: "Quản lý nhân sự", icon: <Users className="w-5 h-5" />, path: "/employee" },
    { title: "Quản lý phòng ban", icon: <Building2 className="w-5 h-5" />, path: "/department" },
    { title: "Quản lý bảng lương", icon: <DollarSign className="w-5 h-5" />, path: "/salary" },
    { title: "Tìm kiếm nhân sự", icon: <Search className="w-5 h-5" />, path: "/search-employee" },
    { title: "Quản lý tài khoản", icon: <UserCheck className="w-5 h-5" />, path: "/account" }, // View Quản lý Tài khoản
    { title: "Quản lý khen thưởng", icon: <Award className="w-5 h-5" />, path: "/reward" }, // View Quản lý Khen thưởng
    { title: "Quản lý kỷ luật", icon: <AlertCircle className="w-5 h-5" />, path: "/discipline" }, // View Quản lý Kỷ luật
    { title: "Báo cáo thống kê", icon: <BarChart2 className="w-5 h-5" />, path: "/report" },
    { title: "Quản lý chấm công", icon: <Clock className="w-5 h-5" />, path: "/attendance" }

  ];
  
  const showImage = location.pathname === "/" || location.pathname === "/dashboard";

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-[280px] bg-blue-600 text-white flex flex-col shadow-xl">
        <div className="p-6 bg-blue-700 border-b border-blue-500/30">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
              <span className="text-lg font-semibold">{userInfo.fullname[0]}</span>
            </div>
            <div>
              <div className="font-semibold truncate">{userInfo.fullname}</div>
              <div className="text-sm text-blue-200">{userInfo.role}</div>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <div className="flex-1 py-6">
          <h2 className="px-6 mb-4 text-sm font-medium uppercase tracking-wider text-blue-200">
            Danh sách công việc
          </h2>
          <nav className="space-y-1">
            {menuItems.map((item, index) => {
              const isActive = location.pathname === item.path;
              return (
                <Link to={item.path} key={index}>
                  <div
                    className={`relative px-6 py-3 cursor-pointer transition-colors duration-200
                      ${isActive ? 'bg-blue-700' : 'hover:bg-blue-700/50'}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`${isActive ? 'text-white' : 'text-blue-200'}`}>
                        {item.icon}
                      </span>
                      <span className="text-sm font-medium">{item.title}</span>
                    </div>
                    {isActive && (
                      <div className="absolute left-0 top-0 w-1 h-full bg-white" />
                    )}
                  </div>
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="ml-16 px-6 py-3 mt-auto cursor-pointer hover:bg-blue-700/50" onClick={handleLogout}>
          <div className="flex items-center gap-3">
            <LogOut className="w-5 h-5 text-blue-200" />
            <span className="text-sm font-medium text-blue-200">Đăng xuất</span>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-1 bg-gray-50">
        {showImage ? (
          <div className="p-8 h-full flex items-center justify-center">
            <div className="max-w-4xl w-full bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="p-8 text-center">
                <h2 className="text-3xl font-bold text-blue-600 mb-4">
                  Chào mừng bạn đến với Hệ thống Quản lý Nhân sự
                </h2>
                <p className="text-gray-600 mb-8">
                  Quản lý hiệu quả - Phát triển bền vững
                </p>
                <div className="relative aspect-video rounded-lg overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80"
                    alt="Quản lý nhân sự"
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-8">
            <Outlet />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;