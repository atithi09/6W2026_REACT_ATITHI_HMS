import { Link } from "react-router-dom"
import AuthService from "../../../services/AuthService"
import { useEffect, useState } from "react"
import DoctorServices from "../../../services/DoctorServices"
import { toast } from "react-toastify"
import AppointmentService from "../../../services/AppointmentService"
import PatientService from "../../../services/PatientService"

export default function DoctorDashboard() {
    const [loading, setLoading] = useState(true)
    const uid = AuthService.uid()
    const [doctor, setDoctor] = useState([])
    const [appointments, SetAppointments] = useState([])
    const [patients, setPatients] = useState([])
    const now = new Date()
    const formattedDate = new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
    })
    const hour = new Date().getHours();

    let greeting;
    if (hour < 12) {
        greeting = "Good morning";
    } else if (hour < 17) {
        greeting = "Good afternoon";
    } else {
        greeting = "Good evening";
    }

    async function getDoctor() {
        try {
            let res = await DoctorServices.getSingle(uid)
            setDoctor(res)
        }
        catch (err) {
            toast.error("Something went wrong")
        }
    }
    async function fetchAppointments() {
        try {
            let res = await AppointmentService.all()
            SetAppointments(res)
        }
        catch (err) {
            toast.error("Something went wrong")
            console.log(err)
        }
        finally {
            setLoading(false)
        }
    }

    const todayAppointments = appointments.filter((appt) => {
        if (!appt.createdAt) return false;
        const date = appt.createdAt?.toDate
            ? appt.createdAt.toDate()
            : new Date(appt.createdAt);
        return (
            date.getDate() === now.getDate() &&
            date.getMonth() === now.getMonth() &&
            date.getFullYear() === now.getFullYear() &&
            appt.status === Pending &&
            doctorId === uid
        );
    })
    async function fetchPatients() {
        try {
            let res = await PatientService.all()
            setPatients(res)
        }
        catch (err) {
            toast.error("Something went wrong")
        }
        finally {
            setLoading(false)
        }
    }
    const doctorPatients = patients.filter((patient) =>
        appointments.some((appointment) => appointment.patientId === patient.id && appointment.doctorId === uid)
    );

    useEffect(() => {
        getDoctor()
        fetchAppointments()
        fetchPatients()
    }, [])
    return (
        <>
            <div className="page-title px-3 mt-3 pt-5 mb-lg-0 pb-lg-0">
                <div className="heading ">
                    <div className="container-fluid">
                        <div className=" d-flex justify-content-between align-items-start text-start">
                            <div className="w-100">
                                <p className=" text-start fs-6 fw-bolder mb-2 text-secondary p-0">DOCTOR DASHBOARD</p>
                                <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between  mb-2 mb-lg-0 text-start ">
                                    <h2 className="dashboard-greeting">
                                        <span >{greeting},</span>{" "}
                                        <span className="mb-2 mb-md-0">{doctor.name}</span>
                                    </h2>
                                    <span className="border border-1 rounded p-2 mb-2 mb-md-0">
                                        <i className="bi bi-calendar fs-4 me-2 " style={{ color: ' #112344' }}></i>
                                        <span className="fs-5 " style={{ color: ' #112344' }}>{formattedDate}</span>
                                    </span>
                                </div>
                                <p className=" text-start fs-6 fw-bolder mb-0 text-secondary pt-0">Here is an overview of your
                                    hospital management system
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div className="px-3 mx-3">
                <div className="d-flex flex-wrap justify-content-md-between justify-content-center">
                    <div className="dashcard doctor border border-1 border-primary rounded p-2 me-2 d-flex align-items-start gap-3">
                        <span><i className="bi bi-person-circle text-primary opacity-75 fs-1 "></i></span>
                        <div>
                            <h6 className="fw-bold pt-2 text-secondary text-start"> Doctors</h6>
                            <div className="text-start">
                                <h2 className="fw-bold mb-1"></h2>
                                <small className="text-secondary fs-6">Active Doctors</small>
                            </div>
                        </div>
                    </div>

                    <div className="dashcard patient border border-1 rounded border-success p-2 d-flex align-items-start me-2 gap-3">
                        <span><i className="bi bi-person-circle text-success opacity-75 fs-1 "></i></span>
                        <div>
                            <h6 className="fw-bold pt-2 text-secondary text-start"> Patients</h6>
                            <div className="text-start">
                                <h2 className="fw-bold mb-1">{doctorPatients.length}</h2>
                                <small className="text-secondary fs-6">Registered Patients</small>
                            </div>
                        </div>
                    </div>

                    <div className="dashcard appointment border border-1 rounded border-danger p-2 d-flex align-items-start me-2 gap-3">
                        <span><i className="bi bi-calendar-event text-danger opacity-75 fs-1"></i></span>
                        <div>
                            <h6 className="fw-bold pt-2 text-secondary text-start "> Appointments</h6>
                            <div className="text-start">
                                <h2 className="fw-bold mb-1"></h2>
                                <small className="text-secondary fs-6">This Month</small>
                            </div>
                        </div>
                    </div>

                    <div className="dashcard revenue border border-1 rounded border-warning p-2 d-flex align-items-start me-2 gap-3">

                        <span><i className="bi bi-currency-rupee text-warning-emphasis opacity-75 fs-1"></i></span>
                        <div>
                            <h6 className="fw-bold pt-2 text-secondary text-start"> Revenue</h6>
                            <div className="text-start">
                                <h2 className="fw-bold mb-1">₹</h2>
                                <small className="text-secondary fs-6"></small>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="row align-items-stretch d-flex flex-column flex-md-row justify-content-evenly px-3 gap-3 mb-5">

                    <div className="border border-1 rounded pb-3 h-100 " style={{ flex: 2 }}>
                        <div className="p-3 d-flex justify-content-between ">
                            <div className="d-flex">
                                <i className="d-inline quickact fs-4 me-3 bi bi-calendar-event"></i>
                                <h4 className="d-inline text-start text-nowrap">Today's Appointments</h4>
                            </div>
                            <div>
                                <Link to="/admin/manageappts" className="d-none d-md-block">
                                    <div>
                                        View All <i className="bi bi-arrow-right-short quickact fs-4"></i>
                                    </div>
                                </Link>
                            </div>
                        </div>

                    </div>

                    <div className="d-flex flex-column h-100 gap-2 border border-1 flex-grow-1 rounded p-2 " style={{ flex: 1 }} >
                        <h4 className="text-center py-2 px-5">Quick Actions</h4>

                        <div className="d-flex align-items-center justify-content-between quickcard border border-0 rounded  py-1 px-3 mx-2 flex-fill">
                            <i className="quickact fs-4 bi bi-person-add"></i>
                            <Link to='/admin/addDoc' className="quickact fw-bold">Add Doctor</Link>
                            <i className="bi bi-arrow-right-short quickact fs-4"></i>
                        </div>

                        <div className="d-flex align-items-center justify-content-between quickcard border border-0 rounded  py-1 px-3 mx-2 flex-fill">
                            <i className="quickact fs-4 bi bi-people"></i>
                            <Link to="/admin/managedoc" className="quickact fw-bold">Manage Doctors</Link>
                            <i className="bi bi-arrow-right-short quickact fs-4"></i>
                        </div>

                        <div className="d-flex align-items-center justify-content-between quickcard border border-0 rounded  py-1 px-3 mx-2 flex-fill">
                            <i className="quickact fs-4 bi bi-person-check"></i>
                            <Link to="/admin/managepatient" className="quickact fw-bold">Manage Patients</Link>
                            <i className="bi bi-arrow-right-short quickact fs-4"></i>
                        </div>

                        <div className="d-flex align-items-center justify-content-between quickcard border border-0 rounded  py-1 px-3 mx-2 flex-fill">
                            <i className="quickact fs-4 bi bi-building-add"></i>
                            <Link to='/admin/addDepartment' className="quickact fw-bold">Add Department</Link>
                            <i className="bi bi-arrow-right-short quickact fs-4"></i>
                        </div>

                        <div className="d-flex align-items-center justify-content-between quickcard border border-0 rounded  py-1 px-3 mx-2 flex-fill mb-3">
                            <i className="quickact fs-4 bi bi-calendar-event"></i>
                            <Link to="/admin/manageappts" className="quickact fw-bold text-nowrap">View Appointments</Link>
                            <i className="bi bi-arrow-right-short quickact fs-4"></i>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}