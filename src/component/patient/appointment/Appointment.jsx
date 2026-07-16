import { useEffect, useState } from "react"
import DepartmentServices from "../../../services/DepartmentServices"
import DoctorServices from "../../../services/DoctorServices"
import AuthService from "../../../services/AuthService"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import AppointmentService from "../../../services/AppointmentService"

export default function Appointment() {
    let nav = useNavigate()
    const [departments, setDepartments] = useState([])
    const [doctors, setDoctors] = useState([])

    const [patientid, setPatientid] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [mobile, setMobile] = useState('')
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [doctorid, setDoctorid] = useState('')
    const [reason, setReason] = useState('')

    function getEmail() {
        const email = AuthService.email();
        setEmail(email);
    }
    function getUid() {
        const uid = AuthService.uid()
        setPatientid(uid)
    }
    async function security(e) {
        e.preventDefault()
        if (!email) {
            toast.error("Login or Sign Up to book appointments")
        }
        else {
            try {
                let payload = {
                    patientId: patientid,
                    doctorId: doctorid,
                    appointmentDate: date,
                    appointmentTime: time,
                    reason: reason,
                }
                const slotBooked = await AppointmentService.isSlotBooked(
                    doctorid,
                    date,
                    time
                );

                if (slotBooked) {
                    toast.error("This slot is already booked.");
                    return;
                } else {
                    await AppointmentService.add(payload);
                    toast.success("Appointment booked successfully");
                }
            }
            catch (err) {
                console.log("error:", err)
                toast.error("Something went wrong")
            }
        }
    }

    async function fetchDoctors() {
        let res = await DoctorServices.all()
        setDoctors(res)
    }

    async function fetchDepartments() {
        let res = await DepartmentServices.all()
        setDepartments(res)
    }
    useEffect(() => {
        fetchDepartments();
        fetchDoctors();
        getUid()
        getEmail()
    }, [])

    return (
        <>
            <main className="main">
                {/* Page Title */}
                <div className="page-title">
                    <div className="heading">
                        <div className="container">
                            <div className="row d-flex justify-content-center text-center">
                                <div className="col-lg-8">
                                    <h1 className="heading-title">Appointment</h1>
                                    <p className="mb-0">
                                        Odio et unde deleniti. Deserunt numquam exercitationem. Officiis
                                        quo odio sint voluptas consequatur ut a odio voluptatem. Sit
                                        dolorum debitis veritatis natus dolores. Quasi ratione sint. Sit
                                        quaerat ipsum dolorem.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <nav className="breadcrumbs">
                        <div className="container">
                            <ol>
                                <li>
                                    <a href="index.html">Home</a>
                                </li>
                                <li className="current">Appointment</li>
                            </ol>
                        </div>
                    </nav>
                </div>
                {/* End Page Title */}
                {/* Appointmnet Section */}
                <section id="appointmnet" className="appointmnet section">
                    <div className="container" >
                        <div className="row">
                            <div className="col-lg-8 mx-auto">
                                <div className="booking-wrapper">
                                    <div
                                        className="booking-header text-center"

                                    >
                                        <h2>Schedule Your Appointment</h2>
                                        <p>
                                            Book your medical appointment in just a few simple steps. Our
                                            experienced healthcare professionals are ready to provide you
                                            with the best care possible.
                                        </p>
                                    </div>
                                    <div
                                        className="booking-steps"

                                    >
                                        <div className="step">
                                            <div className="step-icon">
                                                <i className="bi bi-calendar-check" />
                                            </div>
                                            <div className="step-content">
                                                <h4>Select Service</h4>
                                                <p>Choose the medical service you need</p>
                                            </div>
                                        </div>
                                        <div className="step">
                                            <div className="step-icon">
                                                <i className="bi bi-clock" />
                                            </div>
                                            <div className="step-content">
                                                <h4>Pick Date &amp; Time</h4>
                                                <p>Select your preferred appointment slot</p>
                                            </div>
                                        </div>
                                        <div className="step">
                                            <div className="step-icon">
                                                <i className="bi bi-person-check" />
                                            </div>
                                            <div className="step-content">
                                                <h4>Confirm Details</h4>
                                                <p>Provide your information and confirm</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="appointment-form"

                                    >
                                        <form
                                            action=""
                                            method=""
                                            className="php-email-form"
                                            onSubmit={security}
                                        >
                                            <div className="row gy-4">
                                                <div className="col-md-6">
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        className="form-control"
                                                        placeholder="Full Name"
                                                        required
                                                        value={name}
                                                        onChange={(e) => setName(e.target.value)}
                                                    />
                                                </div>
                                                <div className="col-md-6">
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        className="form-control"
                                                        placeholder="Email Address"
                                                        required
                                                        value={email}
                                                        readOnly
                                                    />
                                                </div>
                                                <div className="col-md-6">
                                                    <input
                                                        type="tel"
                                                        name="phone"
                                                        className="form-control"
                                                        placeholder="Phone Number"
                                                        required
                                                        value={mobile}
                                                        onChange={(e) => setMobile(e.target.value)}
                                                    />
                                                </div>

                                                <div className="col-md-6">
                                                    <select
                                                        name="doctors"
                                                        className="form-select"
                                                        required
                                                        onChange={(e) => setDoctorid(e.target.value)}
                                                        value={doctorid}
                                                    >
                                                        <option value="" selected disabled>Select Doctor</option>
                                                        {doctors.map((doctor) => (
                                                            <option value={doctor.id} >{doctor.name}</option>
                                                        ))
                                                        }

                                                    </select>
                                                </div>

                                                <div className="col-md-6">
                                                    <input
                                                        type="date"
                                                        name="date"
                                                        className="form-control"
                                                        required=""
                                                        value={date}
                                                        onChange={(e) => setDate(e.target.value)}
                                                    />
                                                </div>

                                                <div className="col-md-6">
                                                    <input
                                                        type="time"
                                                        name="time"
                                                        className="form-control"
                                                        required=""
                                                        value={time}
                                                        onChange={(e) => setTime(e.target.value)}
                                                    />
                                                </div>
                                                <div className="col-12">
                                                    <textarea
                                                        name="message"
                                                        className="form-control"
                                                        rows={4}
                                                        placeholder="Additional notes or symptoms (optional)"
                                                        value={reason}
                                                        onChange={(e) => setReason(e.target.value)}
                                                    />
                                                </div>
                                                <div className="col-6 mt-4">
                                                    <div className="loading">Loading</div>
                                                    <div className="error-message" />
                                                    <div className="sent-message">
                                                        Your appointment has been scheduled. Thank you!
                                                    </div>
                                                    <button type="submit" className="btn-book" >
                                                        Book Appointment
                                                    </button>
                                                </div>

                                                <div className="col-6 mt-4">
                                                    <div className="loading">Loading</div>
                                                    <div className="error-message" />
                                                    <div className="sent-message">
                                                        Your appointment has been scheduled. Thank you!
                                                    </div>
                                                    <button type="submit" className="btn-book">
                                                        Pay Now
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                    <div
                                        className="emergency-info"

                                    >
                                        <p>
                                            <i className="bi bi-exclamation-triangle" /> For medical
                                            emergencies, please call <strong>911</strong>
                                            or go to the nearest emergency room.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* /Appointmnet Section */}
            </main>

        </>
    )
}