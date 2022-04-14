const express = require("express");
const path = require("path");
const app = express();
const routes = require("./router.js");

app.use("/assets", express.static(path.join(__dirname, "dist", "assets")));

routes.forEach((route) => {
  app.get(`${route}`, (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
  });
});

const PORT = process.env.PORT || 4000;
const server = app.listen(PORT, () => {
  console.log(`server listening on port: ${PORT}`);
});

const io = require("socket.io")(server);

io.on("connection", (socket) => {
  console.log(socket.id);
});
