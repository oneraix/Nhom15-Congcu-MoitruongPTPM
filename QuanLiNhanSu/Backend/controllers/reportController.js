import db from "../config/db.js";

export const getStatistics = async (req, res) => {
  try {
    const stats = {};

    // 1. Số lượng nhân viên
    db.query("SELECT COUNT(*) AS count FROM employees", (err, results) => {
      if (err) {
        console.error("Lỗi khi đếm số lượng nhân viên:", err);
        return res.status(500).json({ error: "Lỗi khi lấy thống kê nhân viên." });
      }
      stats.totalEmployees = results[0].count;

      // 2. Số lượng tài khoản
      db.query("SELECT COUNT(*) AS count FROM accounts", (err, results) => {
        if (err) {
          console.error("Lỗi khi đếm số lượng tài khoản:", err);
          return res.status(500).json({ error: "Lỗi khi lấy thống kê tài khoản." });
        }
        stats.totalAccounts = results[0].count;

        // 3. Tổng tiền thưởng
        db.query("SELECT SUM(amount) AS total FROM rewards", (err, results) => {
          if (err) {
            console.error("Lỗi khi tính tổng tiền thưởng:", err);
            return res.status(500).json({ error: "Lỗi khi lấy thống kê tiền thưởng." });
          }
          stats.totalRewards = results[0].total || 0;

          // 4. Tổng tiền phạt
          db.query("SELECT SUM(penalty) AS total FROM disciplines", (err, results) => {
            if (err) {
              console.error("Lỗi khi tính tổng tiền phạt:", err);
              return res.status(500).json({ error: "Lỗi khi lấy thống kê tiền phạt." });
            }
            stats.totalPenalties = results[0].total || 0;

            // 5. Phân bổ nhân viên theo phòng ban
            db.query(
              `
              SELECT d.department_name, COUNT(e.employee_id) AS employee_count
              FROM departments d
              LEFT JOIN employees e ON e.department_id = d.department_id
              GROUP BY d.department_name
              `,
              (err, results) => {
                if (err) {
                  console.error("Lỗi khi lấy phân bổ nhân viên theo phòng ban:", err);
                  return res.status(500).json({ error: "Lỗi khi lấy thống kê phòng ban." });
                }
                stats.departmentDistribution = results;

                // Trả về kết quả cuối cùng
                res.status(200).json(stats);
              }
            );
          });
        });
      });
    });
  } catch (error) {
    console.error("Lỗi khi lấy thống kê:", error);
    res.status(500).json({ error: "Lỗi khi lấy thống kê." });
  }
};
