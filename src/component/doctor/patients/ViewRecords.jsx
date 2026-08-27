import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import PatientService from "../../../services/PatientService";
import AppointmentService from "../../../services/AppointmentService";
import MedicalRecordServices from "../../../services/MedicalRecordServices";
import PrescriptionServices from "../../../services/PrescriptionServices";

export default function ViewRecords() {

    const params = useParams();

    const [patient, setPatient] = useState({});
    const [appointments, setAppointments] = useState([]);
    const [medicalRecords, setMedicalRecords] = useState([]);
    const [medicines, setMedicines] = useState([]);

    async function getAppointments() {
        const res = await AppointmentService.CompletedAppointment(params.id);

        if (res) {
            setAppointments(res);
        }
    }
    async function getPatient() {
        const res = await PatientService.getSingle(params.id);

        if (res) {
            setPatient(res);
        }
    }

    async function getRecords() {
        const res = await MedicalRecordServices.recordByPatient(params.id);

        if (res) {
            setMedicalRecords(res);
        }
    }
    async function getMedicines() {
        const res = await PrescriptionServices.recordByPatient(params.id);
        console.log(res)
        if (res) {
            setMedicines(res)
        }
    }

    const calculateAge = (dob) => {
        if (!dob) return "";

        const birthDate = new Date(dob);
        const today = new Date();

        let age = today.getFullYear() - birthDate.getFullYear();

        const month = today.getMonth() - birthDate.getMonth();

        if (
            month < 0 ||
            (month === 0 && today.getDate() < birthDate.getDate())
        ) {
            age--;
        }

        return age;
    };

    useEffect(() => {
        getPatient();
        getAppointments();
        getRecords();
        getMedicines();
    }, [params.id]);

    return (
        <>
            {/* Page Title */}
            <div className="page-title">

                <div className="heading">
                    <div className="container">
                        <div className="row d-flex justify-content-center text-center">
                            <div className="col-lg-8">

                                <h1 className="heading-title">
                                    Records
                                </h1>

                                <p className="mb-0">
                                    View and manage the patients you have treated,
                                    along with their basic details and medical records.
                                </p>

                            </div>
                        </div>
                    </div>
                </div>

                <nav className="breadcrumbs">
                    <div className="container">
                        <ol>
                            <li>
                                <Link to="/">
                                    Home
                                </Link>
                            </li>

                            <li className="current">
                                Records
                            </li>
                        </ol>
                    </div>
                </nav>

            </div>


            {/* Main Content */}
            <div className="container records-container">

                {/* Back Button */}
                <div className="back-button-wrapper mt-3">

                    <Link
                        to="/doctor/viewpatient"
                        className="back-button"
                    >
                        <i className="bi bi-arrow-left"></i>
                        Back to Patients
                    </Link>

                </div>


                {/* Patient Information */}
                <div className="patient-info-card">

                    <div className="patient-info-heading">

                        <div className="patient-icon">
                            <i className="bi bi-person"></i>
                        </div>

                        <div>
                            <h3>
                                {patient.name}
                            </h3>

                            <p>
                                Patient Information
                            </p>
                        </div>

                    </div>


                    <div className="patient-details">

                        <div className="patient-detail">

                            <span className="detail-label">
                                Gender
                            </span>

                            <strong>
                                {patient.gender}
                            </strong>

                        </div>


                        <div className="patient-detail">

                            <span className="detail-label">
                                Age
                            </span>

                            <strong>
                                {calculateAge(patient.dob)} years
                            </strong>

                        </div>


                        <div className="patient-detail">

                            <span className="detail-label">
                                Status
                            </span>

                            <span className="status-badge text-uppercase">
                                {patient.status}
                            </span>

                        </div>


                        <div className="patient-detail">

                            <span className="detail-label">
                                Total Visits
                            </span>

                            <strong>
                                {appointments.length}
                            </strong>

                        </div>

                    </div>

                </div>


                {/* Medical History Heading */}
                <div className="history-heading">

                    <div>

                        <h2>
                            Medical History
                        </h2>

                        <p>
                            All appointments and medical records associated
                            with this patient.
                        </p>

                    </div>

                    <div className="visit-count">
                        {appointments.length} Visits
                    </div>

                </div>


                {/* Appointment Accordion */}

                {appointments.length > 0 ? (

                    <div className="records-accordion">

                        <div
                            className="accordion"
                            id="appointmentAccordion"
                        >

                            {appointments.map((appt, index) => {

                                // Find the record belonging to THIS appointment
                                const record = medicalRecords.find(
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
        </>
    );
}