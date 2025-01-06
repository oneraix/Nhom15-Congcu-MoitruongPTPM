import React, { useState, useEffect } from "react";
import axios from "axios";

const DepartmentManagement = () => {
  const [departments, setDepartments] = useState([]);
  const [formData, setFormData] = useState({
    department_name: "",
    description: "",
  });
  const [editId, setEditId] = useState(null);
  const [message, setMessage] = useState("");

  const fetchDepartments = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/department/departments");
      setDepartments(response.data.data);
    } catch (error) {
      setMessage("Không thể tải danh sách phòng ban.");
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/department/departments", formData);
      setMessage(response.data.message);
      setFormData({ department_name: "", description: "" });
      fetchDepartments();
    } catch (error) {
      setMessage("Thêm phòng ban thất bại.");
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:3000/api/department/departments/${editId}`, formData);
      setMessage(response.data.message);
      setFormData({ department_name: "", description: "" });
      setEditId(null);
      fetchDepartments();
    } catch (error) {
      setMessage("Cập nhật phòng ban thất bại.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa phòng ban này?")) {
      try {
        const response = await axios.delete(`http://localhost:3000/api/department/departments/${id}`);
        setMessage(response.data.message);
        fetchDepartments();
      } catch (error) {
        setMessage("Xóa phòng ban thất bại.");
      }
    }
  };

  const startEditing = (department) => {
    setEditId(department.department_id);
    setFormData({
      department_name: department.department_name,
      description: department.description,
    });
  };

  const resetForm = () => {
    setFormData({ department_name: "", description: "" });
    setEditId(null);
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-blue-600 rounded-lg shadow-lg p-6 mb-8">
          <h1 className="text-3xl font-bold text-white">Quản lý Phòng Ban</h1>
          <p className="text-blue-100 mt-2">Hệ thống quản lý thông tin phòng ban</p>
        </div>

        {/* Alert Message */}
        {message && (
          <div className="mb-6 p-4 rounded-lg bg-white border-l-4 border-blue-600 shadow-md">
            <p className="text-gray-700">{message}</p>
          </div>
        )}

        {/* Form Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            {editId ? 'Cập nhật thông tin phòng ban' : 'Thêm phòng ban mới'}
          </h2>
          <form onSubmit={editId ? handleEdit : handleAdd}>
            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Tên phòng ban
                </label>
                <input
                  type="text"
                  value={formData.department_name}
                  onChange={(e) =>
                    setFormData({ ...formData, department_name: e.target.value })
                  }
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Mô tả
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={3}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-4">
              {editId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Hủy
                </button>
              )}
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {editId ? 'Cập nhật' : 'Thêm mới'}
              </button>
            </div>
          </form>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tên phòng ban
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Mô tả
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {departments.map((department) => (
                  <tr key={department.department_id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {department.department_id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {department.department_name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {department.description || 'Không có'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => startEditing(department)}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        Sửa
                      </button>
                      <button
                        onClick={() => handleDelete(department.department_id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepartmentManagement;