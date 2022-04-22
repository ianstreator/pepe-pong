function Match() {
  const canvas = document.querySelector("canvas")
  const ctx = canvas.getContext("2d")

  

  return (
    <div className="Match">
      <h1>Match</h1>
      <canvas className="canvas" width={800} height={600}></canvas>
    </div>
  );
}

export default Match;
