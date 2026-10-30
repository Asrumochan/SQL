import express, { json } from "express";
import mysql2 from "mysql2";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql2.createConnection({
  host: "localhost",
  user: "root",
  password: "Asru12",
  database: "test",
});

app.get("/", (req, res) => {
  res.json("hello this is backend !");
});

app.get("/books", (req, res) => {
  const queryText = "SELECT * FROM books";
  db.query(queryText, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/book:id", (req, res) => {
  const id = req.params.id;
  const queryText = "SELECT * FROM books WHERE id=?";
  db.query(queryText, [id], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/book", (req, res) => {
  const { title, description, cover, price } = req.body;
  const queryText = `
    INSERT INTO books (title, description, cover, price)
    VALUES (?, ?, ?,?)
  `;
  db.query(queryText, [title, description, cover, price], (err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    return res.status(201).json({
      id: data.insertId,
      title,
      description,
      cover,
      price,
      message: "Book has been created",
    });
  });
});

app.delete("/books:id", (req, res) => {
  const id = req.params.id;
  const queryText = "DELETE FROM books WHERE id = ?";

  db.query(queryText, [id], (err, data) => {
    if (err) return res.status(500).json({ message: err.message });
    return res.status(200).json("Record deleted Successfully !");
  });
});

app.put("/books:id", (req, res) => {
  const { title, description, cover, price } = req.body;
  console.log(req.body)
  const id = req.params.id;
  const queryText =
    "UPDATE books SET title=? , description=? ,cover=? , price=?  WHERE id=?";

  db.query(queryText, [title, description, cover, price, id], (err, data) => {
    if (err) return res.status(500).json({ message: err.message });
    return res.status(200).json("Record updated Successfully !");
  });
});

app.listen(3000, () => {
  console.log("Server is running on 3000");
});
