// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import Ask from "../Component/Ask";
import Dashboardside from "../Component/Dashboardside";
import "../Style/dashboard.css";
import StressChecker from "../Component/Stresschecker";
import StressCheck from "../Component/StressCheck";
import SpeechGame from "../Component/SpeechGame";
import AlphabetGame from "./AlphabetGame";

function Dashboard() {
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     console.log("Fetching user data...");
//     const fetchUser = async () => {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         console.log("No token found, redirecting to login...");
//         navigate("/login");
//         return;
//       }

//       try {
//         const res = await axios.get("http://localhost:5005/dashboard", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         console.log("User data received:", res.data);
//         setUser(res.data);
//       } catch (err) {
//         console.error("Error fetching user:", err);
//         localStorage.removeItem("token");
//         navigate("/login");
//       }
//     };

//     fetchUser();
//   }, [navigate]);

  return (
    <>
    <div className="container22">

      <div className="dashboard_view">
        <Dashboardside />

        {/* <div className="main_dash">
          <Routes>
            <Route path="Ask" element={<Ask />} />
          </Routes>
        </div> */}
      </div>
      <div className="main_dash">
          <Routes>
            <Route path="Ask" element={<Ask />} />
            <Route path="Analyser" element={<StressChecker/>}/>
            <Route path="StressCheck" element={<StressCheck/>}/>
            <Route  path="game" element={<SpeechGame/>}/>
            <Route path="game" element={<AlphabetGame />} />
          </Routes>

        </div>
    </div>
    </>
  );
  
  
  
  
}

export default Dashboard;
