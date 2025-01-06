import React, { useState } from 'react';
import axios from 'axios';
import { Search, Users } from 'lucide-react';

const SearchEmployees = () => {
  const [searchField, setSearchField] = useState('');
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  // Keep all the existing apiEndpoints and search functions unchanged
  const apiEndpoints = {
    id: 'http://localhost:3000/api/employee/search-by-id',
    name: 'http://localhost:3000/api/employee/search-by-name',
    gender: 'http://localhost:3000/api/employee/search-by-gender',
    dob: 'http://localhost:3000/api/employee/search-by-dob',
    email: 'http://localhost:3000/api/employee/search-by-email',
    phone: 'http://localhost:3000/api/employee/search-by-phone',
  };

  // Keep all the existing search functions and handleSearch unchanged
  const searchById = async (query) => {
    try {
      const response = await axios.post(apiEndpoints.id, { employee_id: query });
      setResults(response.data);
    } catch (error) {
      console.error('Lỗi khi tìm kiếm theo ID:', error);
      alert('Đã xảy ra lỗi khi tìm kiếm theo ID!');
    }
  };

  const searchByName = async (query) => {
    try {
      const response = await axios.post(apiEndpoints.name, { full_name: query });
      setResults(response.data);
    } catch (error) {
      console.error('Lỗi khi tìm kiếm theo tên:', error);
      alert('Đã xảy ra lỗi khi tìm kiếm theo tên!');
    }
  };

  const searchByGender = async (query) => {
    try {
      const response = await axios.post(apiEndpoints.gender, { gender: query });
      setResults(response.data);
    } catch (error) {
      console.error('Lỗi khi tìm kiếm nhân viên theo giới tính:', error);
      alert('Đã xảy ra lỗi khi tìm kiếm theo giới tính!');
    }
  };

  const searchByDob = async (query) => {
    try {
      const response = await axios.post(apiEndpoints.dob, { date_of_birth: query });
      setResults(response.data);
    } catch (error) {
      console.error('Lỗi khi tìm kiếm theo ngày sinh:', error);
      alert('Đã xảy ra lỗi khi tìm kiếm theo ngày sinh!');
    }
  };

  const searchByEmail = async (query) => {
    try {
      const response = await axios.post(apiEndpoints.email, { email: query });
      setResults(response.data);
    } catch (error) {
      console.error('Lỗi khi tìm kiếm theo email:', error);
      alert('Đã xảy ra lỗi khi tìm kiếm theo email!');
    }
  };

  const searchByPhone = async (query) => {
    try {
      const response = await axios.post(apiEndpoints.phone, { phone_number: query });
      setResults(response.data);
    } catch (error) {
      console.error('Lỗi khi tìm kiếm theo số điện thoại:', error);
      alert('Đã xảy ra lỗi khi tìm kiếm theo số điện thoại!');
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchField || !query) {
      alert('Vui lòng chọn trường tìm kiếm và nhập từ khóa!');
      return;
    }

    if (searchField === 'id') searchById(query);
    else if (searchField === 'name') searchByName(query);
    else if (searchField === 'gender') searchByGender(query);
    else if (searchField === 'dob') searchByDob(query);
    else if (searchField === 'email') searchByEmail(query);
    else if (searchField === 'phone') searchByPhone(query);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 px-6 py-4 flex items-center gap-3">
          <Users className="w-6 h-6 text-white" />
          <h1 className="text-xl font-semibold text-white">Tìm kiếm thông tin nhân viên</h1>
        </div>

        <div className="p-6">
          {/* Search Form */}
          <form onSubmit={handleSearch} className="space-y-4 mb-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Chọn trường tìm kiếm:</label>
                <select
                  value={searchField}
                  onChange={(e) => setSearchField(e.target.value)}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="">-- Chọn trường --</option>
                  <option value="id">Mã nhân viên</option>
                  <option value="name">Họ và tên</option>
                  <option value="gender">Giới tính</option>
                  <option value="dob">Ngày sinh</option>
                  <option value="email">Email</option>
                  <option value="phone">Số điện thoại</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Từ khóa tìm kiếm:</label>
                <div className="relative">
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 pl-10"
                    placeholder="Nhập từ khóa..."
                  />
                  <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 inline-flex items-center gap-2"
              >
                <Search className="w-4 h-4" />
                Tìm kiếm
              </button>
            </div>
          </form>

          {/* Results */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Kết quả tìm kiếm</h2>
            
            {results.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-blue-50">
                      <th className="px-4 py-3 text-left text-sm font-semibold text-blue-900">Mã NV</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-blue-900">Họ và tên</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-blue-900">Giới tính</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-blue-900">Ngày sinh</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-blue-900">Email</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-blue-900">Số điện thoại</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {results.map((employee) => (
                      <tr key={employee.employee_id} className="hover:bg-blue-50/50">
                        <td className="px-4 py-3 text-sm text-gray-900">{employee.employee_id}</td>
                        <td className="px-4 py-3 text-sm text-gray-900 font-medium">{employee.full_name}</td>
                        <td className="px-4 py-3 text-sm text-gray-900">{employee.gender}</td>
                        <td className="px-4 py-3 text-sm text-gray-900">{employee.date_of_birth}</td>
                        <td className="px-4 py-3 text-sm text-gray-900">{employee.email}</td>
                        <td className="px-4 py-3 text-sm text-gray-900">{employee.phone_number}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Users className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                <p>Không có kết quả nào được tìm thấy.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchEmployees;