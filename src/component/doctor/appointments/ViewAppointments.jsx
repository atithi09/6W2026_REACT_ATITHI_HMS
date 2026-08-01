import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AppointmentService from '../../../services/AppointmentService'
import AuthService from '../../../services/AuthService'
import PatientService from '../../../services/PatientService'
import { toast } from 'react-toastify'
import { RingLoader } from 'react-spinners'

const override = {
    display: "block",
    margin: "0 auto",
}

export default function ViewAppointments() {
    const DoctorId = AuthService.uid()
    const [appointments, setAppointments] = useState([])
    const [patients, setPatients] = useState([])
    const [loading, setLoading] = useState(true)

    async function fetchAppointments() {
        try{
        let res = await AppointmentService.AppointmentByDoctor(DoctorId)
        setAppointments(res)}
        catch(Err){
            toast.error("Soemthing went wrong")
        }
        finally{
            setLoading(false)
        }
    }

    async function fetchPatients() {
        let res = await PatientService.all()
        setPatients(res)
    }

    useEffect(() => {
        fetchAppointments()
        fetchPatients()
    }, [])

    async function acceptAppointment(apptId) {
        await AppointmentService.updateStatus(apptId, "Accepted");
        fetchAppointments();
    }
    async function rejectAppointment(apptId) {
        await AppointmentService.updateStatus(apptId, "Cancelled");
        fetchAppointments();
    }
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
            {appointments.length > 0 ?
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
                                        <th className='text-nowrap'>Sr No.</th>
                                        <th className='text-nowrap'>Patient Name</th>
                                        <th>Time</th>
                                        <th className='text-nowrap'>Date</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {appointments.map((appt, index) => (
                                        <tr key={appt.id}>
                                            <td>{index + 1}</td>

                                            <td className='text-nowrap'>{patients.find((p) => p.id == appt.patientId)?.name}</td>

                                            <td
                                                className="description-cell text-nowrap"
                                            >
                                                {appt.appointmentTime}
                                            </td>

                                            <td className='text-nowrap'>
                                                {appt.appointmentDate}
                                            </td>
                                            <td>
                                                {appt.appointmentStatus === "Pending" && (
                                                    <span className="badge appBadge bg-warning fs-6">
                                                        Pending
                                                    </span>
                                                )}

                                                {appt.appointmentStatus === "Accepted" && (
                                                    <span className="badge appBadge fs-6 bg-success">
                                                        Accepted
                                                    </span>
                                                )}

                                                
                                            </td>
                                            <td>
                                                {appt.appointmentStatus === "Pending" && (
                                                    <>
                                                        <button
                                                            className="btn btn-outline-primary btn-sm rounded-circle me-2 appBagde"
                                                            onClick={() => acceptAppointment(appt.id)}
                                                        >
                                                            <i className="bi bi-check-circle-fill"></i>
                                                        </button>

                                                        <button
                                                            className="btn btn-outline-danger btn-sm rounded-circle "
                                                            onClick={() => rejectAppointment(appt.id)}
                                                        >
                                                            <i className="bi bi-x-circle-fill"></i>
                                                        </button>
                                                    </>
                                                )}

                                                {appt.appointmentStatus === "Accepted" && (
                                                    <button className="btn  btn-primary btn-sm appBadge">
                                                        Start Consultation
                                                    </button>
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
                                You don't have any appointments at the moment. Enjoy your free time or
                                check back later for new bookings.
                            </p>

                        </div>
                    </div>
                </div>)
            }
        </>
    )
}