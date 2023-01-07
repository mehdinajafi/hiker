import { ToastContainer as ToastifyContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface IToastContainer {}

const ToastContainer: React.FC<IToastContainer> = () => {
  return <ToastifyContainer theme="dark" />;
};

export default ToastContainer;
