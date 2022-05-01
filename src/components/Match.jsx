import images from "../images/export.js";
import "./components.css";

import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import SocketContext from "../context/socketContext";

function Match() {
  const { socket, matchKey } = useContext(SocketContext);
  if (!socket) window.location.href = "/";
  const [score, setScore] = useState([0, 0]);
  const [time, setTime] = useState(null);
  const [avatarA, setAvatarA] = useState(<img />);
  const [avatarB, setAvatarB] = useState(<img />);
  const navigate = useNavigate();

  useEffect(() => {
    const canvas = document.querySelector("canvas");
    const c = canvas.getContext("2d");

    socket.on("match-start", (data) => {
      setAvatarA();
      setAvatarB();
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
    });

    socket.on(`${matchKey}`, (matchData) => {
      const { playerA, playerB, ball, table } = matchData;
      if (matchData.state === "finished") {
        window.removeEventListener("keydown");
        window.removeEventListener("keyup");
        canvas.removeEventListener("click");
        navigate("/lobby");
      }

      c.clearRect(0, 0, 600, 400);
      c.fillStyle = "white";

      c.drawImage(avatarA, playerA.x, playerA.y, playerA.w, playerA.h);
      c.drawImage(avatarB, playerB.x, playerB.y, playerB.w, playerB.h);
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
