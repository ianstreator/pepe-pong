const express = require("express");
const path = require("path");
const app = express();
const routes = require("./router.js");
const bodyparser = require("body-parser");
const { match } = require("assert");

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
    3000,
    [],
    "common_blue_pepe"
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
  constructor(
    id = 0,
    username = "",
    password = "",
    currency = 0,
    items = [],
    avatar = ""
  ) {
    (this.id = id),
      (this.username = username),
      (this.password = password),
      (this.currency = currency),
      (this.items = items),
      (this.avatar = avatar);
  }
}
const canvas = {
  x: 0,
  y: 0,
  w: 800,
  h: 500,
};
class Player {
  constructor(name, x) {
    (this.name = name),
      (this.x = x),
      (this.y = canvas.h - 140),
      (this.w = 100),
      (this.h = 140),
      (this.tolerance = 240),
      (this.score = 0),
      (this.keys = {});
  }
  update() {
    if (keys["a"]) this.x -= 4;
    if (keys["d"]) this.x += 4;
  }
}
class Match {
  constructor(playerA, playerB, wager) {
    (this.playerA = playerA),
      (this.playerB = playerB),
      (this.wager = wager),
      (this.ball = {
        x: 100,
        y: 100,
        r: 4,
        color: "white",
        velocity: { x: 9, y: 2 },
        lastPlayer: null,
        opacity: 1,
        grow: 1,
        ping: false,
        badPing: false,
        pingColor: "",
      }),
      (this.table = {
        x: canvas.w / 2 - 160,
        y: canvas.h - 30,
        w: 320,
        h: 30,
      }),
      (this.state = "started");
  }
  update() {
    //.....wall boundaries.....
    if (this.ball.x + this.ball.r > canvas.w || this.ball.x - this.ball.r < 0)
      this.ball.velocity.x = -this.ball.velocity.x;
    if (this.ball.y + this.ball.r > canvas.h || this.ball.y - this.ball.r < 0)
      this.ball.velocity.y = -this.ball.velocity.y;
    //.....ball movement...
    this.ball.x += this.ball.velocity.x;
    this.ball.y += this.ball.velocity.y;
    this.ball.velocity.y += 1;
    this.ball.velocity.x < 0
      ? (this.ball.velocity.x += 0.5)
      : (this.ball.velocity.x -= 0.5);
    this.ball.velocity.y < 0
      ? (this.ball.velocity.y += 0.25)
      : (this.ball.velocity.y -= 0.25);

    //.....table boundaries....
    if (
      this.ball.x + this.ball.r > this.table.x &&
      this.ball.x - this.ball.r < this.table.x + this.table.w
    ) {
      if (
        this.ball.y + this.ball.r > canvas.h - this.table.h + 3 &&
        this.ball.y + this.ball.r < canvas.h - this.table.h + 6
      ) {
        this.ball.velocity.y = -this.ball.velocity.y;
        this.ping = true;
      }
      if (this.ball.y > canvas.h - this.table.h) {
        this.ball.velocity.x = -this.ball.velocity.x;
        this.badPing = true;
      }
    }

    if (this.ping) this.pong(), (this.ball.pingColor = "72, 129, 62,");
    if (this.badPing) this.pong(), (this.ball.pingColor = "129, 62, 62,");

    if (this.state === "serve") {
      this.x = paddle.x + paddle.width;
      this.y = paddle.y + paddle.height / 2;
    }
    // if (keys[" "] && this.state === "serve") {
    //   this.state = "served";
    //   this.velocity.x = 0;
    //   this.velocity.y = -2.5;
    //   console.log(this.velocity);
    // }
  }
  pong() {
    this.grow += 0.2;
    this.opacity = 1 - this.grow * 0.06;
    if (this.opacity < 0) {
      this.grow = 1;
      this.opacity = 1;
      this.ping = false;
      this.badPing = false;
    }
  }
}

const users = {};
const activeUsers = {};

const casualQueue = [];
const wagerQueue = [];
const matches = {};

const c = 250;
const uc = 1000;
const r = 2500;
const i = 5000;

