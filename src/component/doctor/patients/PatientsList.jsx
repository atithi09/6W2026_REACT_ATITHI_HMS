import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import PatientService from "../../../services/PatientService"
import Swal from "sweetalert2"
import AppointmentService from "../../../services/AppointmentService"
import AuthService from "../../../services/AuthService"


export default function PatientsList() {
    const [patients, setPatients] = useState([])
    const doctorId= AuthService.uid()
    const [appointments,setAppointments]=useState([])
    const doctorPatients = patients.filter((patient) =>
    appointments.some((appointment) => appointment.patientId === patient.id)
);

    async function fetchAppointments() {
        let res = await AppointmentService.AppointmentByDoctor(doctorId)
        setAppointments(res)
    }
    
        async function fetchPatients(){
            let res= await PatientService.all()
            setPatients(res)
        }

    useEffect(() => {
        fetchPatients();
        fetchAppointments()
    }, [])

    
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
                                    <th>Sr No.</th>
                                    <th>Name</th>
                                    <th>Status</th>
                                    <th>Date</th>
                                    <th width="170">Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {doctorPatients.map((patients, index) => (
                                    <tr key={patients.id}>
                                        <td>{index + 1}</td>

                                        <td className="fw-semibold">
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

                                        <td>
                                            {new Date(patients.createdAt).toLocaleDateString()}
                                        </td>

                                        <td>
                                           
                                                <button className="btn btn-outline-primary btn-sm rounded-circle me-2">
                                                    <i className="bi bi-pencil-fill"></i>
                                                </button>

                                            <button
                                                className="btn btn-outline-danger btn-sm rounded-circle"
                                            >
                                                <i className="bi bi-trash-fill"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div >
        </>
    )
}