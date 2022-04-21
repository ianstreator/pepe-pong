// const containerDefaults = {
//   //   backgroundColor: "red",
//   //   borderRadius: 40,
//   display: "flex",
//   justifyContent: "center",
//   alignItems: "center",
// };

function Container({ children, className }) {
  return <div className={className}>{children}</div>;
}

export default Container;
