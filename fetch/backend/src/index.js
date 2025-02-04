import express from "express";
import cors from "cors";

import {
   addItem,
   deleteItem,
   editItem,
   getItemById,
   getItems,
} from "./items.js";

import {
   addUser,
   deleteUser,
   editUser,
   getUserById,
   getUsers,
   login,
} from "./users.js";

const hostname = "127.0.0.1";
const app = express();
const port = 3000;

app.use(cors());

app.use("/", express.static("public"));
app.use(express.json());

app.get("/api/", (req, res) => {
   console.log("get-pyyntö apin juureen havaittu");
   console.log(req.url);
   res.send("Welcome to my REST API!");
});

app.get("/api/items", getItems);
app.get("/api/items/:id", getItemById);
app.post("/api/items", addItem);
app.put("/api/items/:id", editItem);
app.delete("/api/items/:id", deleteItem);

app.get("/api/users", getUsers);
app.get("/api/users/:id", getUserById);
app.post("/api/users", addUser);
app.put("/api/users/:id", editUser);
app.delete("/api/users/:id", deleteUser);
app.post("/api/users/login", login);

app.listen(port, hostname, () => {
   console.log(`Server running at http://${hostname}:${port}/`);
});
