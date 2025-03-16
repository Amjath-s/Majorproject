import "../Style/dashboardpanel.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaGamepad,
  FaQuestion,
  FaChild,
  FaGrimace,
} from "react-icons/fa";
import { Link } from "react-router-dom";
function Dashboardside() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Fetching user data...");
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("No token found, redirecting to login...");
        navigate("/login");
        return;
      }

      try {
        const res = await axios.get("http://localhost:5005/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("User data received:", res.data);
        setUser(res.data);
      } catch (err) {
        console.error("Error fetching user:", err);
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    fetchUser();
  }, [navigate]);
  const handlelogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <div className="container">
        <div className="dashboardside">
          <div className="dashboardside__profile">
            <div className="dashboardside_detailprofile">
              <img
                src="https://www.w3schools.com/howto/img_avatar.png"
                alt="profile"
              />
              {/* {user ? <h1>Welcome,{user.name}!</h1> : <p>Loading...</p>}; */}
            </div>
          
             
              <h5>
                {user
                  ? user.name.charAt(0).toUpperCase() + user.name.slice(1)
                  : "Loading..."}
              </h5>
            
          </div>

          <div className="dashboardside_menu">
            <ul>
              <li>
                <FaUser></FaUser>
                <Link to=" /lo">PROFILE </Link>
              </li>
              <li>
                <FaGamepad />
                <Link to= "/dashboard/game" >GAMES</Link>
              </li>
              <li>
                <FaQuestion />
                <Link to="/dashboard/Ask">ASK</Link>
              </li>
              <li>
                <FaChild> </FaChild>
                <Link> REPORT</Link>
              </li>
              <li>
                <FaGrimace></FaGrimace>
                <Link to ="/dashboard/analyser">STRESS CHECK</Link>
              </li>
              <li>
                <Link to="/dashboard/alphabet">ANALYSER</Link>
              </li>
            </ul>
          </div>
          <div className="sidebarbtm_logout">
            <button className="logoutbtn" onClick={handlelogout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );


  // return (
  //   <>
  //     <div
  //       className="containerdash"
  //       style={{
  //         display: "flex",
  //         flexDirection: "row",

  //         background: "linear-gradient(to right, #4A90E2, #145DA0)",
  //         width: "100%",
  //         height: "10%",
  //       }}
  //     >
  //       <div
  //         className="profilecontainer"
  //         style={{
  //           paddingLeft: "30px",
  //           margin: "10px",
  //           display: "flex",
  //           flexDirection: "row",
  //           justifyContent: "flex-start",
  //           alignItems: "center",

  //           width: "100%",
  //         }}
  //       >
  //         <div
  //           className="profile"
  //           style={{
  //             width: "50px",
  //             height: "50px",
  //             borderRadius: "50%",
  //             display: "flex",
  //             justifyContent: "center",
  //             alignItems: "center",
  //           }}
  //         >
  //           <img
  //             src="https://www.w3schools.com/howto/img_avatar.png"
  //             alt="profile"
  //           />
  //         </div>
  //         <div className="profileinfo" style={{display:"flex",flexDirection:"row",padding:"10px",fontFamily:"poppins",fontSize:"600"}}>
  //           <h4>Welcome  </h4>
  //           <h5>
  //             {user
  //               ? user.name.charAt(0).toUpperCase() + user.name.slice(1)
  //               : "Loading..."}
  //           </h5>
  //         </div>
  //       </div>
  //     </div>
  //   </>
  // );
}
export default Dashboardside;
