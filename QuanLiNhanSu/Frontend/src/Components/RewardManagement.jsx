import React, { useState, useEffect } from "react";
import axios from "axios";

const RewardManagement = () => {
  const [rewards, setRewards] = useState([]);
  const [formData, setFormData] = useState({
    employee_id: "",
    reward_type: "",
    description: "",
    reward_date: "",
    amount: "",
  });
  const [editingRewardId, setEditingRewardId] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchRewards();
  }, []);

  const fetchRewards = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/reward/rewards");
      setRewards(response.data);
    } catch (error) {
      setMessage("Lỗi khi tải danh sách khen thưởng.");
    }
  };

  const handleAddOrUpdateReward = async (e) => {
    e.preventDefault();
    try {
      if (editingRewardId) {
        await axios.put(`http://localhost:3000/api/reward/rewards/${editingRewardId}`, formData);
        setMessage("Cập nhật khen thưởng thành công!");
      } else {
        await axios.post("http://localhost:3000/api/reward/rewards", formData);
        setMessage("Thêm mới khen thưởng thành công!");
      }
      fetchRewards();
      resetForm();
    } catch (error) {
      setMessage("Lỗi khi xử lý khen thưởng.");
    }
  };

  const handleEditReward = (reward) => {
    setEditingRewardId(reward.reward_id);
    setFormData({
      employee_id: reward.employee_id,
      reward_type: reward.reward_type,
      description: reward.description,
      reward_date: reward.reward_date,
      amount: reward.amount,
    });
  };

  const handleDeleteReward = async (rewardId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa khen thưởng này?")) {
      try {
        await axios.delete(`http://localhost:3000/api/reward/rewards/${rewardId}`);
        setMessage("Xóa khen thưởng thành công!");
        fetchRewards();
      } catch (error) {
        setMessage("Lỗi khi xóa khen thưởng.");
      }
    }
  };

  const resetForm = () => {
    setEditingRewardId(null);
    setFormData({
      employee_id: "",
      reward_type: "",
      description: "",
      reward_date: "",
      amount: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-green-600 rounded-lg shadow-lg p-6 mb-8">
          <h1 className="text-3xl font-bold text-white">Quản lý nội dung Khen thưởng</h1>
          <p className="text-green-100 mt-2">Hệ thống quản lý thông tin khen thưởng nhân viên</p>
        </div>

        {/* Alert Message */}
        {message && (
          <div className="mb-6 p-4 rounded-lg bg-white border-l-4 border-green-600 shadow-md">
            <p className="text-gray-700">{message}</p>
          </div>
        )}

        {/* Form Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            {editingRewardId ? "Cập nhật khen thưởng" : "Thêm mới khen thưởng"}
          </h2>
          <form onSubmit={handleAddOrUpdateReward}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Mã nhân viên</label>
                <input
                  type="number"
                  value={formData.employee_id}
                  onChange={(e) => setFormData({ ...formData, employee_id: e.target.value })}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Loại khen thưởng</label>
                <input
                  type="text"
                  value={formData.reward_type}
                  onChange={(e) => setFormData({ ...formData, reward_type: e.target.value })}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Ngày khen thưởng</label>
                <input
                  type="date"
                  value={formData.reward_date}
                  onChange={(e) => setFormData({ ...formData, reward_date: e.target.value })}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Số tiền thưởng</label>
                <input
                  type="number"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                />
              </div>
              <div className="md:col-span-3 space-y-2">
                <label className="block text-sm font-medium text-gray-700">Mô tả</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  rows={3}
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-4">
              {editingRewardId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Hủy
                </button>
              )}
              <button
                type="submit"
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                {editingRewardId ? "Cập nhật" : "Thêm mới"}
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
                    Loại khen thưởng
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ngày
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Số tiền
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
                {rewards.map((reward) => (
                  <tr key={reward.reward_id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {reward.employee_id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {reward.reward_type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {reward.reward_date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Intl.NumberFormat("vi-VN").format(reward.amount)} đ
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">{reward.description || "Không có"}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleEditReward(reward)}
                        className="text-green-600 hover:text-green-900 mr-4"
                      >
                        Sửa
                      </button>
                      <button
                        onClick={() => handleDeleteReward(reward.reward_id)}
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

export default RewardManagement;
