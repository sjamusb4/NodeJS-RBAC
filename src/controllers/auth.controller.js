const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const sendError = (res, msg, code = 400) =>
  res.status(code).json({ error: msg });

async function handleRegister(req, res) {
  const { username, password, role } = req.body;

  if (!username || !password)
    return sendError(res, "Username and password required");

  if (password.length < 6) return sendError(res, "Password too short");

  const allowedRoles = ["user", , "manager", "admin"];
  if (role && !allowedRoles.includes(role))
    return sendError(res, "Invalid role");

  try {
    const exists = await User.findOne({ username });
    if (exists) return sendError(res, "Username already exists");

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      password: hashed,
      role,
    });

    res.status(201).json({
      message: "User registered successfully",
      id: user._id,
    });
  } catch (err) {
    sendError(res, err.message, 500);
  }
}

async function handleLogin(req, res) {
  const { username, password } = req.body;

  if (!username || !password)
    return sendError(res, "Username and password required");

  try {
    const user = await User.findOne({ username });

    const valid = await bcrypt.compare(password, user.password);

    if (!user || !valid) return sendError(res, "Invalid credentials");

    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        role: user.role,
      },
    });
  } catch (err) {
    sendError(res, err.message, 500);
  }
}

module.exports = {
  handleRegister,
  handleLogin,
};
