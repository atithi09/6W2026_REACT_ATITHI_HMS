import { useEffect, useState } from "react"
import DepartmentServices from "../../../services/DepartmentServices"
import DoctorServices from "../../../services/DoctorServices"
import AuthService from "../../../services/AuthService"
import { toast } from "react-toastify"
import { useNavigate, useParams } from "react-router-dom"
import AppointmentService from "../../../services/AppointmentService"
import { Link } from "react-router-dom"

export default function ConsultationForm() {
    let param=useParams()
    const [patientName,setPatientName]=useState('')
    const [doctortName,setDoctorName]=useState('')
    const [age,setAge]=useState(0)
    const [gender,setGender]=useState('')
    const [apptDate,setApptDate]=useState('')
    const [diagnosis,setDiagnosis]=useState('')
    const [symptoms,setSymptoms]=useState('')
    const [treatment,setTreatment]=useState('')
    const [notes,setNotes]=useState('')

    async function getAppointment(){
       let res = await AppointmentService.getSingle(param.id)
       if(res){
        setApptDate(res.appointmentDate)
       }
    }

    useEffect(()=>{
        getAppointment()
    },[])

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
                                            <form className="php-email-form">

                                                <div className="row gy-4">

                                                    {/* Patient Details */}

                                                    <div className="col-md-6">
                                                        <label className="form-label fw-bold fs-5">Patient Name</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            value=""
                                                            readOnly
                                                        />
                                                    </div>

                                                    <div className="col-md-6">
                                                        <label className="form-label fw-bold fs-5">Doctor Name</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            value=""
                                                            readOnly
                                                        />
                                                    </div>

                                                    <div className="col-md-4">
                                                        <label className="form-label fw-bold fs-5">Age</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            value=""
                                                            readOnly
                                                        />
                                                    </div>

                                                    <div className="col-md-4">
                                                        <label className="form-label fw-bold fs-5">Gender</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            value=""
                                                            readOnly
                                                        />
                                                    </div>

                                                    <div className="col-md-4">
                                                        <label className="form-label fw-bold fs-5">Appointment Date</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            value={apptDate}
                                                            readOnly
                                                        />
                                                    </div>


                                                    <div className="col-12">
                                                        <label className="form-label fw-bold fs-5">
                                                            Symptoms
                                                        </label>

                                                        <textarea
                                                            className="form-control fw-bold fs-5"
                                                            rows="4"
                                                            placeholder="Enter patient's symptoms..."
                                                        ></textarea>
                                                    </div>


                                                    <div className="col-12">
                                                        <label className="form-label fw-bold fs-5">
                                                            Diagnosis
                                                        </label>

                                                        <textarea
                                                            className="form-control"
                                                            rows="4"
                                                            placeholder="Enter diagnosis..."
                                                        ></textarea>
                                                    </div>


                                                    <div className="col-12">
                                                        <label className="form-label fw-bold fs-5">
                                                            Treatment
                                                        </label>

                                                        <textarea
                                                            className="form-control"
                                                            rows="4"
                                                            placeholder="Enter treatment details..."
                                                        ></textarea>
                                                    </div>


                                                    <div className="col-12">
                                                        <label className="form-label fw-bold fs-5">
                                                            Clinical Notes
                                                        </label>

                                                        <textarea
                                                            className="form-control"
                                                            rows="4"
                                                            placeholder="Additional notes..."
                                                        ></textarea>
                                                    </div>
                                                </div>

                                                <div className="row my-4 justify-content-between">
                                                    <div className="col-auto">
                                                        <button
                                                                type="button"
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
                                                                type="submit"
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