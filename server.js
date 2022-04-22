const express = require("express");
const path = require("path");
const app = express();
const routes = require("./router.js");
const bodyparser = require("body-parser");

// app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use("/assets", express.static(path.join(__dirname, "dist", "assets")));

routes.forEach((route) => {
  app.get(`${route}`, (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
  });
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  console.log(req.body);
  if (users[username]) {
    if (users[username].password === password) {
      res.sendStatus(200);
    }
    res.sendStatus(400);
  }
  res.sendStatus(400);
});

const PORT = process.env.PORT || 4000;
const server = app.listen(PORT, () => {
  console.log(`server listening on port: ${PORT}`);
});

app.post("/create", (req, res) => {
  console.log(req.body);
  const username = req.body.username;
  const password = req.body.password;
  const numOfUsers = Object.keys(users).length;
  const id = numOfUsers + 1;
  const newUser = new User(id, username, password, 0, 0, 100);
  const userList = Object.entries(users);
  if (users[username]) {
    return res.sendStatus(400);
  } else {
    users[username] = newUser;
    console.log(userList);

    return res.sendStatus(200);
  }
});

class User {
  constructor(id, username, password, wins, losses, currency) {
    (this.id = id),
      (this.username = username),
      (this.password = password),
      (this.wins = wins),
      (this.losses = losses),
      (this.currency = currency);
  }
}

const users = {};

const io = require("socket.io")(server);

io.on("connection", (socket) => {
  console.log(socket.id);
});
