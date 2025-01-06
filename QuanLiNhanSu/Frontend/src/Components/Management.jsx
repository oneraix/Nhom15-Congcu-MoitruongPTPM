import React from "react";
import Dashboard from "./Dashboard.jsx";
import EmployeeManagement from "./Employee.jsx";

const DashboardPage = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Left Dashboard Sidebar */}
      <div className="shadow-xl z-10">
        <Dashboard />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden">
        <div className="p-6 overflow-auto" style={{ height: 'calc(100vh - 64px)' }}>
          <div className="bg-white rounded-xl shadow-sm">
            <EmployeeManagement />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;