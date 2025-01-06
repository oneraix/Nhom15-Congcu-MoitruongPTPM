import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { KeyRound, ArrowLeft, Building2 } from "lucide-react";

const ForgotPassword = () => {
  const [username, setUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleUsernameSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/auth/forgot-password", { username });
      if (response.data.message) {
        setStep(2);
        setMessage("Username hợp lệ. Hãy tạo mật khẩu mới.");
      }
    } catch (error) {
      setMessage("Username không tồn tại trong hệ thống.");
    }
  };

  const handleNewPasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/auth/reset-password", { username, password: newPassword });
      if (response.data.message) {
        setMessage("Mật khẩu đã được cập nhật thành công!");
        setStep(1);
        setUsername("");
        setNewPassword("");
      }
    } catch (error) {
      setMessage("Đã có lỗi xảy ra. Vui lòng thử lại.");
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-blue-900/40 backdrop-blur-sm"></div>
      
      <div className="relative w-full max-w-md px-6 py-12">
        <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl p-8">
          <div className="flex items-center justify-center mb-8">
            <div className="bg-blue-600 p-3 rounded-2xl">
              <Building2 className="w-8 h-8 text-white" />
            </div>
          </div>
          
          <h1 className="text-2xl font-bold mb-2 text-center text-gray-800">
            {step === 1 ? "Khôi Phục Mật Khẩu" : "Tạo Mật Khẩu Mới"}
          </h1>
          <p className="text-center text-gray-600 mb-8">
            {step === 1 
              ? "Nhập username của bạn để tiếp tục" 
              : "Vui lòng nhập mật khẩu mới của bạn"
            }
          </p>

          <form onSubmit={step === 1 ? handleUsernameSubmit : handleNewPasswordSubmit}
                className="space-y-6">
            {step === 1 ? (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Username</label>
                <div className="relative">
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Nhập username của bạn"
                    className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-xl 
                             focus:ring-2 focus:ring-blue-600 focus:border-transparent
                             transition duration-200 placeholder:text-gray-400"
                    required
                  />
                  <KeyRound className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Mật khẩu mới</label>
                <div className="relative">
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Nhập mật khẩu mới"
                    className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-xl
                             focus:ring-2 focus:ring-blue-600 focus:border-transparent
                             transition duration-200 placeholder:text-gray-400"
                    required
                  />
                  <KeyRound className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700
                       transform hover:scale-[1.02] transition-all duration-200
                       font-medium text-sm focus:ring-4 focus:ring-blue-500/50"
            >
              {step === 1 ? "Tiếp tục" : "Cập nhật mật khẩu"}
            </button>
          </form>

          {message && (
            <div className="mt-4 p-3 rounded-lg bg-blue-50 border border-blue-200">
              <p className="text-sm text-center text-blue-800">{message}</p>
            </div>
          )}

          <button
            onClick={() => navigate("/login")}
            className="mt-6 w-full flex items-center justify-center gap-2 py-3 px-4
                     text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200
                     transition duration-200 text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Quay lại đăng nhập
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;