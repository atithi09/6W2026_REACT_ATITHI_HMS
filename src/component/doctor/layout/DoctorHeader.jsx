import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../../../services/AuthService";

export default function DoctorHeader() {

    const nav = useNavigate();

    const [mobileOpen, setMobileOpen] = useState(false);

    const [email, setEmail] = useState("");
    const [userType, setUserType] = useState("");
    const [doctorId, setDoctorId] = useState("");

    useEffect(() => {
        setEmail(AuthService.email());
        setUserType(AuthService.userType());
        setDoctorId(AuthService.uid());
    }, []);

    function logout() {
        AuthService.logout();

        setEmail("");
        setUserType("");
        setDoctorId("");

        nav("/");
    }

    return (
        <>
            <header
                id="header"
                className={`header fixed-top ${mobileOpen ? "mobile-nav-active" : ""}`}
            >
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

                <div className="branding d-flex align-items-center">

                    <div className="container position-relative d-flex align-items-center justify-content-between">
                        
                        <i
                            className={`mobile-nav-toggle d-xl-none bi ${mobileOpen ? "bi-x" : "bi-list"}`}
                            onClick={() => setMobileOpen(!mobileOpen)}
                        ></i>
                        <Link to="/" className="logo d-flex align-items-center">
                            <h1 className="sitename">Clinic</h1>
                        </Link>

                        <nav id="navmenu" className="navmenu ms-auto me-3">
                            <ul>
                                <li><Link to="/doctor">Dashboard</Link></li>
                                <li><Link to="/doctor/viewappt">View Appointments</Link></li>
                                <li><Link to="/doctor/viewpatient">Patients </Link></li>
                                <li><Link to="/doctor/appthistory">Appointment History</Link></li>
                                <li><Link to="/doctor/earnings">Earnings</Link></li>
                                <li><Link to="/doctor/docfeedback">Feedback</Link></li>
                            </ul>
                        </nav>

                        {email ? (

                            <div className="d-flex gap-3 ms-auto me-2 align-items-center">

                                <button
                                    className="btn btn-primary py-1 px-3"
                                    onClick={logout}
                                >
                                    Logout
                                </button>

                                <Link
                                    to={`/doctor/doctorProfile/${doctorId}`}
                                >
                                    <i className="bi bi-person-circle fs-3"></i>
                                </Link>



                            </div>

                        ) : (

                            <Link
                                to="/login"
                                className="btn btn-primary"
                            >
                                Login
                            </Link>

                        )}

                        

                    </div>

                </div>

            </header>
        </>
    );
}