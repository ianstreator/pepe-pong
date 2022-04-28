const buttonDefaults = {
  border: "none",
  borderRadius: ".25rem",
  minWidth: "10rem",
  minHeight: "2.5rem",
  cursor: "pointer",
  margin: "1rem",
  padding: "1rem",
  fontFamily: "cursive",
  fontSize: "1.5rem",
  transition: "300ms"
};

function Button({ children, onClick, className, style, value }) {
  return (
    <button
      style={style || buttonDefaults}
      onClick={onClick}
      className={className}
      value={value}
    >
      {children}
    </button>
  );
}

export default Button;
