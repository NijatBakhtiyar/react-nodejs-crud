import cors from "cors";
import express from "express";
import mysql from "mysql";

const app = express();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "12344321",
  database: "crud",
  insecureAuth: true,
});

app.use(express.json());
app.use(cors());

//ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '12344321'
app.get("/", (req, res) => {
  res.json("Connected to backend!");
});

app.get("/books", (req, res) => {
  const q = "SELECT * FROM books";

  db.query(q, (err, data) => {
    if (err) {
      res.json(err);
    } else {
      res.json(data);
    }
  });
});

app.get("/books/:id", (req, res) => {
  const q = `SELECT * FROM books WHERE id = ?`;
  const bookId = req.params.id;

  db.query(q, [bookId], (err, data) => {
    if (err) {
      res.json(err);
    } else {
      res.json(data);
    }
  });
});

app.delete("/books/:id", (req, res) => {
  const q = `DELETE FROM books WHERE id = ?`;
  const bookId = req.params.id;

  db.query(q, [bookId], (err, data) => {
    if (err) {
      res.json(err);
    } else {
      res.json("Book has been deleted!");
    }
  });
});

app.put("/books/:id", (req, res) => {
  const q = `UPDATE books SET title = ?, description = ?, cover = ? WHERE id = ?`;
  const bookId = req.params.id;
  const { title, description, cover } = req.body;

  db.query(q, [title, description, cover, bookId], (err, data) => {
    if (err) {
      res.json(err);
    } else {
      res.json(data);
    }
  });
});

app.post("/books", (req, res) => {
  const q = "INSERT INTO books (title, description, cover) VALUES (?)";
  const values = [req.body.title, req.body.description, req.body.cover];

  db.query(q, [values], (err, data) => {
    if (err) {
      res.json(err);
    } else {
      res.json(data);
    }
  });
});

app.listen(8800, () => {
  console.log("Connected to backend!");
});
