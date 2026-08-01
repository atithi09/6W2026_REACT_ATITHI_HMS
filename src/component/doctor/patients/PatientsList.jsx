import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import PatientService from "../../../services/PatientService"
import Swal from "sweetalert2"
import AppointmentService from "../../../services/AppointmentService"
import AuthService from "../../../services/AuthService"
import { RingLoader } from "react-spinners"
import { toast } from "react-toastify"

const override = {
    display: "block",
    margin: "0 auto",
}

export default function PatientsList() {
    const [patients, setPatients] = useState([])
    const doctorId = AuthService.uid()
    const [appointments, setAppointments] = useState([])
    const [loading, setLoading] = useState(true)

    const doctorPatients = patients.filter((patient) =>
        appointments.some((appointment) => appointment.patientId === patient.id)
    );

    async function fetchAppointments() {
        let res = await AppointmentService.AppointmentPatientDoctor(doctorId)
        setAppointments(res)
    }

    async function fetchPatients() {
        try {
            let res = await PatientService.all()
            setPatients(res)
        }
        catch (err) {
            toast.error("Something went wrong")
        }
         finally{
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchPatients();
        fetchAppointments()
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
                                <h1 className="heading-title">Patients</h1>
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
                            <li className="current">Patients</li>
                        </ol>
                    </div>
                </nav>
            </div>
            {doctorPatients.length>0 ?
                <div className="container">

                    <div className="d-flex justify-content-between">

                        <div className="mt-4 mb-2">
                            <h3>Patients</h3>
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
                                        <th className="text-nowrap">Sr No.</th>
                                        <th className="text-nowrap">Name</th>
                                        <th className="text-nowrap">Status</th>
                                        <th className="text-nowrap">Gender</th>
                                        <th width="170">Action</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {doctorPatients.map((patients, index) => (
                                        <tr key={patients.id}>
                                            <td>{index + 1}</td>

                                            <td className="fw-semibold text-nowrap">
                                                {patients.name}
                                            </td>

                                            <td>
                                                <span
                                                    className={`badge ${patients.status
                                                        ? "bg-success"
                                                        : "bg-danger"
                                                        }`}
                                                >
                                                    {patients.status ? "Active" : "Inactive"}
                                                </span>
                                            </td>

                                            <td className="text-nowrap">
                                                {patients.gender || "not Mentioned"}
                                            </td>

                                            <td>

                                                 <button className="btn  btn-primary btn-sm appBadge">
                                                        View Records
                                                    </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div > :
                <div className="card border-0 shadow-sm text-center py-5">
                    <div className="card-body">
                        <i className="bi bi-people-fill display-1 text-primary"></i>

                        <h3 className="fw-bold mt-3">
                            No Patients Found
                        </h3>

                        <p className="text-muted mb-0">
                            You don't have any patients assigned yet. Patients will appear here after they book an appointment with you.
                        </p>
                    </div>
                </div>
            }
        </>
    )
}