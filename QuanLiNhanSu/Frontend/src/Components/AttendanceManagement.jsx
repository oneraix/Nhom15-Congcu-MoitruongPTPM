import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AttendanceManagement = () => {
  const [attendances, setAttendances] = useState([]);
  const [formData, setFormData] = useState({
    employee_id: '',
    attendance_date: '',
    status: '',
    notes: '',
  });
  const [editingAttendance, setEditingAttendance] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchAttendances();
  }, []);

  const fetchAttendances = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/attendance/attendances');
      setAttendances(response.data);
    } catch (error) {
      setMessage('Lỗi khi tải danh sách chấm công.');
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (editingAttendance) {
      await updateAttendance();
    } else {
      await addAttendance();
    }
  };

  const addAttendance = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/attendance/attendances', formData);
      setAttendances([...attendances, { ...formData, attendance_id: response.data.attendanceId }]);
      resetForm();
      setMessage('Thêm chấm công thành công!');
    } catch (error) {
      setMessage('Lỗi khi thêm chấm công.');
    }
  };

  const updateAttendance = async () => {
    try {
      await axios.put(
        `http://localhost:3000/api/attendance/attendances/${editingAttendance.attendance_id}`,
        formData
      );
      setAttendances(
        attendances.map((attendance) =>
          attendance.attendance_id === editingAttendance.attendance_id
            ? { ...attendance, ...formData }
            : attendance
        )
      );
      resetForm();
      setMessage('Cập nhật chấm công thành công!');
    } catch (error) {
      setMessage('Lỗi khi cập nhật chấm công.');
    }
  };

  const deleteAttendance = async (attendance_id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa bản ghi này?')) {
      try {
        await axios.delete(`http://localhost:3000/api/attendance/attendances/${attendance_id}`);
        setAttendances(attendances.filter((attendance) => attendance.attendance_id !== attendance_id));
        setMessage('Xóa chấm công thành công!');
      } catch (error) {
        setMessage('Lỗi khi xóa chấm công.');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      employee_id: '',
      attendance_date: '',
      status: '',
      notes: '',
    });
    setEditingAttendance(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-blue-600 rounded-lg shadow-lg p-6 mb-8">
          <h1 className="text-3xl font-bold text-white">Quản lý Bảng Chấm Công</h1>
          <p className="text-blue-100 mt-2">Hệ thống quản lý chấm công nhân viên</p>
        </div>

        {message && (
          <div className="mb-6 p-4 rounded-lg bg-white border-l-4 border-blue-600 shadow-md">
            <p className="text-gray-700">{message}</p>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            {editingAttendance ? 'Cập nhật Chấm Công' : 'Thêm Chấm Công'}
          </h2>
          <form onSubmit={handleFormSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Mã Nhân viên</label>
                <input
                  type="number"
                  name="employee_id"
                  value={formData.employee_id}
                  onChange={(e) => setFormData({ ...formData, employee_id: e.target.value })}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Ngày Chấm Công</label>
                <input
                  type="date"
                  name="attendance_date"
                  value={formData.attendance_date}
                  onChange={(e) => setFormData({ ...formData, attendance_date: e.target.value })}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Trạng thái</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                >
                  <option value="">Chọn trạng thái</option>
                  <option value="Present">Có mặt</option>
                  <option value="Absent">Vắng mặt</option>
                  <option value="Late">Đi muộn</option>
                  <option value="Leave">Nghỉ phép</option>
                </select>
              </div>
              <div className="md:col-span-3">
                <label className="block text-sm font-medium text-gray-700">Ghi chú</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  rows={3}
                ></textarea>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-4">
              {editingAttendance && (
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
                {editingAttendance ? 'Cập nhật' : 'Thêm mới'}
              </button>
            </div>
          </form>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mã NV</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ghi chú</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Thao tác</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {attendances.map((attendance) => (
                <tr key={attendance.attendance_id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">{attendance.employee_id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{attendance.attendance_date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{attendance.status}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{attendance.notes || 'Không có'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => setEditingAttendance(attendance)}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => deleteAttendance(attendance.attendance_id)}
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
  );
};

export default AttendanceManagement;
