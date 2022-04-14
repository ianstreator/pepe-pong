import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div>
      <ToastContainer theme="colored" limit={4}/>
    </div>
  );
}

export default App;
