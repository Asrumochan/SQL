import express from "express";
import mysql2 from "mysql2";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";

const salt = 10;
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
    credentials: true,
  }),
);
app.use(cookieParser());

const db = mysql2.createConnection({
  host: "localhost",
  user: "root",
  password: "Asru12",
  database: "test",
});

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(500).json({ Error: "You are not authorized" });
  } else {
    jwt.verify(token, "jwt-secret-key", (err, decoded) => {
      if (err) {
        return res.status(500).json({ Error: "Token is not valid ! " });
      } else {
        req.name = decoded.name;
        next();
      }
    });
  }
};

app.get("/", verifyUser, (req, res) => {
  res.json({ Status: "Success", name: req.name });
});

app.get("/users", (req, res) => {
  const queryText = `SELECT id,name,email FROM login`;
  db.query(queryText, (err, data) => {
    if (err) return res.status(500).json("Error in user retrieval");

    return res.status(200).json(data);
  });
});

app.post("/signup", (req, res) => {
  const { name, email, password } = req.body;
  const queryText = `
    INSERT INTO login (name, email, password)
    VALUES (?, ?, ?)
  `;

  db.query(`SELECT * FROM login WHERE email = ?`, [email], (err, data) => {
    if (err) return res.json({ Error: "Error in connecting to users !" });
    if (data.length) {
      return res.json({
        success: false,
        message: "User already signed up , Please login !",
      });
    } else {
      bcrypt.hash(password.toString(), salt, (err, hash) => {
        if (err) return res.json({ Error: "Error in hashing the password" });

        db.query(queryText, [name, email, hash], (err, data) => {
          if (err) return res.status(500).json({ Error: "Error in signup" });
          return res.status(201).json({
            id: data.insertId,
            name,
            email,
            message: "User signed UP !",
          });
        });
      });
    }
  });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const queryText = `SELECT * FROM login WHERE email = ?`;

  db.query(queryText, [email], (err, data) => {
    if (err)
      return res.status(500).json({ Error: "Error collecting user info" });

    if (data.length > 0) {
      bcrypt.compare(password, data[0].password, (err, resp) => {
        if (err) return res.json({ Error: "Error in comparing the password" });
        if (resp) {
          const name = data[0].name;
          const token = jwt.sign({ name }, "jwt-secret-key", {
            expiresIn: "1d",
          });
          res.cookie("token", token);
          return res.status(200).json({
            success: true,
            message: "User Validated Successfully !",
          });
        } else {
          return res.json({
            success: false,
            message: "Password did not match",
          });
        }
      });
    } else {
      return res.json({
        success: false,
        message: "No user found",
      });
    }
  });
});

app.listen(3000, (req, res) => {
  console.log("Server is running on 3000");
});
