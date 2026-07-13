import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <>

           
                {/* Scroll Top */}
                <Link
                    to="#!"
                    id="scroll-top"
                    className="scroll-top d-flex align-items-center justify-content-center"
                >
                    <i className="bi bi-arrow-up-short" />
                </Link>
                
            

            <footer id="footer" className="footer-16 footer position-relative">
                <div className="container">
                    <div className="footer-main">
                        <div className="row align-items-start">
                            <div className="col-lg-5">
                                <div className="brand-section">
                                    <Link
                                        to="/"
                                        className="logo d-flex align-items-center mb-4"
                                    >
                                        <span className="sitename">Clinic</span>
                                    </Link>
                                    <p className="brand-description">
                                        Crafting exceptional digital experiences through thoughtful design
                                        and innovative solutions that elevate your brand presence.
                                    </p>
                                    <div className="contact-info mt-5">
                                        <div className="contact-item">
                                            <i className="bi bi-geo-alt" />
                                            <span>123 Creative Boulevard, Design District, NY 10012</span>
                                        </div>
                                        <div className="contact-item">
                                            <i className="bi bi-telephone" />
                                            <span>+1 (555) 987-6543</span>
                                        </div>
                                        <div className="contact-item">
                                            <i className="bi bi-envelope" />
                                            <span>hello@designstudio.com</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-7">
                                <div className="footer-nav-wrapper">
                                    <div className="row">
                                        <div className="col-6 col-lg-3">
                                            <div className="nav-column">
                                                <h6>Studio</h6>
                                                <nav className="footer-nav">
                                                    <Link to="#!">Our Story</Link>
                                                    <Link to="#!">Design Process</Link>
                                                    <Link to="#!">Portfolio</Link>
                                                    <Link to="#!">Case Studies</Link>
                                                    <Link to="#!">Awards</Link>
                                                </nav>
                                            </div>
                                        </div>
                                        <div className="col-6 col-lg-3">
                                            <div className="nav-column">
                                                <h6>Services</h6>
                                                <nav className="footer-nav">
                                                    <Link to="#!">Brand Identity</Link>
                                                    <Link to="#!">Web Design</Link>
                                                    <Link to="#!">Mobile Apps</Link>
                                                    <Link to="#!">Digital Strategy</Link>
                                                    <Link to="#!">Consultation</Link>
                                                </nav>
                                            </div>
                                        </div>
                                        <div className="col-6 col-lg-3">
                                            <div className="nav-column">
                                                <h6>Resources</h6>
                                                <nav className="footer-nav">
                                                    <Link to="#!">Design Blog</Link>
                                                    <Link to="#!">Style Guide</Link>
                                                    <Link to="#!">Free Assets</Link>
                                                    <Link to="#!">Tutorials</Link>
                                                    <Link to="#!">Inspiration</Link>
                                                </nav>
                                            </div>
                                        </div>
                                        <div className="col-6 col-lg-3">
                                            <div className="nav-column">
                                                <h6>Connect</h6>
                                                <nav className="footer-nav">
                                                    <Link to="#!">Start Project</Link>
                                                    <Link to="#!">Schedule Call</Link>
                                                    <Link to="#!">Join Newsletter</Link>
                                                    <Link to="#!">Follow Updates</Link>
                                                    <Link to="#!">Partnership</Link>
                                                </nav>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <div className="container">
                        <div className="bottom-content" >
                            <div className="row align-items-center">
                                <div className="col-lg-6">
                                    <div className="copyright">
                                        <p>
                                            © <span className="sitename">Clinic</span>. All rights reserved.
                                        </p>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="legal-links">
                                        <Link to="#!">Privacy Policy</Link>
                                        <Link to="#!">Terms of Service</Link>
                                        <Link to="#!">Cookie Policy</Link>
                                        <div className="credits">
                                            {/* All the links in the footer should remain intact. */}
                                            {/* You can delete the links only if you've purchased the pro version. */}
                                            {/* Licensing information: https://bootstrapmade.com/license/ */}
                                            {/* Purchase the pro version with working PHP/AJAX contact form: [buy-url] */}
                                            Designed by{" "}
                                            <Link to="https://bootstrapmade.com/">BootstrapMade</Link>.
                                            Distributed by{" "}
                                            <Link to="https://themewagon.com" target="_blank">
                                                ThemeWagon
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

        </>
    )
}