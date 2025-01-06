import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SalaryManagement = () => {
  const [salaries, setSalaries] = useState([]);
  const [basicSalary, setBasicSalary] = useState('');
  const [jobAllowance, setJobAllowance] = useState('');
  const [otherAllowance, setOtherAllowance] = useState('');
  const [note, setNote] = useState('');
  const [editingSalaryId, setEditingSalaryId] = useState(null);
  const [message, setMessage] = useState('');

  // Existing useEffect and handlers remain the same
  useEffect(() => {
    axios.get('http://localhost:3000/api/salary/salaries')
      .then(response => {
        setSalaries(response.data);
      })
      .catch(error => {
        setMessage('Lỗi khi tải danh sách lương');
      });
  }, []);

  const handleAddSalary = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/salary/salaries', {
        basic_salary: basicSalary,
        job_allowance: jobAllowance,
        other_allowance: otherAllowance,
        note
      });
      setSalaries([...salaries, response.data]);
      setMessage('Thêm mới lương thành công!');
      resetForm();
    } catch (error) {
      setMessage('Lỗi khi thêm mới lương');
    }
  };

  const handleEditSalary = (salaryId) => {
    const salary = salaries.find(s => s.salary_id === salaryId);
    setEditingSalaryId(salaryId);
    setBasicSalary(salary.basic_salary);
    setJobAllowance(salary.job_allowance);
    setOtherAllowance(salary.other_allowance);
    setNote(salary.note);
  };

  const handleUpdateSalary = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/api/salary/salaries/${editingSalaryId}`, {
        basic_salary: basicSalary,
        job_allowance: jobAllowance,
        other_allowance: otherAllowance,
        note
      });
      const updatedSalaries = salaries.map(s => 
        s.salary_id === editingSalaryId ? { ...s, basic_salary: basicSalary, job_allowance: jobAllowance, other_allowance: otherAllowance, note } : s
      );
      setSalaries(updatedSalaries);
      setMessage('Cập nhật lương thành công!');
      resetForm();
    } catch (error) {
      setMessage('Lỗi khi cập nhật lương');
    }
  };

  const handleDeleteSalary = async (salaryId) => {
    try {
      await axios.delete(`http://localhost:3000/api/salary/salaries/${salaryId}`);
      setSalaries(salaries.filter(s => s.salary_id !== salaryId));
      setMessage('Xóa lương thành công!');
    } catch (error) {
      setMessage('Lỗi khi xóa lương');
    }
  };

  const resetForm = () => {
    setBasicSalary('');
    setJobAllowance('');
    setOtherAllowance('');
    setNote('');
    setEditingSalaryId(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-blue-600 rounded-lg shadow-lg p-6 mb-8">
          <h1 className="text-3xl font-bold text-white">Quản lý Lương</h1>
          <p className="text-blue-100 mt-2">Hệ thống quản lý lương và phụ cấp nhân viên</p>
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
            {editingSalaryId ? 'Cập nhật thông tin lương' : 'Thêm thông tin lương mới'}
          </h2>
          <form onSubmit={editingSalaryId ? handleUpdateSalary : handleAddSalary}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Lương cơ bản</label>
                <input
                  type="number"
                  value={basicSalary}
                  onChange={(e) => setBasicSalary(e.target.value)}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Phụ cấp công việc</label>
                <input
                  type="number"
                  value={jobAllowance}
                  onChange={(e) => setJobAllowance(e.target.value)}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Phụ cấp khác</label>
                <input
                  type="number"
                  value={otherAllowance}
                  onChange={(e) => setOtherAllowance(e.target.value)}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div className="md:col-span-3 space-y-2">
                <label className="block text-sm font-medium text-gray-700">Ghi chú</label>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  rows={3}
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-4">
              {editingSalaryId && (
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
                {editingSalaryId ? 'Cập nhật' : 'Thêm mới'}
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
                    Lương cơ bản
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Phụ cấp công việc
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Phụ cấp khác
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ghi chú
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {salaries.map((salary) => (
                  <tr key={salary.salary_id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Intl.NumberFormat('vi-VN').format(salary.basic_salary)} đ
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Intl.NumberFormat('vi-VN').format(salary.job_allowance)} đ
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Intl.NumberFormat('vi-VN').format(salary.other_allowance)} đ
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {salary.note || 'Không có'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleEditSalary(salary.salary_id)}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        Sửa
                      </button>
                      <button
                        onClick={() => handleDeleteSalary(salary.salary_id)}
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

export default SalaryManagement;