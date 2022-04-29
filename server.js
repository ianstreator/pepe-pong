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
  const { username, password } = req.body;
  console.log(username, password);
  if (users[username]) {
    if (users[username].password === password) {
      // activeUsers[username] = users[username];
      return res.sendStatus(200);
    }
    return res.sendStatus(400);
  }
  return res.sendStatus(400);
});

app.post("/create", (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);
  const numOfUsers = Object.keys(users).length;
  const id = numOfUsers + 1;
  const newUser = new User(
    id,
    username,
    password,
    100,
    [],
    "uncommon_black_hood_pepe"
  );
  if (users[username]) {
    return res.sendStatus(400);
  } else {
    users[username] = newUser;
    return res.sendStatus(200);
  }
});

const PORT = process.env.PORT || 4000;
const server = app.listen(PORT, () => {
  console.log(`server listening on port: ${PORT}`);
});

class User {
  constructor(id, username, password, currency, items, avatar, matches) {
    (this.id = id),
      (this.username = username),
      (this.password = password),
      (this.currency = currency),
      (this.items = items),
      (this.avatar = avatar),
      (this.matches = {
        casual: {
          wins: 0,
          losses: 0,
        },
        wager: {
          wins: 0,
          losses: 0,
        },
      });
  }
}
class Match {
  constructor(playerA, playerB, ball, time, state, matchKey, type) {
    (this.playerA = playerA),
      (this.playerB = playerB),
      (this.ball = ball),
      (this.time = time),
      (this.state = state),
      (this.matchKey = matchKey),
      (this.type = type);
  }
  canvasData() {}
}

const users = {};
const activeUsers = {};

const casualQueue = [];
const wagerQueue = [];
const matches = [];

const c = 250;
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
  const { username } = socket.handshake.query;
  activeUsers[socket.id] = users[username];
  if (users[username]) {
    socket.emit("avatar", users[username].avatar);
  }

  socket.on("purchase", (itemID) => {
    if (!store[itemID]) return console.log("this item doesn't exist.");
    if (activeUsers[username].currency >= store[itemID]) {
      activeUsers[username].currency -= store[itemID];
      activeUsers[username].items.push(itemID);
      socket.emit("purchase-response", true);
    } else {
      socket.emit("purchase-response", false);
    }
  });

  socket.on("join-queue", (matchType) => {
    console.log(matchType);
    matchType === "casual"
      ? casualQueue.push(activeUsers[socket.id])
      : wagerQueue.push(activeUsers[socket.id]);
    console.log(wagerQueue, casualQueue);
    if (casualQueue.length > 1) {
      const match = new Match(
        {
          name: casualQueue[0].username,
          x: 0,
          y: 250,
          w: 100,
          h: 150,
          img: casualQueue[0].avatar,
          points: 0,
          earnings: 0,
        },
        {
          name: casualQueue[1].username,
          x: 500,
          y: 250,
          w: 100,
          h: 150,
          img: casualQueue[1].avatar,
          points: 0,
          earnings: 0,
        },
        { x: 100, y: 100, r: 4, velocity: { x: 2, y: -2 } },
        minutes(3),
        "started",
        casualQueue[0].id + casualQueue[1].id,
        "casual"
      );
      matches.push(match);
      io.emit("joined-match", match.matchKey);
      casualQueue.splice(0, 2);
    }
  });
});

function minutes(t) {
  return t * 60000;
}
setInterval(() => {
  matches.forEach((match) => {
    io.emit(`${match.matchKey}`, match);
    console.log(match);
  });
}, 500);
