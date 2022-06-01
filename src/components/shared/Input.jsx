const inputDefaults = {
  outline: "none",
  border: "none",
  borderRadius: ".25rem",
  minWidth: "100%",
  minHeight: "2.5rem",
  textIndent: ".5rem",
  margin: "1rem",
};

function Input({ maxLength, type, placeholder, onChange, value, children }) {
  return (
    <input
      onChange={onChange}
      style={inputDefaults}
      type={type}
      maxLength={maxLength}
      placeholder={placeholder}
      value={value}
      children={children}
    />
  );
}

export default Input;
