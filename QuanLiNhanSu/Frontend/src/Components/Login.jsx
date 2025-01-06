import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Gửi yêu cầu đến API login
    fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.token) {
          alert('Đăng nhập thành công!');
          console.log('Token:', data.token);
          localStorage.setItem('token', data.token); // Lưu token vào localStorage
          navigate('/'); // Chuyển đến trang dashboard
        } else {
          alert(data.error || 'Đăng nhập thất bại.');
        }
      })
      .catch((error) => {
        console.error('Lỗi:', error);
        alert('Có lỗi xảy ra!');
      });
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Left side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md transform transition-all duration-300 hover:scale-[1.01]">
          <div className="bg-white p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                Welcome Back
              </h2>
              <p className="text-gray-600 mt-2">Please sign in to your account</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                  Tên đăng nhập
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-gray-100 focus:bg-white"
                    placeholder="Nhập tên đăng nhập"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Mật khẩu
                </label>
                <div className="relative">
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-gray-100 focus:bg-white"
                    placeholder="Nhập mật khẩu"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg font-medium
                          transform transition-all duration-200 hover:from-blue-700 hover:to-blue-800 
                          hover:shadow-lg hover:-translate-y-0.5 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Đăng nhập
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                {' '}
                <a href="/forgot-pass" className="text-blue-600 hover:text-blue-700 font-medium hover:underline">
                  Quên mật khẩu?
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Featured Image */}
      <div className="hidden lg:flex w-1/2 bg-blue-600 items-center justify-center p-8">
        <div className="relative w-full max-w-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/50 to-blue-700/50 rounded-2xl"></div>
          <img
            src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
            alt="Office workspace"
            className="w-full h-full object-cover rounded-2xl shadow-2xl"
          />
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <h3 className="text-2xl font-bold mb-2">HR Management System</h3>
            <p className="text-blue-100">Streamline your HR processes with our comprehensive management solution</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;