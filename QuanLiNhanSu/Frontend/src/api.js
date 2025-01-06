// api.js
const API_URL = "http://localhost:3000/api/employee"; // Thay đổi URL nếu cần

// Lấy danh sách nhân viên
export const getEmployees = async () => {
  try {
    const response = await fetch(`${API_URL}/employees`);
    if (response.ok) {
      return await response.json();
    }
    throw new Error("Không thể lấy danh sách nhân viên");
  } catch (error) {
    console.error(error);
    return { error: error.message };
  }
};

// Thêm nhân viên
export const addEmployee = async (employeeData) => {
  try {
    const response = await fetch(`${API_URL}/employees`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(employeeData),
    });
    if (response.ok) {
      return await response.json();
    }
    throw new Error("Không thể thêm nhân viên");
  } catch (error) {
    console.error(error);
    return { error: error.message };
  }
};

// Cập nhật thông tin nhân viên
export const updateEmployee = async (employee_id, employeeData) => {
  try {
    const response = await fetch(`${API_URL}/employees/${employee_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(employeeData),
    });
    if (response.ok) {
      return await response.json();
    }
    throw new Error("Không thể cập nhật thông tin nhân viên");
  } catch (error) {
    console.error(error);
    return { error: error.message };
  }
};

// Xóa nhân viên
export const deleteEmployee = async (employee_id) => {
  try {
    const response = await fetch(`${API_URL}/employees/${employee_id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      return await response.json();
    }
    throw new Error("Không thể xóa nhân viên");
  } catch (error) {
    console.error(error);
    return { error: error.message };
  }
};
