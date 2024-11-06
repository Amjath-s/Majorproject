import {
 
  useLocation,
} from "react-router-dom";
import NavBar from "./NavBar";


function Layout({ children }) {
  const location = useLocation();
  const hideNavBar = location.pathname === "/login";

  return (
    <>
      {!hideNavBar && <NavBar />}
      {children}
    </>
  );
}

export default Layout;