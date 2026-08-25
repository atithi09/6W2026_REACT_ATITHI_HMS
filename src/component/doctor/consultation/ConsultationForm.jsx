import { useEffect, useState } from "react"
import DoctorServices from "../../../services/DoctorServices"
import AuthService from "../../../services/AuthService"
import { toast } from "react-toastify"
import { useNavigate, useParams } from "react-router-dom"
import AppointmentService from "../../../services/AppointmentService"
import PatientService from "../../../services/PatientService"
import { Link } from "react-router-dom"
import MedicalRecordServices from "../../../services/MedicalRecordServices"
import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import Groq from "groq-sdk";

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '600px',
        maxWidth: '90vw',
        borderRadius: '12px',
        padding: '24px',
        border: 'none',
        boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1050,
    },
};

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
    const [aiGenerated, setAiGenerated] = useState(false);
    const [question, setQuestion] = useState("");
    const [loading, setLoading] = useState(false);

    const groq = new Groq({
        apiKey: import.meta.env.VITE_GROQ_API_KEY,
        dangerouslyAllowBrowser: true
    });
    const askAI = async () => {

        if (!question.trim()) {
            toast.info("Cannot send empty prompt.")
            return;
        }

        setLoading(true);

        try {
            const completion = await groq.chat.completions.create({

                messages: [
                    {
                        role: "system",
                        content: `
You are a Clinical Consultation Assistant integrated into a Hospital Management System.

You assist licensed doctors by analyzing the symptoms and/or diagnosis they describe 
and generating a structured clinical consultation draft. You do NOT replace clinical 
judgment and you MUST NOT prescribe medication. The doctor is solely responsible for 
selecting and prescribing any drugs, dosages, or treatments.

Return ONLY valid JSON in exactly this format, with no text outside the JSON and no markdown:



{
    "patientName":"",
    "age":"",
    "gender":"",
    "symptoms": "",
    "diagnosis": "",
    "treatment": "",
    "notes": ""
}

FIELD RULES:

- symptoms: Restate the symptoms described by the doctor in clear clinical terms, as a 
  comma-separated list. Do not add symptoms that weren't mentioned or implied.

- diagnosis: State the most likely clinical diagnosis based ONLY on the given information. 
  If the picture is ambiguous, give the primary diagnosis followed by 1-2 differential 
  diagnoses in parentheses. Do not overstate certainty for vague or incomplete input.

- treatment: Provide a structured treatment plan as a single readable string, including:
  brief non-pharmacological and pharmacological advice (rest, hydration, diet, activity) if relevant.Describe the process of possible treatment, commonly used medicines in that and duration without listing medicines. Use 
  standard dosing conventions. Do not suggest medicines and controlled substances or high-risk drugs 
  without flagging them clearly as needing extra scrutiny.

- notes: Include, where relevant:
  1. Any red-flag or emergency symptoms requiring immediate/in-person care.
  2. Key contraindications or drug interactions to verify (allergies, pregnancy, renal/ 
     hepatic impairment, age-specific dosing).
  3. Missing information that limits the reliability of this draft (e.g. no age/weight, 
     no allergy history).
 
GENERAL RULES:
- Do not invent patient information not present in the input.
- If a field cannot be determined from the input, leave it as an empty string "" rather 
  than guessing.
- Use precise, professional clinical language — this is a medical document, not casual text.
- If the input is too vague to produce a safe diagnosis or treatment (e.g. a single 
  nonspecific symptom), say so explicitly inside "notes" and leave "diagnosis" and/or 
  "treatment" empty rather than fabricating one.
- Never present this output as final or doctor-approved.
- Write the response in points not in a paragraph so it should be easy to read.

`
                    },

                    {
                        role: "user",
                        content: question
                    }
                ],

               model: "openai/gpt-oss-120b",

                temperature: 0.2,

                response_format: {
                    type: "json_object"
                }

            });
            const result = JSON.parse(
                completion.choices[0].message.content
            );

            // Put AI response directly into form fields
            setPatientName(result.patientName || "");
            setAge(result.age || "");
            setGender(result.gender || "");
            setSymptoms(result.symptoms || "");
            setDiagnosis(result.diagnosis || "");
            setTreatment(result.treatment || "");
            setNotes(result.notes || "");

            

            // Close modal
            closeModal();

            toast.success("AI generated consultation details.");
            setAiGenerated(true);
        } catch (error) {

            console.error("AI Error:", error);

            toast.error("AI could not generate the consultation details.");

        } finally {

            setLoading(false);

        }
    };

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

    let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
    }

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
                                                        <label for="name" className="form-label fw-bold fs-5">Patient Name</label>
                                                        <input
                                                            id="name"
                                                            type="text"
                                                            className="form-control"
                                                            value={patientName}
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
                                                            value={gender}
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
                                                            value={symptoms}
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
                                                            value={diagnosis}
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
                                                            value={treatment}
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
                                                            value={notes}
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
                                                            onClick={openModal}
                                                        >
                                                            <i className="bi bi-stars me-2"></i>
                                                            Generate with AI
                                                        </button>
                                                    </div>
                                                </div>

                                            </form>
                                        </div>

                                        <div className="emergency-info">
                                            <p>
                                                <i className="bi bi-info-circle"></i>
                                                Review all consultation details carefully before generating the prescription.
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
            <div>
                <Modal
                    isOpen={modalIsOpen}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={customStyles}
                    ariaHideApp={false}
                >
                    <div className="d-flex justify-content-between align-items-center mb-3 pb-3 border-bottom">
                        <h4 className="mb-0 fw-bold">Groq AI Chat</h4>
                        <button
                            type="button"
                            className="btn-close"
                            onClick={closeModal}
                            aria-label="Close"
                        ></button>
                    </div>

                    <div className="mb-3">
                        <textarea
                            className="form-control"
                            rows="5"
                            placeholder="Ask something..."
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            disabled={loading}
                        />
                    </div>
                    

                    <div className="d-flex justify-content-end">
                        <button
                            className="btn btn-primary px-4"
                            onClick={askAI}
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <span className="spinner-border spinner-border-sm me-2" role="status" />
                                    Thinking...
                                </>
                            ) : (
                                "Ask AI"
                            )}
                        </button>
                    </div>
                </Modal>
            </div>
            {aiGenerated && (
                        <div className=" container w-75 mb-5 alert alert-warning d-flex align-items-start gap-2">
                            <i className="bi bi-robot fs-5"></i>

                            <div>
                                <strong>AI-Assisted Prescription Draft</strong>
                                <p className="mb-0 mt-1">
                                    This prescription draft was generated with the assistance of AI.
                                    Please review and verify all medicines, dosages, and instructions
                                    before saving.
                                </p>
                            </div>
                        </div>
                    )}
        </>
    )
}