import React, { useState, useEffect } from "react";
import axios from "axios";

const AccountManagement = () => {
  const [accounts, setAccounts] = useState([]);
  const [formData, setFormData] = useState({
    username: "",
    role_id: "",
    fullname: "",
    status: "Active",
  });
  const [editingAccountId, setEditingAccountId] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/account/accounts");
      setAccounts(response.data);
    } catch (error) {
      setMessage("Lỗi khi tải danh sách tài khoản.");
    }
  };

  const handleAddOrUpdateAccount = async (e) => {
    e.preventDefault();
    try {
      if (editingAccountId) {
        await axios.put(`http://localhost:3000/api/account/accounts/${editingAccountId}`, formData);
        setMessage("Cập nhật tài khoản thành công!");
      } else {
        await axios.post("http://localhost:3000/api/account/accounts", formData);
        setMessage("Tạo tài khoản mới thành công!");
      }
      fetchAccounts();
      resetForm();
    } catch (error) {
      setMessage("Lỗi khi xử lý tài khoản.");
    }
  };

  const handleEditAccount = (account) => {
    setEditingAccountId(account.account_id);
    setFormData({
      username: account.username,
      role_id: account.role_id,
      fullname: account.fullname,
      status: account.status,
    });
  };

  const handleDeleteAccount = async (accountId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa tài khoản này?")) {
      try {
        await axios.delete(`http://localhost:3000/api/account/accounts/${accountId}`);
        setMessage("Xóa tài khoản thành công!");
        fetchAccounts();
      } catch (error) {
        setMessage("Lỗi khi xóa tài khoản.");
      }
    }
  };

  const resetForm = () => {
    setEditingAccountId(null);
    setFormData({
      username: "",
      role_id: "",
      fullname: "",
      status: "Active",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-blue-600 rounded-lg shadow-lg p-6 mb-8">
          <h1 className="text-3xl font-bold text-white">Quản lý Tài khoản</h1>
          <p className="text-blue-100 mt-2">Hệ thống quản lý tài khoản người dùng</p>
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
            {editingAccountId ? "Cập nhật tài khoản" : "Thêm tài khoản mới"}
          </h2>
          <form onSubmit={handleAddOrUpdateAccount}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Tên đăng nhập</label>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Tên đầy đủ</label>
                <input
                  type="text"
                  value={formData.fullname}
                  onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Vai trò</label>
                <input
                  type="number"
                  value={formData.role_id}
                  onChange={(e) => setFormData({ ...formData, role_id: e.target.value })}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Trạng thái</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Suspended">Suspended</option>
                </select>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-4">
              {editingAccountId && (
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
                {editingAccountId ? "Cập nhật" : "Thêm mới"}
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
                    Mã TK
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tên đăng nhập
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tên đầy đủ
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Vai trò
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Trạng thái
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {accounts.map((account) => (
                  <tr key={account.account_id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {account.account_id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {account.username}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {account.fullname}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {account.role_id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {account.status}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleEditAccount(account)}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        Sửa
                      </button>
                      <button
                        onClick={() => handleDeleteAccount(account.account_id)}
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

export default AccountManagement;
