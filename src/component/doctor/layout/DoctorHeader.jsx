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

                <div className="branding d-flex align-items-center">

                    <div className="container position-relative d-flex align-items-center justify-content-between">

                        <Link to="/" className="logo d-flex align-items-center">
                            <h1 className="sitename">Clinic</h1>
                        </Link>

                        <nav id="navmenu" className="navmenu ms-auto me-3">
                            <ul>
                                <li><Link to="/doctor">Dashboard</Link></li>
                                <li><Link to="/doctor/viewappt">View Appointments</Link></li>
                                <li><Link to="/doctor/viewpatient">Patients </Link></li>
                                <li><Link to="/services">Appointment History</Link></li>
                                <li><Link to="/doctors">Earnings</Link></li>
                                <li><Link to="/contact">Feedback</Link></li>
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

                        <i
                            className={`mobile-nav-toggle d-xl-none bi ${mobileOpen ? "bi-x" : "bi-list"}`}
                            onClick={() => setMobileOpen(!mobileOpen)}
                        ></i>

                    </div>

                </div>

            </header>
        </>
    );
}