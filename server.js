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
      console.log(activeUsers);
      activeUsers[username] = users[username];
      console.log(activeUsers);

      return res.sendStatus(200);
    }
    return res.sendStatus(400);
  }
  return res.sendStatus(400);
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
  const newUser = new User(id, username, password, 0, 0, 100, []);
  const userList = Object.entries(users);
  if (users[username]) {
    return res.sendStatus(400);
  } else {
    users[username] = newUser;
    console.log(userList);
    console.log(users);

    return res.sendStatus(200);
  }
});

class User {
  constructor(id, username, password, wins, losses, currency, items) {
    (this.id = id),
      (this.username = username),
      (this.password = password),
      (this.wins = wins),
      (this.losses = losses),
      (this.currency = currency),
      (this.items = items);
  }
}

const users = {};
const activeUsers = {};

const c = 500;
const uc = 1000;
const r = 2500;
const i = 5000;
const store = {
  ch1: c,
  uch1: uc,
  uch2: uc,
  rh1: r,
  ih1: i,
  cp1: c,
  cp2: c,
  cp3: c,
  ucp1: uc,
  rp1: r,
  rp2: r,
  rp3: r,
  ip1: i,
};

const io = require("socket.io")(server);

io.on("connection", (socket) => {
  console.log(socket.id);
  const user = socket.handshake.query;

  socket.on("purchase", (itemID) => {
    if (!store[itemID]) return console.log("this item doesn't exist.");
    if (activeUsers[user].currency >= store[itemID]) {
      activeUsers[user].currency -= store[itemID];
      activeUsers[user].items.push(itemID);
      socket.emit("purchase-response", true);
    } else {
      socket.emit("purchase-response", false);
    }
  });
});
