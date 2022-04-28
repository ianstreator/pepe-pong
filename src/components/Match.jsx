import { useContext, useEffect, useRef } from "react";

import SocketContext from "../context/socketContext";

function Match() {
  const { socket, matchKey } = useContext(SocketContext);
  if (!socket) window.location.href = "/";
  const canvasRef = useRef(null);


  useEffect(() => {
    const canvas = canvasRef.current;
    const c = canvas.getContext("2d");
    socket.on(`${matchKey}`, (matchData) => {
      const { playerA, playerB, ball } = matchData;
      c.clearRect(0, 0, 600, 400);
      console.log(c, canvas);
      c.fillStyle = "black";

      c.fillRect(playerA.x, playerA.y, playerA.w, playerA.h);
      c.fillRect(playerB.x, playerB.y, playerB.w, playerB.h);

      // console.log(playerA, playerB, ball);
    });
  }, [socket]);

  return (
    <div className="Match">
      <h1>Match</h1>
      <canvas
        className="canvas"
        ref={canvasRef}
        width={600}
        height={400}
      ></canvas>
    </div>
  );
}

export default Match;
