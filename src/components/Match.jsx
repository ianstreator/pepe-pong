import images from "../images/export.js";
import "./components.css";

import { useContext, useEffect, useRef, useState } from "react";

import SocketContext from "../context/socketContext";

function Match() {
  const { socket, matchKey } = useContext(SocketContext);
  if (!socket) window.location.href = "/";
  const [score, setScore] = useState([0, 0]);
  const [time, setTime] = useState(null);

  const avatarA = document.createElement("img");
  const avatarB = document.createElement("img");
  let events = false;

  useEffect(() => {
    const canvas = document.querySelector("canvas");
    const c = canvas.getContext("2d");

    if (!events) {
      window.addEventListener("keydown", (e) => {
        socket.emit("keydown", e.key);
      });
      window.addEventListener("keyup", (e) => {
        socket.emit("keyup", e.key);
      });
      canvas.addEventListener("click", (e) => {
        const x = e.clientX - canvas.getBoundingClientRect().x;
        const y = e.clientY - canvas.getBoundingClientRect().y;
        socket.emit("click", [x, y]);
      });
      events = true;
    }

    socket.on(`${matchKey}`, (matchData) => {
      const { playerA, playerB, ball, table } = matchData;
      if (!avatarA.src) {
        console.log("setting");
        console.log(avatarA, avatarB);

        avatarA.src = images.items[playerA.img]
        avatarB.src = images.items[playerB.img]

        console.log(avatarA, avatarB);
      }

      c.clearRect(0, 0, 600, 400);
      c.fillStyle = "white";

      // c.translate(width, 0);
      // c.scale(-1, 1);
      // c.drawImage(image, 0, 0);
      c.drawImage(avatarA, playerA.x, playerA.y, playerA.w, playerA.h);
      c.drawImage(avatarB, playerB.x, playerB.y, playerB.w, playerB.h);
    });
    socket.on("game over", () => {
      window.removeEventListener("keydown");
      window.removeEventListener("keyup");
      canvas.removeEventListener("click");
    });
  }, [socket]);

  return (
    <div className="Match">
      <h1>Match</h1>
      <canvas className="canvas" width={600} height={400}></canvas>
    </div>
  );
}

export default Match;
