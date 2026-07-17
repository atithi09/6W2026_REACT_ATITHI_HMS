import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import AuthService from "../../../services/AuthService";

export default function Header() {
    const nav = useNavigate()
    const [mobileOpen, setMobileOpen] = useState(false);
    const closeMenu = () => setMobileOpen(false);

    const email = AuthService.email();
    const userType = AuthService.userType();
    const userId = AuthService.uid();

    function logout() {
        AuthService.logout();
        setEmail("");
        setUserType("");
        nav("/")
    }
    return (
        <>
            <header
                id="header"
                className={`header fixed-top ${mobileOpen ? "mobile-nav-active" : ""}`}
            >
                {/* Top Bar */}
                <div className="topbar d-flex align-items-center dark-background">
                    <div className="container d-flex justify-content-center justify-content-md-between">
                        <div className="contact-info d-flex align-items-center">
                            <i className="bi bi-envelope d-flex align-items-center">
                                <a href="mailto:contact@example.com">contact@example.com</a>
                            </i>

                            <i className="bi bi-phone d-flex align-items-center ms-4">
                                <span>+1 5589 55488 55</span>
                            </i>
                        </div>

                        <div className="social-links d-none d-md-flex align-items-center">
                            <a href="#!" className="twitter">
                                <i className="bi bi-twitter-x"></i>
                            </a>

                            <a href="#!" className="facebook">
                                <i className="bi bi-facebook"></i>
                            </a>

                            <a href="#!" className="instagram">
                                <i className="bi bi-instagram"></i>
                            </a>

                            <a href="#!" className="linkedin">
                                <i className="bi bi-linkedin"></i>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Branding */}
                <div className="branding d-flex align-items-center">
                    <div className="container position-relative d-flex align-items-center justify-content-between">
                        <Link to="/" className="logo d-flex align-items-center">
                            <h1 className="sitename">Clinic</h1>
                        </Link>

                        <nav id="navmenu" className="navmenu ms-auto me-3">
                            <ul>
                                <li>
                                    <Link to="/" onClick={closeMenu}>
                                        Home
                                    </Link>
                                </li>

                                <li>
                                    <Link to="/about" onClick={closeMenu}>
                                        About
                                    </Link>
                                </li>

                                <li>
                                    <Link to="/department" onClick={closeMenu}>
                                        Departments
                                    </Link>
                                </li>

                                <li>
                                    <Link to="/services" onClick={closeMenu}>
                                        Services
                                    </Link>
                                </li>

                                <li>
                                    <Link to="/doctors" onClick={closeMenu}>
                                        Doctors
                                    </Link>
                                </li>

                                <li>
                                    <Link to="/contact" onClick={closeMenu}>
                                        Contact
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                        {email ? (
                            <div className="d-flex gap-3 ms-auto me-2 align-items-center">
                                <Link to="/"> <button className="btn btn-primary text-white py-1 px-3" onClick={logout}>
                                    Logout </button>
                                </Link>

                                {(userType === '3') && (
                                    <Link to={`/profile/${userId}`}><i className="bi bi-person-circle fs-3"></i></Link>)
                                }
                            </div>
                        ) : (
                            <div className="d-flex gap-3 ms-auto me-2">
                                <Link to="/login" className="btn btn-primary text-white py-1 px-3">
                                    Login
                                </Link>
                            </div>)
                        }
                        <div>
                            <i
                                className={`mobile-nav-toggle d-xl-none bi ${mobileOpen ? "bi-x" : "bi-list"
                                    }`}
                                onClick={() => setMobileOpen(!mobileOpen)}
                            ></i>
                        </div>
                    </div>
                </div>
            </header>

        </>
    )
}