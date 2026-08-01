import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { RingLoader } from 'react-spinners'
import { toast } from 'react-toastify'

import AppointmentService from '../../../services/AppointmentService'
import PatientService from '../../../services/PatientService'
import DoctorService from '../../../services/DoctorServices'

const override = {
    display: "block",
    margin: "0 auto",
}

export default function ManageAppointments() {

    const [loading, setLoading] = useState(true)
    const [appointments, setAppointments] = useState([])
    const [patients, setPatients] = useState([])
    const [doctors, setDoctors] = useState([])

    async function fetchAppointments() {
        try {
            const res = await AppointmentService.all()
            setAppointments(res)
        } catch (err) {
            toast.error("Something went wrong")
        } finally {
            setLoading(false)
        }
    }

    async function fetchPatients() {
        const res = await PatientService.all()
        setPatients(res)
    }

    async function fetchDoctors() {
        const res = await DoctorService.all()
        setDoctors(res)
    }

    useEffect(() => {
        fetchAppointments()
        fetchPatients()
        fetchDoctors()
    }, [])

    if (loading) {
        return (
            <div
                className="d-flex justify-content-center align-items-center"
                style={{ minHeight: "80vh" }}
            >
                <RingLoader
                    color="#0D6EFD"
                    loading={loading}
                    cssOverride={override}
                    size={70}
                />
            </div>
        )
    }

    return (
        <>
            <div className="page-title">
                <div className="heading">
                    <div className="container">
                        <div className="row d-flex justify-content-center text-center">
                            <div className="col-lg-8">
                                <h1 className="heading-title">Appointments</h1>
                                <p className="mb-0">
                                    Odio et unde deleniti. Deserunt numquam exercitationem.
                                    Officiis quo odio sint voluptas consequatur ut a odio
                                    voluptatem. Sit dolorum debitis veritatis natus dolores.
                                    Quasi ratione sint. Sit quaerat ipsum dolorem.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <nav className="breadcrumbs">
                    <div className="container">
                        <ol>
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li className="current">Appointments</li>
                        </ol>
                    </div>
                </nav>
            </div>

            {appointments.length > 0 ? (
                <div className="container">

                    <div className="d-flex justify-content-between my-3">
                        <div className="mt-4 mb-2">
                            <h3>Appointments</h3>
                        </div>
                    </div>

                    <div style={{ marginBottom: "20px" }}>

                        <div className="table-responsive shadow-sm rounded-4">
                            <table className="table table-hover align-middle text-center mb-0">

                                <thead className="table-primary">
                                    <tr>
                                        <th>Sr No.</th>
                                        <th className='text-nowrap'>Patient Name</th>
                                        <th className='text-nowrap'>Doctor Name</th>
                                        <th className='date-column'>Time</th>
                                        <th>Date</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {appointments.map((appt, index) => (
                                        <tr key={appt.id}>

                                            <td>{index + 1}</td>

                                            <td className='text-nowrap'>
                                                {patients.find((p) => p.id === appt.patientId)?.name}
                                            </td>

                                            <td className='text-nowrap'>
                                                {doctors.find((d) => d.id === appt.doctorId)?.name}
                                            </td>

                                            <td >{appt.appointmentTime}</td>

                                            <td className='text-nowrap'>{appt.appointmentDate}</td>

                                            <td>
                                                {appt.appointmentStatus === "Pending" && (
                                                    <span className="badge appBadge bg-warning  fs-6">
                                                        Pending
                                                    </span>
                                                )}

                                                {appt.appointmentStatus === "Accepted" && (
                                                    <span className="badge appBadge bg-success fs-6">
                                                        Accepted
                                                    </span>
                                                )}

                                                {appt.appointmentStatus === "Cancelled" && (
                                                    <span className="badge appBadge bg-danger fs-6">
                                                        Cancelled
                                                    </span>
                                                )}

                                                {appt.appointmentStatus === "Completed" && (
                                                    <span className="badge appBadge bg-success  fs-6">
                                                        Completed
                                                    </span>
                                                )}
                                            </td>

                                        </tr>
                                    ))}
                                </tbody>

                            </table>
                        </div>

                    </div>

                </div>
            ) : (
                <div className="container mt-5">
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
                                Check back later for new bookings.
                            </p>

                        </div>

                    </div>
                </div>
            )}
        </>
    )
}