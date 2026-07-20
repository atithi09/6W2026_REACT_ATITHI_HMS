import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AppointmentService from '../../../services/AppointmentService'
import AuthService from '../../../services/AuthService'
import PatientService from '../../../services/PatientService'
import DoctorService from '../../../services/DoctorServices'

export default function ManageAppointments() {
    
    const [appointments, setAppointments] = useState([])
    const [patients, setPatients] = useState([])
    const [doctors, setDoctors] = useState([])

    async function fetchAppointments() {
        let res = await AppointmentService.all()
        setAppointments(res)
    }

    async function fetchPatients() {
        let res = await PatientService.all()
        setPatients(res)
    }

    async function fetchDoctors() {
        let res = await DoctorService.all()  
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
                                <h1 className="heading-title ">Appointments</h1>
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
                            <li className="current">Appointments</li>
                        </ol>
                    </div>
                </nav>
            </div>
            {appointments?
                <div className="container">

                    <div className="d-flex justify-content-between my-3">

                        <div className="mt-4 mb-2">
                            <h3>Appointments</h3>
                        </div>

                    </div>
                    <div
                        style={{
                            marginBottom: "20px"
                        }}
                    >


                        <div className="table-responsive shadow-sm rounded-4">
                            <table className="table table-hover align-middle text-center mb-0">
                                <thead className="table-primary">
                                    <tr>
                                        <th>Sr No.</th>
                                        <th>Patient Name</th>
                                        <th>Doctor Name</th>
                                        <th>Time</th>
                                        <th>Date</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {appointments.map((appt, index) => (
                                        <tr key={appt.id}>
                                            <td>{index + 1}</td>

                                            <td>{patients.find((p) => p.id == appt.patientId)?.name}</td>
                                            <td>{doctors.find((p) => p.id == appt.doctorId)?.name}</td>

                                            <td
                                                className="description-cell"
                                            >
                                                {appt.appointmentTime}
                                            </td>

                                            <td>
                                                {appt.appointmentDate}
                                            </td>
                                            <td>
                                                {appt.appointmentStatus === "Pending" && (
                                                    <span className="badge bg-warning p-2 fs-6">
                                                        Pending
                                                    </span>
                                                )}

                                                {appt.appointmentStatus === "Accepted" && (
                                                    <span className="badge p-2 fs-6 bg-success">
                                                        Accepted
                                                    </span>
                                                )}

                                                {appt.appointmentStatus === "Cancelled" && (
                                                    <span className="badge p-2 fs-6 bg-danger">
                                                        Accepted
                                                    </span>
                                                )}

                                                {appt.appointmentStatus === "Completed" && (
                                                    <span className="badge p-2 fs-6 bg-success">
                                                        Accepted
                                                    </span>
                                                )}

                                                
                                            </td>
                                            
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div> : (<div className="col-12">
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
                                You don't have any appointments at the moment. Check back later for new bookings.
                            </p>

                        </div>
                    </div>
                </div>)
            }
        </>
    )
}