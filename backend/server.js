import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mysql from "mysql2/promise";
import crypto from "crypto";

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

async function startServer() {
  const db = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: 3306,
  });
  app.locals.db = db;
  console.log("Ansluten till MySQL!");
}

await startServer();

// Create user
app.post("/users", async (req, res) => {
  const { username, password } = req.body;
  const db = req.app.locals.db;

  try {
    const [userResult] = await db.execute(
      "INSERT INTO users (username, password) VALUES (?, ?)",
      [username, password]
    );
    const userId = userResult.insertId;

    await db.execute("INSERT INTO accounts (userId, amount) VALUES (?, 0)", [
      userId,
    ]);

    res.json({ message: "Användare skapad!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Kunde inte skapa användare" });
  }
});

// Log in and create session
app.post("/sessions", async (req, res) => {
  const { username, password } = req.body;
  const db = req.app.locals.db;

  try {
    const [users] = await db.execute(
      "SELECT id FROM users WHERE username = ? AND password = ?",
      [username, password]
    );
    if (users.length === 0)
      return res.status(401).json({ error: "Fel användarnamn eller lösenord" });

    const userId = users[0].id;
    const token = crypto.randomBytes(16).toString("hex");

    await db.execute("INSERT INTO sessions (userId, token) VALUES (?, ?)", [
      userId,
      token,
    ]);

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Fel vid inloggning" });
  }
});

app.post("/me/accounts", async (req, res) => {
  const { token } = req.body;
  const db = req.app.locals.db;

  try {
    const [sessions] = await db.execute(
      "SELECT userId FROM sessions WHERE token = ?",
      [token]
    );
    if (sessions.length === 0) {
      return res.status(401).json({ error: "Ogiltigt token" });
    }

    const userId = sessions[0].userId;
    const [accounts] = await db.execute(
      "SELECT amount FROM accounts WHERE userId = ?",
      [userId]
    );

    if (accounts.length === 0) {
      return res.status(404).json({ error: "Konto hittades inte" });
    }

    res.json({ amount: accounts[0].amount });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: "Kunde inte hämta saldo" });
  }
});

app.post("/me/accounts/transactions", async (req, res) => {
  const { token, amount } = req.body;
  const db = req.app.locals.db;

  try {
    const [sessions] = await db.execute(
      "SELECT userId FROM sessions WHERE token = ?",
      [token]
    );
    if (sessions.length === 0) {
      return res.status(401).json({ error: "Ogiltigt token" });
    }

    const userId = sessions[0].userId;

    if (!amount || isNaN(amount) || amount <= 0) {
      return res.status(400).json({ error: "Invalid deposit amount" });
    }

    await db.execute(
      "UPDATE accounts SET amount = amount + ? WHERE userId = ?",
      [amount, userId]
    );

    res.json({ message: "Pengar insatta" });
  } catch (err) {
    console.error("Deposit error:", err);
    res.status(500).json({ error: "Kunde inte sätta in pengar" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Bank backend is running at http://13.61.185.174:${port}`);
});
