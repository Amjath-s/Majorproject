// import LoginButton from '../Component/LoginButton';'../Component/LoginButton'
import '../Style/home.css'
import NavBar from '../Component/NavBar';
import "@fortawesome/fontawesome-free/css/all.min.css";
// import image from 'public/student.jpg';
function Home()
{


return (
  <>
    <NavBar />
    <main className="main-content-wrapper">
      <div className="content-wrapper">
        <div className="content-text-main">
          <div className="content-page-text">
            <h1>
              "It <span className="specialword"> shouldn’t </span> matter how{" "}
              <span className="specialword"> slowly</span> a child learns. What
              matters is that we encourage them to never stop{" "}
              <span className="specialword"> trying."</span>{" "}
            </h1>
            {/* <div className="content-enter">
              <p>ljkkjhkjhkj</p>
            </div> */}
          </div>
          <div className="content-enter">
            <button> HOPE IN</button>
          </div>
        </div>
        <div className="content-main-image">
          <img src="student.jpg" alt="" />
        </div>
      </div>

      <div className="content-main">
        <div className="content-heading">
          <h2> WHY ADAPTI LEARN ?</h2>
        </div>
        <div className="content-flex-info-adapti">
          <div className="content-learn">
            <div className="content-learn-info">
              <img src="" alt=" image" />
              <h3> Personlized learning</h3>
              <p>
                {" "}
                With individualized support and adaptive strategies, we create a
                learning environment where every student with learning
                disabilities can thrive and reach their full potential.
              </p>
            </div>
          </div>
          <div className="content-learn">
            <div className="content-learn-info">
              <img src="" alt=" image" />
              <h3> AI Empowered</h3>
              <p>
                By leveraging advanced AI, we offer customized learning
                experiences that adapt to students' unique challenges, helping
                them overcome obstacles and achieve their goals
              </p>
            </div>
          </div>
          <div className="content-learn">
            <div className="content-learn-info">
              <img src="" alt=" image" />
              <h3> AI Empowered</h3>
              <p>
                By leveraging advanced AI, we offer customized learning
                experiences that adapt to students' unique challenges, helping
                them overcome obstacles and achieve their goals
              </p>
            </div>
          </div>
        </div>
      </div>

      <footer class="footer">
        <div class="footer-container">
          <div class="footer-left">
            <p>&copy; 2025 Your Website Name. All rights reserved.</p>
          </div>
          <div class="footer-center">
            <p>
              <a href="/privacy-policy">Privacy Policy</a> |{" "}
              <a href="/terms-of-service">Terms of Service</a>
            </p>
          </div>
          <div class="footer-right">
            <a
              href="https://www.facebook.com"
              target="_blank"
              aria-label="Facebook"
            >
              <i class="fab fa-facebook"></i>
            </a>
            <a href="https://twitter.com" target="_blank" aria-label="Twitter">
              <i class="fab fa-twitter"></i>
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              aria-label="Instagram"
            >
              <i class="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </footer>
    </main>
  </>
);
 }
export default Home;