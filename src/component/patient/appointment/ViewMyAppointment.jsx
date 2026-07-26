import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import AppointmentService from "../../../services/AppointmentService"
import PatientService from "../../../services/PatientService"
import DoctorServices from "../../../services/DoctorServices"
import AuthService from "../../../services/AuthService"
export default function ViewMyAppointment() {
    const userUid = AuthService.uid()
    const [appointments, setAppointments] = useState([])
    const [doctors, setDoctors] = useState([])
    const [patients, setPatients] = useState([])

    async function fetchAppointments() {
        let res = await AppointmentService.AppointmentByPatient(userUid)
        setAppointments(res)
    }

    async function fetchPatients() {
        let res = await PatientService.all()
        setPatients(res)

    }

    async function fetchDoctors() {
        let res = await DoctorServices.all()
        setDoctors(res)

    }

    useEffect(() => {
        fetchAppointments()
        fetchPatients()
        fetchDoctors()
    }, [])

    return (
        <>
            <div className="page-title">
                <div className="heading">
                    <div className="container">
                        <div className="row d-flex justify-content-center text-center">
                            <div className="col-lg-8">
                                <h1 className="heading-title ">Upcoming Appointments</h1>
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
                                <Link to='/'>Home</Link>
                            </li>
                            <li className="current">Upcoming Appointments</li>
                        </ol>
                    </div>
                </nav>
            </div>
{appointments.length>0?
            <div className="container my-5">
                <div className="row ">
                    {appointments.map((appt) => (
                        <div className="col-md-8 col-lg-6 mb-4" key={appt.id}>
                            <div className="card shadow border-0 rounded-4">
                                <div className="card-body p-4">

                                    <div className="d-flex justify-content-between align-items-center">
                                        <div>
                                            <h5 className="fw-bold mb-1">
                                                {doctors.find((p) => p.id == appt.doctorId)?.name}
                                            </h5>
                                        </div>

                                        <span >{appt.appointmentStatus === "Pending" && (
                                            <span className="badge bg-warning p-2 fs-6">
                                                Pending
                                            </span>
                                        )}

                                            {appt.appointmentStatus === "Accepted" && (
                                                <span className="badge p-2 fs-6 bg-success">
                                                    Accepted
                                                </span>
                                            )}
                                        </span>
                                    </div>

                                    <hr />

                                    <div className="mb-2">
                                        <i className="bi bi-calendar-event me-2 text-primary"></i>
                                        <strong>Date:</strong> {appt.appointmentDate}
                                    </div>

                                    <div className="mb-2">
                                        <i className="bi bi-clock me-2 text-primary"></i>
                                        <strong>Time:</strong> {appt.appointmentTime}
                                    </div>

                                    <div>
                                        <i className="bi bi-chat-left-text me-2 text-primary"></i>
                                        <strong>Reason:</strong> {appt.reason|| "not mentioned"}
                                    </div>

                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>: 
            (<div className="col-12">
                    <div className="card border-0 shadow-sm text-center py-5">
                        <div className="card-body">
                            <i
                                className="bi bi-calendar2-x text-primary"
                                style={{ fontSize: "4rem" }}
                            ></i>

                            <h4 className="mt-3 fw-bold">
                                No Appointments Scheduled
                            </h4>

                            <p className="text-muted mb-4">
                                You don't have any appointments at the moment.
                                Book one to consult with a doctor.
                            </p>

                        </div>
                    </div>
                </div>)
}
        </>
    )
}