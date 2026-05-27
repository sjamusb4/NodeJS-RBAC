const express = require("express");
require("dotenv").config();
const connectDB = require("./config/connectDB");
const authRouter = require("./routes/auth.route");
const userRouter = require("./routes/user.routes");
const authMiddleware = require("./middlewares/auth.middleware");
const app = express();
const PORT = process.env.PORT || 3001;

connectDB();

// Middlewares
app.use(express.json());

// Routes
app.use("/api/auth", authRouter);
app.use("/api/users", authMiddleware, userRouter);

// Start Server
app.listen(PORT, () => {
  console.log("Server is running on PORT:", PORT);
});
