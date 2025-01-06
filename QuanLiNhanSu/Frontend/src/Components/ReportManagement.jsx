import React, { useEffect, useState } from "react";
import axios from "axios";

const ReportManagement = () => {
  const [statistics, setStatistics] = useState({
    totalEmployees: 0,
    totalAccounts: 0,
    totalRewards: 0,
    totalPenalties: 0,
    departmentDistribution: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchStatistics();
  }, []);

  const fetchStatistics = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/report/statistics");
      setStatistics(response.data);
      setLoading(false);
    } catch (err) {
      setError("Lỗi khi tải dữ liệu báo cáo.");
      setLoading(false);
    }
  };

  if (loading) {
    return <p className="text-center text-gray-500">Đang tải dữ liệuu...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-indigo-600 rounded-lg shadow-lg p-6 mb-8">
          <h1 className="text-3xl font-bold text-white">Báo cáo Thống kê</h1>
          <p className="text-indigo-100 mt-2">Tổng quan các số liệu quan trọng</p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800">Số lượng nhân viên</h2>
            <p className="text-3xl font-semibold text-indigo-600 mt-2">
              {statistics.totalEmployees}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800">Số lượng tài khoản</h2>
            <p className="text-3xl font-semibold text-indigo-600 mt-2">
              {statistics.totalAccounts}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800">Tổng tiền thưởng</h2>
            <p className="text-3xl font-semibold text-indigo-600 mt-2">
              {new Intl.NumberFormat("vi-VN").format(statistics.totalRewards)} đ
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800">Tổng tiền phạt</h2>
            <p className="text-3xl font-semibold text-indigo-600 mt-2">
              {new Intl.NumberFormat("vi-VN").format(statistics.totalPenalties)} đ
            </p>
          </div>
        </div>

        {/* Department Distribution */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Phân bổ nhân viên theo phòng ban</h2>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Phòng ban
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Số lượng nhân viên
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {statistics.departmentDistribution.map((department) => (
                <tr key={department.department_name}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {department.department_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {department.employee_count}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReportManagement;
