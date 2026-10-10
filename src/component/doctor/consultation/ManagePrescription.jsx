import { useEffect, useState } from "react"
import AuthService from "../../../services/AuthService"
import PrescriptionServices from "../../../services/PrescriptionServices"
import { toast } from "react-toastify"
import { RingLoader } from 'react-spinners'
import { Link } from "react-router-dom"
import PatientService from "../../../services/PatientService"

const override = {
    display: "block",
    margin: "0 auto",
}
export default function ManagePrescription() {
    const doctorId = AuthService.uid()
    const [loading, setLoading] = useState(true)
    const [prescriptions, setPrescriptions] = useState([])
    const [patients, setPatients] = useState([])
    async function fetchPrescription() {
        try {
            let res = await PrescriptionServices.recordByDoctor(doctorId)
            setPrescriptions(res)
        }
        catch (err) {
            console.log("Error:", err)
            toast.error("Something went wrong")
        }
        finally {
            setLoading(false)
        }
    }
    async function fetchPatients() {
        try {
            let res = await PatientService.all()
            setPatients(res)
        }
        catch (err) {
            console.log("Error:", err)
            toast.error("Something went wrong")
        }
        finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        fetchPrescription()
        fetchPatients()
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
                                <h1 className="heading-title ">Prescriptions</h1>
                                <p className="mb-0">
                                    Access your prescription history, review treatment plans, and stay updated on your patients' follow-up visits.
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
                            <li className="current">Prescriptions</li>
                        </ol>
                    </div>
                </nav>
            </div>


            {prescriptions.length >
                0 ?
                <div className="container my-5">
                    <div className="d-flex justify-content-between my-3">

                        <div className="mt-4 mb-2">
                            <h3>Prescriptions</h3>
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
                                        <th className='text-nowrap'>Record Id</th>
                                        <th className='text-nowrap'>Date</th>
                                        <th className='text-nowrap'>Medicines</th>
                                        <th className='text-nowrap'>Next Visit</th>
                                        <th className='text-nowrap'>Action</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {prescriptions.map((record, index) => (
                                        <tr key={record.id}>
                                            <td>{index + 1}</td>

                                            <td className='text-nowrap'>{patients.find((p) => p.id == record.patientId)?.name}</td>
                                            <td
                                                className="description-cell text-nowrap"
                                            >
                                                {record.medicalRecordId}
                                            </td>

                                            <td className='text-nowrap'>
                                                {new Date(record.createdAt).toISOString().split("T")[0]}
                                            </td>
                                            <td> {record.medicines
                                                ? record.medicines.split(",").filter(m => m.trim()).length
                                                : 0}</td>
                                            <td>
                                                <span className='text-nowrap'>
                                                    {record.nextVisitDate || "N/A"}
                                                </span>
                                            </td>
                                            <td><Link >
                                                <button className="btn appBadge fs-6 btn-primary btn-sm">
                                                    View Records
                                                </button>
                                            </Link>
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
                                className="bi bi-cash-stack opacity-50 text-primary"
                                style={{ fontSize: "4rem" }}
                            ></i>

                            <h4 className="mt-3 fw-bold">
                                No prescriptions.
                            </h4>

                            <p className="text-muted mb-4">
                                You don't have any Earnings at the moment. Check back later.
                            </p>

                        </div>
                    </div>
                </div>)
            }

        </>
    )
}