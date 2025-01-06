import React, { useState, useEffect } from "react";
import axios from "axios";

const DisciplineManagement = () => {
  const [disciplines, setDisciplines] = useState([]);
  const [formData, setFormData] = useState({
    employee_id: "",
    discipline_type: "",
    description: "",
    discipline_date: "",
    penalty: "",
  });
  const [editingDisciplineId, setEditingDisciplineId] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchDisciplines();
  }, []);

  const fetchDisciplines = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/discipline/disciplines");
      setDisciplines(response.data);
    } catch (error) {
      setMessage("Lỗi khi tải danh sách kỷ luật.");
    }
  };

  const handleAddOrUpdateDiscipline = async (e) => {
    e.preventDefault();
    try {
      if (editingDisciplineId) {
        await axios.put(
          `http://localhost:3000/api/discipline/disciplines/${editingDisciplineId}`,
          formData
        );
        setMessage("Cập nhật loại kỷ luật thành công!");
      } else {
        await axios.post("http://localhost:3000/api/discipline/disciplines", formData);
        setMessage("Thêm mới kỷ luật thành công!");
      }
      fetchDisciplines();
      resetForm();
    } catch (error) {
      setMessage("Lỗi khi xử lý cập nhật kỷ luật.");
    }
  };

  const handleEditDiscipline = (discipline) => {
    setEditingDisciplineId(discipline.discipline_id);
    setFormData({
      employee_id: discipline.employee_id,
      discipline_type: discipline.discipline_type,
      description: discipline.description,
      discipline_date: discipline.discipline_date,
      penalty: discipline.penalty,
    });
  };

  const handleDeleteDiscipline = async (disciplineId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa kỷ luật này?")) {
      try {
        await axios.delete(`http://localhost:3000/api/discipline/disciplines/${disciplineId}`);
        setMessage("Xóa kỷ luật thành công!");
        fetchDisciplines();
      } catch (error) {
        setMessage("Lỗi khi xóa kỷ luật.");
      }
    }
  };

  const resetForm = () => {
    setEditingDisciplineId(null);
    setFormData({
      employee_id: "",
      discipline_type: "",
      description: "",
      discipline_date: "",
      penalty: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-red-600 rounded-lg shadow-lg p-6 mb-8">
          <h1 className="text-3xl font-bold text-white">Quản lý Kỷ luật</h1>
          <p className="text-red-100 mt-2">Hệ thống quản lý thông tin kỷ luật nhân viên</p>
        </div>

        {/* Alert Message */}
        {message && (
          <div className="mb-6 p-4 rounded-lg bg-white border-l-4 border-red-600 shadow-md">
            <p className="text-gray-700">{message}</p>
          </div>
        )}

        {/* Form Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            {editingDisciplineId ? "Cập nhật kỷ luật" : "Thêm mới kỷ luật"}
          </h2>
          <form onSubmit={handleAddOrUpdateDiscipline}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Mã nhân viên</label>
                <input
                  type="number"
                  value={formData.employee_id}
                  onChange={(e) => setFormData({ ...formData, employee_id: e.target.value })}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Loại kỷ luật</label>
                <input
                  type="text"
                  value={formData.discipline_type}
                  onChange={(e) => setFormData({ ...formData, discipline_type: e.target.value })}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Ngày kỷ luật</label>
                <input
                  type="date"
                  value={formData.discipline_date}
                  onChange={(e) => setFormData({ ...formData, discipline_date: e.target.value })}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Số tiền phạt</label>
                <input
                  type="number"
                  value={formData.penalty}
                  onChange={(e) => setFormData({ ...formData, penalty: e.target.value })}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                />
              </div>
              <div className="md:col-span-3 space-y-2">
                <label className="block text-sm font-medium text-gray-700">Mô tả</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                  rows={3}
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-4">
              {editingDisciplineId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Hủy
                </button>
              )}
              <button
                type="submit"
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                {editingDisciplineId ? "Cập nhật" : "Thêm mới"}
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
                    Mã NV
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Loại kỷ luật
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ngày
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Số tiền phạt
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
                {disciplines.map((discipline) => (
                  <tr key={discipline.discipline_id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {discipline.employee_id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {discipline.discipline_type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {discipline.discipline_date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Intl.NumberFormat("vi-VN").format(discipline.penalty)} đ
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">{discipline.description || "Không có"}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleEditDiscipline(discipline)}
                        className="text-red-600 hover:text-red-900 mr-4"
                      >
                        Sửa
                      </button>
                      <button
                        onClick={() => handleDeleteDiscipline(discipline.discipline_id)}
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

export default DisciplineManagement;
