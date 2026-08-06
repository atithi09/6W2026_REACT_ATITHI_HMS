import { useEffect, useState } from "react"
import DoctorServices from "../../../services/DoctorServices"
import AuthService from "../../../services/AuthService"
import { toast } from "react-toastify"
import { useNavigate, useParams } from "react-router-dom"
import PatientService from "../../../services/PatientService"
import { Link } from "react-router-dom"
import MedicalRecordServices from "../../../services/MedicalRecordServices"
import PrescriptionServices from "../../../services/PrescriptionServices"
import AppointmentService from "../../../services/AppointmentService"

export default function PrescriptionForm() {
    let param = useParams()
    let nav = useNavigate()
    const [patientName, setPatientName] = useState('')
    const [doctortName, setDoctorName] = useState('')
    const [nextDate, setNextDate] = useState('')
    const [instructions, setInstructions] = useState('')
    const [medicines, setMedicines] = useState('')
    const [doctors, setDoctors] = useState([])
    const [patients, setPatients] = useState([])
    const [medicalRecord, SetMedicalRecord] = useState([])
    const patientId = medicalRecord.patientId
    const doctorId = medicalRecord.doctorId
    let apptId= medicalRecord.appointmentId

    async function fetchDoctors() {
        let res = await DoctorServices.all()
        setDoctors(res)
    }
    async function fetchPateints() {
        let res = await PatientService.all()
        setPatients(res)
    }
    async function getRecord() {
        let res = await MedicalRecordServices.single(param.id)
        SetMedicalRecord(res)
    }

    async function GeneratePrescription(e) {
        e.preventDefault()
        if (
            !medicines.trim() ||
            !instructions.trim() ||
            !nextDate.trim()) {
            toast.info("All fields are required.")
            return
        }
        try {
            let payload = {
                medicalRecordId: param.id,
                patientId: patientId,
                doctorId: doctorId,
                instructions: instructions,
                medicines: medicines,
                nextVisitDate:nextDate
               }

            await PrescriptionServices.add(payload)
            toast.success("Record saved successfully.")
            
            await AppointmentService.updateStatus(apptId, "Completed");
            
            
        }
        catch (err) {
            console.log("error:", err)
            toast.error("Something went wrong.")
        }
    }

    useEffect(() => {
        fetchDoctors()
        fetchPateints()
        getRecord()
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
                                    <h1 className="heading-title">Prescription Form</h1>
                                    <p className="mb-0">
                                        Odio et unde deleniti. Deserunt numquam exercitationem. Officiis
                                        quo odio sint voluptas consequatur ut Link odio voluptatem. Sit
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
                                    <Link to="index.html">Home</Link>
                                </li>
                                <li className="current">Prescription Form</li>
                            </ol>
                        </div>
                    </nav>
                </div>
                {/* End Page Title */}
                {/* Appointmnet Section */}
                <main className="main">
                    {/* Consultation Section */}
                    <section id="appointment" className="appointmnet section">
                        <div className="container">
                            <div className="row" key={param.id}>
                                <div className="col-lg-10 mx-auto">
                                    <div className="booking-wrapper">

                                        <div className="booking-header text-center">
                                            <h2>Add Prescription</h2>
                                        </div>

                                        <div className="appointment-form">
                                            <form className="php-email-form" onSubmit={GeneratePrescription}>

                                                <div className="row gy-4">

                                                    {/* Patient Details */}



                                                    <div className="col-md-6">
                                                        <label for="pname" className="form-label fw-bold fs-5">Doctor Name</label>
                                                        <input
                                                            id="pname"
                                                            type="text"
                                                            className="form-control"
                                                            value={
                                                                doctors.find((p) => p.id === medicalRecord.doctorId)?.name || ""
                                                            }
                                                            onChange={(e) => setDoctorName(e.target.value)}
                                                            readOnly
                                                        />
                                                    </div>

                                                    <div className="col-md-6">
                                                        <label for="dname" className="form-label fw-bold fs-5">Patient Name</label>
                                                        <
                                                            input
                                                            id="dname"
                                                            type="text"
                                                            className="form-control"
                                                            value={medicalRecord.patientName}
                                                            readOnly
                                                        />
                                                    </div>


                                                    <div className="col-md-6">
                                                        <label for="date" className="form-label fw-bold fs-5">Next Visit Date</label>
                                                        <input
                                                            id="date"
                                                            type="date"
                                                            className="form-control"
                                                            value={nextDate}
                                                            onChange={(e) => setNextDate(e.target.value)}
                                                        />
                                                    </div>

                                                    <div className="col-12">
                                                        <label for="notes" className="form-label fw-bold fs-5">
                                                            Medicines
                                                        </label>

                                                        <textarea
                                                            id="notes"
                                                            className="form-control"
                                                            rows="4"
                                                            placeholder="Additional notes..."
                                                            value={medicines}
                                                            onChange={(e) => setMedicines(e.target.value)}

                                                        ></textarea>
                                                    </div>

                                                    <div className="col-12">
                                                        <label for="medicines" className="form-label fw-bold fs-5">
                                                            Instructions
                                                        </label>

                                                        <textarea
                                                            id="medicines"
                                                            className="form-control "
                                                            rows="4"
                                                            placeholder="Enter patient's medicines..."
                                                            value={instructions}
                                                            onChange={(e) => setInstructions(e.target.value)}

                                                        ></textarea>
                                                    </div>
                                                </div>

                                                <div className="col-12 d-flex justify-content-between flex-wrap gap-2 my-5">
                                                    <button
                                                        type="submit"
                                                        className="btn-book"
                                                    >
                                                        Save Prescription
                                                    </button>

                                                </div>


                                            </form>
                                        </div>

                                        <div className="emergency-info">
                                            <p>
                                                <i className="bi bi-info-circle"></i>
                                                Review all instructions details carefully before saving the prescriptions.
                                            </p>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
                {/* /Appointmnet Section */}
            </main>

        </>
    )
}