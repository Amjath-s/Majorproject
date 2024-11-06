// import LoginButton from '../Component/LoginButton';'../Component/LoginButton'
import '../Style/home.css'
function Home()
{
    return (
      <div id="home" className="homes">
        <div className="homeword">
          <h1>
            "It <span className="specialword"> shouldn’t </span> matter how{" "}
            <span className="specialword"> slowly</span> a child learns. What
            matters is that we encourage them to never stop{" "}
            <span className="specialword"> trying."</span>
          </h1>
        </div>
        
       
        <div className="imagesection">
          <div className="circlegrad">
            {/* <img src="frontend\public\std.jpg" alt="" /> */}
          </div>
        </div>
      </div>
    );

}
export default Home;