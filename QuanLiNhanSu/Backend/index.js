import express from "express";
import connectDB from "./config/db.js";
import bodyParser from "body-parser";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import employeeRoutes from "./routes/employeeRoutes.js";
import departmentRoutes from "./routes/departmentRoutes.js";
import salaryRoutes from "./routes/salaryRoutes.js";
import accountRoute from "./routes/accountRoutes.js";
import rewardRoute from "./routes/rewardRoutes.js";
import disciplineRoute from "./routes/disciplineRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";  
import attendanceRoute from "./routes/attendanceRoute.js";
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/api/attendance", attendanceRoute);
app.use("/api/auth", authRoutes);
app.use("/api/employee", employeeRoutes);
app.use("/api/department", departmentRoutes);
app.use("/api/salary", salaryRoutes);
app.use("/api/account", accountRoute);
app.use("/api/reward", rewardRoute);
app.use("/api/discipline", disciplineRoute);
app.use("/api/report", reportRoutes);


connectDB.connect((err) => {
  if (err) {
    console.error("Kết nối MySQL thất bại:", err);
  } else {
    console.log("Kết nối MySQL thành công!");
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
