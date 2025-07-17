import "./Footer.css";

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-top">
                <div className="footer-brand">
                    <h2>neuaurelius</h2>
                </div>

                <div className="footer-links">
                    <div className="footer-column">
                        <h4>Product</h4>
                        <ul>
                            <li>Overview</li>
                            <li>Features</li>
                            <li>Tutorials</li>
                            <li>Pricing</li>
                            <li>Releases</li>
                        </ul>
                    </div>
                    <div className="footer-column">
                        <h4>Company</h4>
                        <ul>
                            <li>About us</li>
                            <li>Careers</li>
                            <li>Press</li>
                            <li>News</li>
                            <li>Media kit</li>
                            <li>Contact</li>
                        </ul>
                    </div>
                    <div className="footer-column">
                        <h4>Resources</h4>
                        <ul>
                            <li>Blog</li>
                            <li>Newsletter</li>
                            <li>Events</li>
                            <li>Help centre</li>
                            <li>Tutorials</li>
                            <li>Support</li>
                        </ul>
                    </div>
                </div>
            </div>


        </footer>
    );
}

export default Footer;