const store = {
  common_blue_pepe: c,
  common_black_pepe: c,
  common_orange_pepe: c,
  common_purple_pepe: c,
  uncommon_black_hood_pepe: uc,
  uncommon_grey_hood_pepe: uc,
  uncommon_purple_hood_pepe: uc,
  uncommon_blue_hood_pepe: uc,
};

const io = require("socket.io")(server);

function purchaseItem(socket, itemID) {
  if (!store[itemID]) return console.log("this item doesn't exist.");
  if (activeUsers[socket.id].items.some((e) => e === itemID)) {
    return socket.emit("purchase-response", [1, "you already own this item."]);
  }
  if (activeUsers[socket.id].currency >= store[itemID]) {
    console.log(activeUsers[socket.id].currency);
    activeUsers[socket.id].currency -= store[itemID];
    console.log(activeUsers[socket.id].currency);
    activeUsers[socket.id].items.push(itemID);
    socket.emit("purchase-response", [2, "Purchase successful!"]);
  } else {
    socket.emit("purchase-response", [3, "Not enough funds.."]);
  }
}

function joinQueue(socket, matchType) {
  matchType === "casual"
    ? casualQueue.push(socket.id)
    : wagerQueue.push(socket.id);
}

function startMatch(matchType) {
  const matchKey = `${Object.keys(matches).length}`;

  if (matchType === "casual") {
    const userA = activeUsers[casualQueue[0]].username;
    const userB = activeUsers[casualQueue[1]].username;
    const playerA = new Player(userA, 0);
    const playerB = new Player(userB, canvas.w - 100);
    const casualMatch = new Match(playerA, playerB, null);
    matches[matchKey] = casualMatch;
    io.to(`${casualQueue[0]}`).emit("joined-match", [
      matchKey,
      userB.avatar,
      "playerA",
    ]);
    io.to(`${casualQueue[1]}`).emit("joined-match", [
      matchKey,
      userA.avatar,
      "playerB",
    ]);
    casualQueue.splice(0, 2);
  } else {
    const userA = activeUsers[wagerQueue[0]];
    const userB = activeUsers[wagerQueue[1]];
    const playerA = new Player(userA.username, 0);
    const playerB = new Player(userB.username, canvas.w - 100);
    const wager =
      userA.currency < userB.currency ? userA.currency : userB.currency;
    console.log(wager, userA.currency, userB.currency);
    const wagerMatch = new Match(playerA, playerB, wager / 2);
    matches[matchKey] = wagerMatch;
    io.to(`${wagerQueue[0]}`).emit("joined-match", [
      matchKey,
      userB.avatar,
      "playerA",
    ]);
    io.to(`${wagerQueue[1]}`).emit("joined-match", [
      matchKey,
      userA.avatar,
      "playerB",
    ]);
    wagerQueue.splice(0, 2);
  }
}

io.on("connection", (socket) => {
  console.log(socket.id);
  const { username } = socket.handshake.query;
  activeUsers[socket.id] = users[username];
  if (users[username]) {
    socket.emit("avatar", users[username].avatar);
  }

  socket.on("purchase", (itemID) => {
    purchaseItem(socket, itemID);
  });

  socket.on("join-queue", (matchType) => {
    joinQueue(socket, matchType);
    if (casualQueue.length > 1 || wagerQueue.length > 1) {
      startMatch(matchType);
      socket.emit("match-start", true);
    }
  });

  socket.on("keydown", (data) => {
    const [key, matchKey, playerType] = data;
    console.log(matches);
    console.log(matchKey);
    console.log(playerType);
    console.log(matches[matchKey[playerType]]);
    matches[matchKey][playerType].keys[key] = true;
  });
  socket.on("keyup", (data) => {
    const [key, matchKey, playerType] = data;

    delete matches[matchKey][playerType].keys[key];
  });
  socket.on("click", (data) => {
    const [x, y, matchKey, playerType] = data;
  });
});

setInterval(() => {
  const matchKeys = Object.keys(matches);
  matchKeys.forEach((match) => {
    matches[match].update();
    io.emit(`${match}`, matches[match]);
  });
}, 15);
