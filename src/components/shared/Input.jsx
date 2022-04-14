const inputDefaults = {
  outline: "none",
  border: "none",
  borderRadius: ".25rem",
  minWidth: "100%",
  minHeight: "2.5rem",
  textIndent: ".5rem",
  margin: "1rem"
};

function Input({maxLength, type, placeholder}) {
  return <input style={inputDefaults} type={type} maxLength={maxLength} placeholder={placeholder}></input>;
}

export default Input;
