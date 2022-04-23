const buttonDefaults = {
  border: "none",
  borderRadius: ".25rem",
  minWidth: "10rem",
  minHeight: "2.5rem",
  cursor: "pointer",
  margin: "1rem",
  padding: "1rem",
  fontFamily: "cursive",
};

function Button({ children, onClick, className, style }) {
  return (
    <button
      style={style || buttonDefaults}
      onClick={onClick}
      className={className}
    >
      {children}
    </button>
  );
}

export default Button;
