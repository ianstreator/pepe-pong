import images from "../images/export.js";
import "./components.css";

import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import SocketContext from "../context/socketContext";

function Match() {
  const { socket, matchKey, avatar, oppAvatar, playerType } =
    useContext(SocketContext);
  if (!socket) window.location.href = "/";
  const [score, setScore] = useState([0, 0]);
  const [time, setTime] = useState(null);
  const avatarA = document.createElement("img");
  const avatarB = document.createElement("img");
  if (playerType === "playerA") {
    avatarA.src = `${images.items[avatar]}`;
    avatarB.src = `${images.items[oppAvatar]}`;
  } else {
    avatarB.src = `${images.items[avatar]}`;
    avatarA.src = `${images.items[oppAvatar]}`;
  }

  const background = document.createElement("img");
  background.src = images.background;

  const navigate = useNavigate();
  function mirrorImage(
    ctx,
    image,
    x = 0,
    y = 0,
    horizontal = false,
    vertical = false
  ) {
    ctx.save(); // save the current canvas state
    ctx.setTransform(
      horizontal ? -1 : 1,
      0, // set the direction of x axis
      0,
      vertical ? -1 : 1, // set the direction of y axis
      x + (horizontal ? image.width : 0), // set the x origin
      y + (vertical ? image.height : 0) // set the y origin
    );
    ctx.drawImage(image, 0, 0, 100, 140);
    ctx.restore(); // restore the state as it was when this function was called
  }

  useEffect(() => {
    const canvas = document.querySelector("canvas");
    const c = canvas.getContext("2d");

    socket.on("match-start", () => {
      window.addEventListener("keydown", (e) => {
        socket.emit("keydown", [e.key, matchKey, playerType]);
      });
      window.addEventListener("keyup", (e) => {
        socket.emit("keyup", [e.key, matchKey, playerType]);
      });
      canvas.addEventListener("click", (e) => {
        const x = e.clientX - canvas.getBoundingClientRect().x;
        const y = e.clientY - canvas.getBoundingClientRect().y;
        socket.emit("click", [x, y, matchKey, playerType]);
      });
    });

    socket.on(`${matchKey}`, (matchData) => {
      const { playerA, playerB, ball, wager } = matchData;
      if (matchData.state === "finished") {
        window.removeEventListener("keydown");
        window.removeEventListener("keyup");
        canvas.removeEventListener("click");
        navigate("/lobby");
      }
      c.clearRect(0, 0, 800, 500);
      c.drawImage(background, 0, 0, 800, 500);
      //.....draw players....
      c.drawImage(avatarA, playerA.x, playerA.y, playerA.w, playerA.h);
      mirrorImage(c, avatarB, playerB.x, playerB.y, true, false);
      //......draw ball.....
      c.fillStyle = "white";
      c.beginPath();
      c.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
      c.fill();
      if (ball.ping || ball.badPing) {
        c.beginPath();
        c.arc(ball.x, ball.y, ball.r * ball.grow, 0, Math.PI * 2);
        c.fillStyle = `rgba(${ball.pingColor}${ball.opacity}`;
        c.fill();
      }
      //.....score board....
      c.fillStyle = "rgb(117, 187, 117)";
      c.font = "30px Comic Sans MS";
      c.textAlign = "center";
      c.fillText(`${wager}`, 800 / 2, 500 / 4);
      c.fillText(`${playerA.name}`, 200, 500 / 4);
      c.fillText(`${playerB.name}`, 600, 500 / 4);
    });
  }, [socket]);

  return (
    <div className="Match">
      <h1>Match</h1>
      <canvas className="canvas" width={800} height={500}></canvas>
    </div>
  );
}

export default Match;
