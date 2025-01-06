import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Login'; // Trang Login
import Dashboard from './Components/Dashboard'; // Trang Dashboard
import EmployeeManagement from './Components/Employee';
import DashboardPage from './Components/Management';
import ForgotPassword from './Components/ForgotPassword';
import DepartmentManagement from './Components/Department';
import SalaryManagement from './Components/Salary';
import SearchEmployees from './Components/Search_Employee';
import AccountManagement from './Components/AccountManagement'; // Quản lý Tài khoản
import RewardManagement from './Components/RewardManagement'; // Quản lý Khen thưởng
import DisciplineManagement from './Components/DisciplineManagement'; // Quản lý Kỷ luật
import ReportManagement from './Components/ReportManagement'; 
import AttendanceManagement from './Components/AttendanceManagement';



function App() {
  return (
    <Router>
      <div className="bg-gray-100 min-h-screen">
        <Routes>
          {/* Định nghĩa các route */}
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-pass" element={<ForgotPassword />} />
          <Route path="/" element={<Dashboard />}>
            <Route path="/attendance" element={<AttendanceManagement />} />;
            <Route path="employee" element={<EmployeeManagement />} />
            <Route path="department" element={<DepartmentManagement />} />
            <Route path="salary" element={<SalaryManagement />} />
            <Route path="search-employee" element={<SearchEmployees />} />
            <Route path="account" element={<AccountManagement />} /> {/* Quản lý Tài khoản */}
            <Route path="reward" element={<RewardManagement />} /> {/* Quản lý Khen thưởng */}
            <Route path="discipline" element={<DisciplineManagement />} /> {/* Quản lý Kỷ luật */}
            <Route path="report" element={<ReportManagement />} /> {/* Báo cáo Thống kê */}
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
