import "../styles/navbar.css";
import { BiSolidCircle } from "react-icons/bi";

function Navbar() {
    return (
        <nav className="navbar">
            <div className="navElement">
                <h1 className="navLogo">neuaurelius</h1>
            </div>
            <div className="navRight">
                <div className="navlinks">
                    <a href="#">Services</a>
                    <a href="#">Testimonials</a>
                    <a href="#">Support</a>

                </div>
                <div className="navBtns">
                    <button className="getQuote menuBtn">Menu <span><BiSolidCircle /><BiSolidCircle /></span></button>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;