const containerDefaults = {
  //   backgroundColor: "red",
  //   borderRadius: 40,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

function Container({ children, className }) {
  return (
    <div style={containerDefaults} className={className}>
      {children}
    </div>
  );
}

export default Container;
