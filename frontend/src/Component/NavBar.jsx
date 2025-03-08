import '../style/navbar.css'
import {Link} from 'react-router-dom'
import LoginButton from './LoginButton';

function NavBar()
{
    return (
      <>
        <div className="navbar">
          <div className="logo">
            <h2>ADPATI-LEARN </h2>
          </div>
          <ul>
            <li>
              <a href="#home">Home</a>
            </li>
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>

            {/* <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li> */}
          </ul>
          <LoginButton />
        </div>
      </>
    );

}
export default NavBar;