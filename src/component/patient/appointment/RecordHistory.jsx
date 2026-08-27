import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AppointmentService from "../../../services/AppointmentService";
import { toast } from "react-toastify";
import AuthService from "../../../services/AuthService";
import MedicalRecordServices from "../../../services/MedicalRecordServices";
import PrescriptionServices from "../../../services/PrescriptionServices";

function RecordHistory() {
    const userUid = AuthService.uid();
    const [appointments, setAppointments] = useState([])
    const [records, setRecords] = useState([])
    const [medicines, setMedicines] = useState([])

    async function getAppointment() {
        try {
            let res = await AppointmentService.CompletedAppointment(userUid)
            setAppointments(res)

        }
        catch (Err) {
            toast.error("Something went wrong!")
            console.log(Err)
        }
    }
    async function getRecords() {
        try {
            const res = await MedicalRecordServices.recordByPatient(userUid);
            if (res) {
                setRecords(res);
            }
            console.log("records", res)
        }
        catch (err) {
            toast.error("Something went wrong!")
        }
    }
    async function getMedicines() {
        try {
            const res = await PrescriptionServices.recordByPatient(userUid);
            if (res) {
                setMedicines(res);
            }
        }
        catch (err) {
            toast.error("Something went wrong!")
        }
    }

    useEffect(() => {
        getAppointment()
        getMedicines()
        getRecords()
    }, [])
    return (
        <>

            <div className="page-title">
                <div className="heading">
                    <div className="container">
                        <div className="row d-flex justify-content-center text-center">
                            <div className="col-lg-8">
                                <h1 className="heading-title ">Medical Records</h1>

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
                            <li className="current">Medical Records</li>
                        </ol>
                    </div>
                </nav>
            </div>
            {/* Medical Summary */}
<div className="medical-summary container mt-5">

    <div className="row g-3">
        <div className="col-12 col-md-6 col-lg-4">
            <div className="summary-card d-flex align-items-center gap-3 p-3 bg-white border-0 rounded-3 shadow-sm h-100">

                <div
                    className="summary-icon d-flex align-items-center justify-content-center rounded-3 flex-shrink-0"
                    style={{
                        width: "50px",
                        height: "50px",
                        backgroundColor: "#f0f7f8"
                    }}
                >
                    <i className="bi bi-calendar-check fs-4"></i>
                </div>

                <div className="summary-content">
                    <span className="d-block text-muted  fs-6 fw-bold">
                        Total Visits
                    </span>

                    <strong className="d-block fs-4">
                        {appointments.length}
                    </strong>

                    <small className="text-muted">
                        Completed visits
                    </small>
                </div>

            </div>
        </div>


        
        <div className=" col-12 col-md-6 col-lg-4">
            <div className="summary-card d-flex align-items-center gap-3 p-3 bg-white border-0 rounded-3 shadow-sm h-100">

                <div
                    className="summary-icon d-flex align-items-center justify-content-center rounded-3 flex-shrink-0"
                    style={{
                        width: "50px",
                        height: "50px",
                        backgroundColor: "#f0f7f8"
                    }}
                >
                    <i className="bi bi-file-medical fs-4"></i>
                </div>

                <div className="summary-content">
                    <span className="d-block text-muted  fs-6 fw-bold">
                        Medical Records
                    </span>

                    <strong className="d-block fs-4">
                        {records.length}
                    </strong>

                    <small className="text-muted">
                        Available records
                    </small>
                </div>

            </div>
        </div>


        {/* Last Visit */}
        <div className="summary-card col-12 col-md-6 col-lg-4">
            <div className=" d-flex align-items-center gap-3 p-3 bg-white border-0  rounded-3 shadow-sm h-100">

                <div
                    className="summary-icon d-flex align-items-center justify-content-center rounded-3 flex-shrink-0"
                    style={{
                        width: "50px",
                        height: "50px",
                        backgroundColor: "#f0f7f8"
                    }}
                >
                    <i className="bi bi-clock-history fs-4"></i>
                </div>

                <div className="summary-content">
                    <span className="d-block text-muted  fs-6 fw-bold">
                        Last Visit
                    </span>

                    <strong className="d-block fs-5">
                        {appointments.length > 0
                            ? appointments[0].appointmentDate
                            : "—"}
                    </strong>

                    <small className="text-muted">
                        Recent consultation
                    </small>
                </div>

            </div>
        </div>

    </div>

</div>

            <section id="appointmnet" className="appointmnet section">
                <div className="container" >
                    {appointments.length > 0 ? (

                        <div className="records-accordion">

                            <div
                                className="accordion"
                                id="appointmentAccordion"
                            >

                                {appointments.map((appt, index) => {

                                    // Find the record belonging to THIS appointment
                                    const record = records.find(
                                        (record) => record.appointmentId === appt.id
                                    );
                                    const prescription = medicines.find(
                                        (prescription) => prescription.medicalRecordId === record?.id
                                    );

                                    // Unique ID for each accordion
                                    const accordionId = `appointment-${index}`;

                                    return (

                                        <div
                                            className="accordion-item appointment-item"
                                            key={appt.id}
                                        >

                                            <h2 className="accordion-header">

                                                <button
                                                    className="accordion-button"
                                                    type="button"
                                                    data-bs-toggle="collapse"
                                                    data-bs-target={`#${accordionId}`}
                                                    aria-expanded={index === 0}
                                                    aria-controls={accordionId}
                                                >

                                                    <div className="appointment-header-content">

                                                        <div className="appointment-date-icon">
                                                            <i className="bi bi-calendar3"></i>
                                                        </div>

                                                        <div className="appointment-main-info">

                                                            <div className="appointment-top-row">

                                                                <span className="appointment-date">
                                                                    {appt.appointmentDate}
                                                                </span>

                                                                <span className="appointment-time">
                                                                    {appt.appointmentTime}
                                                                </span>

                                                                <span className="completed-badge">
                                                                    {appt.appointmentStatus}
                                                                </span>

                                                            </div>

                                                            <div className="appointment-reason">
                                                                {appt.reason || "Consultation"}
                                                            </div>

                                                        </div>

                                                    </div>

                                                </button>

                                            </h2>

                                            <div
                                                id={accordionId}
                                                className={`accordion-collapse collapse ${index === 0 ? "show" : ""
                                                    }`}
                                                data-bs-parent="#appointmentAccordion"
                                            >

                                                <div className="accordion-body">


                                                    <div className="section-title">

                                                        <i className="bi bi-calendar-check"></i>

                                                        Appointment Details

                                                    </div>


                                                    <div className="appointment-details-box">

                                                        <div>
                                                            <span>Date</span>

                                                            <strong>
                                                                {appt.appointmentDate}
                                                            </strong>
                                                        </div>


                                                        <div>
                                                            <span>Time</span>

                                                            <strong>
                                                                {appt.appointmentTime}
                                                            </strong>
                                                        </div>


                                                        <div>
                                                            <span>Reason</span>

                                                            <strong>
                                                                {appt.reason}
                                                            </strong>
                                                        </div>


                                                        <div>
                                                            <span>Status</span>

                                                            <strong className="text-success">
                                                                {appt.appointmentStatus}
                                                            </strong>
                                                        </div>

                                                    </div>


                                                    <div className="section-title medical-record-title">

                                                        <i className="bi bi-file-medical"></i>

                                                        Medical Record

                                                    </div>


                                                    {record ? (

                                                        <div className="medical-record-box">

                                                            <div className="record-field">

                                                                <span>
                                                                    Diagnosis
                                                                </span>

                                                                <p>
                                                                    {record.diagnosis || "—"}
                                                                </p>

                                                            </div>


                                                            <div className="record-field">

                                                                <span>
                                                                    Symptoms
                                                                </span>

                                                                <p>
                                                                    {record.symptoms || "—"}
                                                                </p>

                                                            </div>


                                                            <div className="record-field">

                                                                <span>
                                                                    Treatment
                                                                </span>

                                                                <p>
                                                                    {record.treatment || "—"}
                                                                </p>

                                                            </div>


                                                            <div className="record-field">

                                                                <span>
                                                                    Doctor's Notes
                                                                </span>

                                                                <p>
                                                                    {record.notes || "—"}
                                                                </p>

                                                            </div>

                                                        </div>

                                                    ) : (

                                                        <div className="medical-record-box">

                                                            <p className="mb-0">
                                                                No medical record available for this appointment.
                                                            </p>

                                                        </div>

                                                    )}

                                                    {prescription ? (
                                                        <div className="">
                                                            <div className="section-title prescription-title">
                                                                <i className="bi bi-capsule"></i>
                                                                Prescription
                                                            </div>

                                                            <div className="medical-record-box">

                                                                <div className="prescription-content">

                                                                    <div className="record-field">
                                                                        <span>
                                                                            <i className="bi bi-capsule me-2"></i>
                                                                            Medicines
                                                                        </span>

                                                                        <p>
                                                                            {prescription.medicines || "—"}
                                                                        </p>
                                                                    </div>

                                                                    <div className="record-field">
                                                                        <span>
                                                                            <i className="bi bi-info-circle me-2"></i>
                                                                            Instructions
                                                                        </span>

                                                                        <p>
                                                                            {prescription.instructions || "—"}
                                                                        </p>
                                                                    </div>

                                                                </div>

                                                                <div className="next-visit my-3">
                                                                    <i className="bi bi-calendar-event"></i>

                                                                    <div>
                                                                        <span className="fs-6 fw-bold text-dark">Next Visit</span>

                                                                        <strong>
                                                                            {prescription.nextVisitDate || "Not scheduled"}
                                                                        </strong>
                                                                    </div>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className="medical-record-box">
                                                            <p className="mb-0">
                                                                No prescription available for this appointment.
                                                            </p>
                                                        </div>
                                                    )}

                                                </div>

                                            </div>

                                        </div>

                                    );

                                })}

                            </div>

                        </div>

                    ) : (

                        <div>
                            No completed appointments found.
                        </div>

                    )}
                </div>
            </section>
        </>
    )

}
export default RecordHistory;