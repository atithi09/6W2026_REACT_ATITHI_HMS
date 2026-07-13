import { useState } from "react";
import { Link } from 'react-router-dom'

export default function DcotorHeader() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const closeMenu = () => setMobileOpen(false);

    return (
        <>
            <header
                id="header"
                className={`header fixed-top ${mobileOpen ? "mobile-nav-active" : ""}`}
            >
                

                {/* Branding */}
                <div className=" branding d-flex align-items-center">
                    <div className="container position-relative d-flex align-items-center justify-content-between">
                        <Link to="/" className="logo d-flex align-items-center">
                            <h1 className="sitename">Doctor Dashboard</h1>
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
                        
                        <div className="d-flex gap-3 ms-auto me-2">
                            <Link to="/login" className="btn btn-primary text-white py-1 px-3">
                                Logout
                            </Link>
                        </div>
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