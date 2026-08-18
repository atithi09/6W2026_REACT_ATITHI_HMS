import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import AuthService from "../../../services/AuthService";

export default function AdminHeader() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const email = AuthService.email()
    const closeMenu = () => setMobileOpen(false);
    const nav = useNavigate()

    function logout() {
        AuthService.logout();
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
                                <Link to="mailto:contact@example.com">{email}</Link>
                            </i>
                        </div>

                        <div className="social-links d-none d-md-flex align-items-center">
                            <Link to="#!" className="twitter">
                                <i className="bi bi-twitter-x"></i>
                            </Link>

                            <Link to="#!" className="facebook">
                                <i className="bi bi-facebook"></i>
                            </Link>

                            <Link to="#!" className="instagram">
                                <i className="bi bi-instagram"></i>
                            </Link>

                            <Link to="#!" className="linkedin">
                                <i className="bi bi-linkedin"></i>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Branding */}
                <div className="branding d-flex align-items-center">
                    <div className="container position-relative d-flex align-items-center justify-content-between">
                        <div>
                            <i
                                className={`mobile-nav-toggle d-xl-none bi ${mobileOpen ? "bi-x" : "bi-list"
                                    }`}
                                onClick={() => setMobileOpen(!mobileOpen)}
                            ></i>
                        </div>
                        <Link to="/" className="logo d-flex align-items-center">
                            <h1 className="sitename">Clinic</h1>
                        </Link>

                        <nav id="navmenu" className="navmenu ms-auto me-3">
                            <ul>
                                <li>
                                    <Link to="/admin" onClick={closeMenu}>
                                        Dashboard
                                    </Link>
                                </li>

                                <li>
                                    <Link to="/admin/manageDepartment" onClick={closeMenu}>
                                        Departments
                                    </Link>
                                </li>

                                <li>
                                    <Link to="/admin/managedoc" onClick={closeMenu}>
                                        Doctors
                                    </Link>
                                </li>

                                <li>
                                    <Link to="/admin/managepatient" onClick={closeMenu}>
                                        Patients
                                    </Link>
                                </li>

                                <li>
                                    <Link to="/admin/manageappts" onClick={closeMenu}>
                                        Appointmnets
                                    </Link>
                                </li>

                                <li>
                                    <Link to="/admin/managebills" onClick={closeMenu}>
                                        Bills
                                    </Link>
                                </li>
                                
                                <li>
                                    <Link to="managefeedback" onClick={closeMenu}>
                                        Feedback
                                    </Link>
                                </li>
                            </ul>
                        </nav>

                        <div className="d-flex gap-3 ms-auto me-2">
                            <Link to="/login" className="btn btn-primary text-white py-1 px-3" onClick={logout}>
                                Logout
                            </Link>
                        </div>
                        
                    </div>
                </div>
            </header>

        </>
    )
}