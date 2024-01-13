import Navbar from "../Navbar";
import { Outlet } from "react-router-dom";

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <Outlet/>
    </div>
  );
};

export default Layout;