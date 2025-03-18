import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

// Generate one-time password
function generateOTP() {
  // Generate a six-digit numeric OTP
  const otp = Math.floor(100000 + Math.random() * 900000);
  return otp.toString();
}

// Arrays:
const users = [];
const accounts = [];
const sessions = [];

// Routes:

// Create user
app.post("/users", (req, res) => {
  const { username, password } = req.body;
  const userId = users.length + 101;

  users.push({ id: userId, username, password });
  accounts.push({ id: accounts.length + 1, userId, amount: 0 });

  res.json({ message: "User created", userId });
});

// Log in and create session
app.post("/sessions", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user)
    return res.status(401).json({ error: "Incorrect username or password" });

  const token = generateOTP();
  sessions.push({ userId: user.id, token });
  res.json({ token, userId: user.id });
});

// Get balance
app.post("/me/accounts", (req, res) => {
  const { token } = req.body;
  const session = sessions.find((s) => s.token === token);

  if (!session) return res.status(403).json({ error: "Invalid token" });
  const account = accounts.find((a) => a.userId === session.userId);
  res.json({ balance: account.amount });
});

// Deposit money
app.post("/me/accounts/transactions", (req, res) => {
  const { token, amount } = req.body;
  const session = sessions.find((s) => s.token === token);

  if (!session) return res.status(403).json({ error: "Invalid token" });

  const account = accounts.find((a) => a.userId === session.userId);
  account.amount += amount;

  res.json({ message: "Deposit successful", newBalance: account.amount });
});

// Start the server
app.listen(port, () => {
  console.log(`Bank backend is running at http://localhost:${port}`);
});
