import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import bodyparser from "body-parser";
import cors from "cors";
import { v4 as uuidv4 } from "uuid";
import { Server } from "socket.io";
import constants from "./constants.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(uuidv4());
const app = express();

const isProduction = process.env.NODE_ENV === "production";

app.use(bodyparser.json());
if (!isProduction) {
  app.use(cors());
}

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);
  if (users[username]) {
    if (users[username].password === password) {
      // if (users[username].status) return res.sendStatus(409);
      users[username].status = uuidv4();
      return res.sendStatus(200);
    }
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
    5000,
    { common_blue_pepe: "common_blue_pepe" },
    "common_blue_pepe",
    null
  );
  if (users[username]) {
    return res.sendStatus(400);
  } else {
    users[username] = newUser;
    return res.sendStatus(201);
  }
});

if (isProduction) {
  app.use("/assets", express.static(path.join(__dirname, "dist", "assets")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
  });
}

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
    items = {},
    avatar = "",
    status = null
  ) {
    (this.id = id),
      (this.username = username),
      (this.password = password),
      (this.currency = currency),
      (this.items = items),
      (this.avatar = avatar),
      (this.status = status);
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
  update(boundary1, boundary2) {
    if (this.keys["a"] && this.x > boundary1) this.x -= 5;
    if (this.keys["d"] && this.x + this.w < boundary2) this.x += 5;
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
    //....playerA table boundaries.....
    this.playerA.update(canvas.x, this.table.x);

    //....playerB table boundaries.....
    this.playerB.update(this.table.x + this.table.w, canvas.w);

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

//....Store prices.....
const common = 250;
const uncommon = 1000;
const rare = 2500;
const impossible = 5000;

const store = {
  common_blue_pepe: common,
  common_black_pepe: common,
  common_orange_pepe: common,
  common_purple_pepe: common,
  uncommon_black_hood_pepe: uncommon,
  uncommon_grey_hood_pepe: uncommon,
  uncommon_purple_hood_pepe: uncommon,
  uncommon_blue_hood_pepe: uncommon,
  rare_white_backpack_pepe: rare,
  rare_beige_backpack_pepe: rare,
  impossible_eye_patch_pepe: impossible,
};

const socketConfig = {};
if (!isProduction) {
  socketConfig.cors = { origin: "*" };
}
const io = new Server(server, socketConfig);

function purchaseItem(user, itemID, socket) {
  console.log("called");
  console.log(activeUsers[socket.id]);
  if (!store[itemID]) return console.log("this item doesn't exist.");
  if (user.items[itemID]) {
    return socket.emit("purchase-response", constants.purchaseResponses.OWNED);
  }
  if (user.currency >= store[itemID]) {
    user.currency -= store[itemID];
    user.items[itemID] = itemID;
    socket.emit("purchase-response", constants.purchaseResponses.SUCCESSFUL);
    const userAvatars = Object.values(user.items);
    socket.emit("my-items", userAvatars);
  } else {
    console.log("hit");
    return socket.emit(
      "purchase-response",
      constants.purchaseResponses.INSUFFICIENT_FUNDS
    );
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
    const userA = activeUsers[casualQueue[0]];
    const userB = activeUsers[casualQueue[1]];
    const playerA = new Player(userA.username, 0);
    const playerB = new Player(userB.username, canvas.w - 100);
    const casualMatch = new Match(playerA, playerB, null);
    matches[matchKey] = casualMatch;
    io.to(`${casualQueue[0]}`).emit("joined-match", [
      matchKey,
      userB.avatar,
      "playerA",
    ]);
    io.to(`${casualQueue[0]}`).emit("match-start", true);
    io.to(`${casualQueue[1]}`).emit("joined-match", [
      matchKey,
      userA.avatar,
      "playerB",
    ]);
    io.to(`${casualQueue[1]}`).emit("match-start", true);
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
    io.to(`${wagerQueue[0]}`).emit("match-start", true);
    io.to(`${wagerQueue[1]}`).emit("joined-match", [
      matchKey,
      userA.avatar,
      "playerB",
    ]);
    io.to(`${wagerQueue[1]}`).emit("match-start", true);
    wagerQueue.splice(0, 2);
  }
}

io.on("connection", (socket) => {
  console.log(socket.id);
  const { username } = socket.handshake.query;
  if (users[username]) {
    console.log(users[username]);
    users[username].status = true;
  }
  activeUsers[socket.id] = users[username];
  const user = activeUsers[socket.id];

  if (user) {
    console.log(user.items);
    const userAvatars = Object.values(user.items);
    socket.emit("avatar", [user.avatar, userAvatars]);
  }

  socket.on("purchase", (itemID) => {
    purchaseItem(user, itemID, socket);
  });

  socket.on("change-avatar", (itemID) => {
    if (user.items[itemID]) {
      user.avatar = itemID;
      socket.emit("set-new-avatar", user.avatar);
    }
  });

  socket.on("join-queue", (matchType) => {
    joinQueue(socket, matchType);
    if (casualQueue.length > 1 || wagerQueue.length > 1) {
      startMatch(matchType);
    }
  });

  //.....match inputs.....
  socket.on("keydown", (data) => {
    const [key, matchKey, playerType] = data;
    matches[matchKey][playerType].keys[key] = true;
  });
  socket.on("keyup", (data) => {
    const [key, matchKey, playerType] = data;
    delete matches[matchKey][playerType].keys[key];
  });
  socket.on("click", (data) => {
    const [x, y, matchKey, playerType] = data;
  });
  socket.on("disconnect", () => {
    console.log(users);
    users[username].status = false;
  });
});

setInterval(() => {
  const matchKeys = Object.keys(matches);
  matchKeys.forEach((match) => {
    matches[match].update();
    io.emit(`${match}`, matches[match]);
  });
}, 30);
