import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import useAuth from "../../hooks/useAuth";

function Layout() {

  const { isAuth } = useAuth();

  return (
    <>
      <Navbar/> 
      { !isAuth && 
      <div className="top-14  bg-slate-50 dark:bg-slate-800 fixed z-50 w-auto">
        LOG IN TO LIKE AND SAVE POSTS
      </div> }
      <Outlet /> 
    </>
  );
}

export default Layout;