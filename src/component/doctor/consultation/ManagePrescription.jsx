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
    const [selectedPrescription, setSelectedPrescription] = useState(null);
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
                                    Access your prescription history and stay updated on your patients' follow-up visits.
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
                                        <th className='text-nowrap'>Prescription Id</th>
                                        <th className='text-nowrap'>Date</th>
                                        <th className='text-nowrap'>Medicines</th>
                                        <th className='text-nowrap'>Next Visit</th>
                                        <th className='text-nowrap'>Actions</th>
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
                                                {record.id}
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
                                            <td>
                                                <button
                                                    className="btn btn-primary py-1 px-3"
                                                    onClick={() => setSelectedPrescription(record)}
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#prescriptionModal"
                                                >
                                                    View
                                                </button>
                                            </td>

                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div
                                className="modal fade"
                                id="prescriptionModal"
                                tabIndex="-1"
                                aria-labelledby="prescriptionModalLabel"
                                aria-hidden="true"
                            >
                                <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
                                    <div className="modal-content border-0 rounded-4">

                                        <div className="modal-header">
                                            <div>
                                                <h5
                                                    className="modal-title fw-bold"
                                                    id="prescriptionModalLabel"
                                                >
                                                    Prescription Details
                                                </h5>
                                                <p className="text-muted mb-0 small">
                                                    MEDORA Healthcare
                                                </p>
                                            </div>

                                            <button
                                                type="button"
                                                className="btn-close"
                                                data-bs-dismiss="modal"
                                                aria-label="Close"
                                            ></button>
                                        </div>

                                        <div className="modal-body p-4">
                                            {selectedPrescription && (
                                                <>
                                                    <div className="row g-3 mb-4">

                                                        <div className="col-md-6">
                                                            <div className="p-3 rounded-3 border h-100">
                                                                <h6 className="fw-bold mb-3">
                                                                    <i className="bi bi-person me-2 text-primary"></i>
                                                                    Patient Information
                                                                </h6>

                                                                <p className="mb-2">
                                                                    <strong>Patient Name:</strong>{" "}
                                                                    {patients.find(
                                                                        p => p.id === selectedPrescription.patientId
                                                                    )?.name || "N/A"}
                                                                </p>

                                                                <p className="mb-0">
                                                                    <strong>Patient ID:</strong>{" "}
                                                                    {selectedPrescription.patientId || "N/A"}
                                                                </p>
                                                            </div>
                                                        </div>

                                                        <div className="col-md-6">
                                                            <div className="p-3 rounded-3 border h-100">
                                                                <h6 className="fw-bold mb-3">
                                                                    <i className="bi bi-file-medical me-2 text-primary"></i>
                                                                    Prescription Information
                                                                </h6>

                                                                <p className="mb-2">
                                                                    <strong>Prescription ID:</strong>{" "}
                                                                    {selectedPrescription.id}
                                                                </p>

                                                                <p className="mb-2">
                                                                    <strong>Medical Record ID:</strong>{" "}
                                                                    {selectedPrescription.medicalRecordId || "N/A"}
                                                                </p>

                                                                <p className="mb-2">
                                                                    <strong>Date:</strong>{" "}
                                                                    {selectedPrescription.createdAt
                                                                        ? new Date(
                                                                            selectedPrescription.createdAt
                                                                        ).toISOString().split("T")[0]
                                                                        : "N/A"}
                                                                </p>

                                                                <p className="mb-0">
                                                                    <strong>Next Visit:</strong>{" "}
                                                                    {selectedPrescription.nextVisitDate || "N/A"}
                                                                </p>
                                                            </div>
                                                        </div>

                                                    </div>

                                                    <h6 className="fw-bold mb-3">
                                                        <i className="bi bi-capsule me-2 text-primary"></i>
                                                        Prescribed Medicines
                                                    </h6>

                                                    {selectedPrescription.medicines ? (
                                                        <div className="p-3 rounded-3 bg-light">
                                                            {selectedPrescription.medicines
                                                                .split(",")
                                                                .filter(medicine => medicine.trim())
                                                                .map((medicine, index) => (
                                                                    <div
                                                                        key={index}
                                                                        className="d-flex align-items-start gap-3 py-2 border-bottom"
                                                                    >
                                                                        <span className="badge bg-primary rounded-pill">
                                                                            {index + 1}
                                                                        </span>

                                                                        <span>{medicine.trim()}</span>
                                                                    </div>
                                                                ))}
                                                        </div>
                                                    ) : (
                                                        <p className="text-muted">
                                                            No medicine information available.
                                                        </p>
                                                    )}
                                                </>
                                            )}
                                        </div>

                                    </div>
                                </div>
                            </div>
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
                                You don't have any prescription at the moment. Check back later.
                            </p>

                        </div>
                    </div>
                </div>)
            }

        </>
    )
}