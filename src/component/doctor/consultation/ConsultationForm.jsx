import { useEffect, useState } from "react"
import DoctorServices from "../../../services/DoctorServices"
import AuthService from "../../../services/AuthService"
import { toast } from "react-toastify"
import { useNavigate, useParams } from "react-router-dom"
import AppointmentService from "../../../services/AppointmentService"
import PatientService from "../../../services/PatientService"
import { Link } from "react-router-dom"
import MedicalRecordServices from "../../../services/MedicalRecordServices"

export default function ConsultationForm() {
    let param = useParams()
    let nav = useNavigate()
    const [appointment, SetAppointment] = useState([])
    const [patientName, setPatientName] = useState('')
    const [age, setAge] = useState("")
    const [gender, setGender] = useState('')
    const [apptDate, setApptDate] = useState('')
    const [diagnosis, setDiagnosis] = useState('')
    const [symptoms, setSymptoms] = useState('')
    const [treatment, setTreatment] = useState('')
    const [notes, setNotes] = useState('')
    const [doctors, setDoctors] = useState([])
    const [patients, setPatients] = useState([])
    const patientId = appointment.patientId
    const doctorId = appointment.doctorId
    const appointmentId = param.id

    async function fetchDoctors() {
        let res = await DoctorServices.all()
        setDoctors(res)
    }
    async function fetchPateints() {
        let res = await PatientService.all()
        setPatients(res)
    }
    async function getAppointment() {
        let res = await AppointmentService.getSingle(appointmentId)
        if (res) {
            SetAppointment(res)
            setApptDate(res.appointmentDate)
        }
    }

    async function GenerateRecord(e) {
        e.preventDefault()
        if (
            !patientName.trim() ||
            !age.trim() ||
            !gender.trim() ||
            !diagnosis.trim() ||
            !symptoms.trim() ||
            !treatment.trim() ||
            !notes.trim()) {
            toast.info("All fields are required.")
            return
        }
        try {
            let payload = {
                appointmentId: param.id,
                patientName: patientName,
                patientId: patientId,
                doctorId: doctorId,
                diagnosis: diagnosis,
                symptoms: symptoms,
                treatment: treatment,
                notes: notes
            }

            let docref = await MedicalRecordServices.add(payload)
            toast.success("Record saved successfully.")
            nav(`/doctor/PrescriptionForm/${docref.id}`)
        }
        catch (err) {
            console.log("error:", err)
            toast.error("Something went wrong.")
        }
    }
    

    useEffect(() => {
        getAppointment()
        fetchDoctors()
        fetchPateints()
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
                                    <h1 className="heading-title">Consultation Form</h1>
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
                                <li className="current">Consultation Form</li>
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
                                            <h2>Patient Consultation</h2>
                                        </div>

                                        <div className="appointment-form">
                                            <form className="php-email-form" onSubmit={GenerateRecord}>

                                                <div className="row gy-4">

                                                    {/* Patient Details */}



                                                    <div className="col-md-6">
                                                        <label for="pname" className="form-label fw-bold fs-5">Doctor Name</label>
                                                        <input
                                                            id="pname"
                                                            type="text"
                                                            className="form-control"
                                                            value={
                                                                doctors.find((p) => p.id === appointment.doctorId)?.name || ""
                                                            }
                                                            readOnly
                                                        />
                                                    </div>

                                                    <div className="col-md-6">
                                                        <label for="dname" className="form-label fw-bold fs-5">Patient Name</label>
                                                        <input
                                                            id="dname"
                                                            type="text"
                                                            className="form-control"
                                                            onChange={(e) => setPatientName(e.target.value)}
                                                        />
                                                    </div>


                                                    <div className="col-md-4">
                                                        <label for="date" className="form-label fw-bold fs-5">Appointment Date</label>
                                                        <input
                                                            id="date"
                                                            type="text"
                                                            className="form-control"
                                                            value={apptDate}
                                                            readOnly
                                                        />
                                                    </div>


                                                    <div className="col-md-4">
                                                        <label for="age" className="form-label fw-bold fs-5">Age</label>
                                                        <input
                                                            id="age"
                                                            type="text"
                                                            className="form-control"
                                                            value={age}
                                                            onChange={(e) => setAge(e.target.value)}

                                                        />
                                                    </div>

                                                    <div className="col-md-4">
                                                        <label for="gender" className="form-label fw-bold fs-5">Gender</label>
                                                        <input
                                                            id="gender"
                                                            type="text"
                                                            className="form-control"
                                                            onChange={(e) => setGender(e.target.value)}

                                                        />
                                                    </div>




                                                    <div className="col-12">
                                                        <label for="symptoms" className="form-label fw-bold fs-5">
                                                            Symptoms
                                                        </label>

                                                        <textarea
                                                            id="symptoms"
                                                            className="form-control "
                                                            rows="4"
                                                            placeholder="Enter patient's symptoms..."
                                                            onChange={(e) => setSymptoms(e.target.value)}

                                                        ></textarea>
                                                    </div>


                                                    <div className="col-12">
                                                        <label for="diagnosis" className="form-label fw-bold fs-5">
                                                            Diagnosis
                                                        </label>

                                                        <textarea
                                                            id="diagnosis"
                                                            className="form-control"
                                                            rows="4"
                                                            placeholder="Enter diagnosis..."
                                                            onChange={(e) => setDiagnosis(e.target.value)}

                                                        ></textarea>
                                                    </div>


                                                    <div className="col-12">
                                                        <label for="treatement" className="form-label fw-bold fs-5">
                                                            Treatment
                                                        </label>

                                                        <textarea
                                                            id="treatment"
                                                            className="form-control"
                                                            rows="4"
                                                            placeholder="Enter treatment details..."
                                                            onChange={(e) => setTreatment(e.target.value)}

                                                        ></textarea>
                                                    </div>


                                                    <div className="col-12">
                                                        <label for="notes" className="form-label fw-bold fs-5">
                                                            Clinical Notes
                                                        </label>

                                                        <textarea
                                                            id="notes"
                                                            className="form-control"
                                                            rows="4"
                                                            placeholder="Additional notes..."
                                                            onChange={(e) => setNotes(e.target.value)}

                                                        ></textarea>
                                                    </div>
                                                </div>

                                                <div className="row my-4 justify-content-between">
                                                    <div className="col-auto">

                                                        <button
                                                            type="submit"
                                                            className="btn btn-outline-success"
                                                        >
                                                            Generate Prescription
                                                        </button>
                                                    </div>
                                                    <div className="col-auto">
                                                        <button
                                                            type="button"
                                                            className="btn btn-outline-primary"
                                                        >
                                                            <i className="bi bi-stars me-2"></i>
                                                            Generate with AI
                                                        </button>
                                                    </div>
                                                </div>

                                                <div className="col-12 d-flex justify-content-between flex-wrap gap-2 my-3">
                                                    <button
                                                        type="button"
                                                        className="btn-book"
                                                        
                                                    >
                                                        End Consultation
                                                    </button>

                                                </div>


                                            </form>
                                        </div>

                                        <div className="emergency-info">
                                            <p>
                                                <i className="bi bi-info-circle"></i>
                                                Review all consultation details carefully before ending the
                                                consultation.
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