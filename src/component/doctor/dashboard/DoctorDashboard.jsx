import { Link } from "react-router-dom"
import AuthService from "../../../services/AuthService"
import { useEffect, useState } from "react"
import DoctorServices from "../../../services/DoctorServices"
import { toast } from "react-toastify"
import AppointmentService from "../../../services/AppointmentService"
import PatientService from "../../../services/PatientService"
import BillService from "../../../services/BillService"
import { RingLoader } from 'react-spinners'

const override = {
    display: "block",
    margin: "0 auto",
}
export default function DoctorDashboard() {
    const uid = AuthService.uid()
    const [loading, setLoading] = useState(true)
    const [doctor, setDoctor] = useState([])
    const [appointments, SetAppointments] = useState([])
    const [patients, setPatients] = useState([])
    const [bills, setBills] = useState([])
    const now = new Date()
    const formattedDate = new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
    })

    const thisMonth = bills.filter((bill) => {
        const date = bill.createdAt.toDate();
        return (
            date.getMonth() === now.getMonth() &&
            date.getFullYear() === now.getFullYear()
        );
    });
    
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
    async function fetchBills() {
        try {
            let res = await BillService.BillByDoctor(uid)
            setBills(res)
        }
        catch (err) {
            toast.error("Something went wrong")
            console.log(err)
        }
        finally {
            setLoading(false)
        }
    }
    const monthlyEarnings = thisMonth.reduce((total, bill) => {
        return total + Number(bill.totalAmount);
    }, 0);

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
    const completedAppointments = appointments.filter((appt) => {

        if (!appt.createdAt) return false;

        const date = appt.createdAt?.toDate
            ? appt.createdAt.toDate()
            : new Date(appt.createdAt);

        return (
            date.getMonth() === now.getMonth() &&
            date.getFullYear() === now.getFullYear() &&
            appt.status === "Completed" &&
            appt.doctorId === uid
        );
    });
    const pendingAppointments = appointments.filter((appt) => {

        if (!appt.createdAt) return false;

        const date = appt.createdAt?.toDate
            ? appt.createdAt.toDate()
            : new Date(appt.createdAt);

        return (
            date.getFullYear() === now.getFullYear() &&
            appt.status === "Pending" &&
            appt.doctorId === uid
        );
    });
    const completedApptThisMonth = completedAppointments.length
    const pendingAppointmentsCount = pendingAppointments.length

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
        fetchBills()
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
                            <h6 className="fw-bold pt-2 text-secondary text-start"> Appointments</h6>
                            <div className="text-start">
                                <h2 className="fw-bold mb-1">{pendingAppointmentsCount}</h2>
                                <small className="text-secondary fs-6 text-nowrap">Pending Appointments</small>
                            </div>
                        </div>
                    </div>

                    <div className="dashcard appointment border border-1 rounded border-danger p-2 d-flex align-items-start me-2 gap-3">
                        <span><i className="bi bi-calendar-event text-danger opacity-75 fs-1"></i></span>
                        <div>
                            <h6 className="fw-bold pt-2 text-secondary text-start "> Appointments</h6>
                            <div className="text-start">
                                <h2 className="fw-bold mb-1">{completedApptThisMonth}</h2>
                                <small className="text-secondary fs-6">This Month</small>
                            </div>
                        </div>
                    </div>

                    <div className="dashcard patient border border-1 rounded border-success p-2 d-flex align-items-start me-2 gap-3">
                        <span><i className="bi bi-person-circle text-success opacity-75 fs-1 "></i></span>
                        <div>
                            <h6 className="fw-bold pt-2 text-secondary text-start"> Patients</h6>
                            <div className="text-start">
                                <h2 className="fw-bold mb-1">{doctorPatients.length}</h2>
                                <small className="text-secondary fs-6">Patients Treated</small>
                            </div>
                        </div>
                    </div>

                    <div className="dashcard revenue border border-1 rounded border-warning p-2 d-flex align-items-start me-2 gap-3">

                        <span><i className="bi bi-currency-rupee text-warning-emphasis opacity-75 fs-1"></i></span>
                        <div>
                            <h6 className="fw-bold pt-2 text-secondary text-start"> Revenue</h6>
                            <div className="text-start">
                                <h2 className="fw-bold mb-1">₹ {monthlyEarnings}</h2>
                                <small className="text-secondary fs-6">{now.toLocaleString("en-IN", {
                                    month: "long",
                                    year: "numeric"
                                })}</small>
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
                                <Link to="/doctor/viewappt" className="d-none d-md-block">
                                    <div>
                                        View All <i className="bi bi-arrow-right-short quickact fs-4"></i>
                                    </div>
                                </Link>
                            </div>
                        </div>
                        {todayAppointments.length > 0 ? (
                            <div className="table-responsive shadow-sm rounded m-5">
                                <table className="table table-hover align-middle text-center mb-0">

                                    <thead className="table-primary">
                                        <tr >
                                            <th className='text-nowrap '>Patient Name</th>
                                            <th className='text-nowrap'>Doctor Name</th>
                                            <th className='date-column'>Time</th>
                                            <th>Date</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {todayAppointments.map((appt, index) => (
                                            <tr key={appt.id}>

                                                <td className='text-nowrap'>
                                                    {patients.find((p) => p.id === appt.patientId)?.name}
                                                </td>

                                                <td className='text-nowrap'>
                                                    {doctors.find((d) => d.id === appt.doctorId)?.name}
                                                </td>

                                                <td >{appt.appointmentTime}</td>

                                                <td className='text-nowrap'>{appt.appointmentDate}</td>

                                                <td>
                                                    {appt.appointmentStatus === "Pending" && (
                                                        <span className="badge appBadge bg-warning  fs-6">
                                                            Pending
                                                        </span>
                                                    )}

                                                    {appt.appointmentStatus === "Accepted" && (
                                                        <span className="badge appBadge bg-success fs-6">
                                                            Accepted
                                                        </span>
                                                    )}

                                                    {appt.appointmentStatus === "Cancelled" && (
                                                        <span className="badge appBadge bg-danger fs-6">
                                                            Cancelled
                                                        </span>
                                                    )}

                                                    {appt.appointmentStatus === "Completed" && (
                                                        <span className="badge appBadge bg-success  fs-6">
                                                            Completed
                                                        </span>
                                                    )}
                                                </td>

                                            </tr>
                                        ))}
                                    </tbody>

                                </table>
                            </div>) :
                            (<div className="container">
                                <div className="card border-0  text-center m-3 ">

                                    <div className="card-body">

                                        <i
                                            className="bi bi-calendar2-x opacity-50 text-primary"
                                            style={{ fontSize: "4rem" }}
                                        ></i>

                                        <h4 className="mt-3 fw-bold">
                                            No Appointments Scheduled
                                        </h4>

                                        <p className="text-muted mb-4">
                                            You don't have any appointments at the moment.
                                            Check back later for new bookings.
                                        </p>

                                    </div>

                                </div>
                            </div>
                            )}
                    </div>

                    <div className="d-flex flex-column h-100 gap-2 border border-1 flex-grow-1 rounded p-2 " style={{ flex: 1 }} >
                        <h4 className="text-center py-2 px-5">Quick Actions</h4>

                        <div className="d-flex align-items-center justify-content-between quickcard border border-0 rounded  py-1 px-3 mx-2 flex-fill">
                            <i className="quickact fs-4 bi bi-calendar-event"></i>
                            <Link to="/doctor/appthitory" className="quickact fw-bold text-nowrap">View Appointment History</Link>
                            <i className="bi bi-arrow-right-short quickact fs-4"></i>
                        </div>

                        <div className="d-flex align-items-center justify-content-between quickcard border border-0 rounded  py-1 px-3 mx-2 flex-fill">
                            <i className="quickact fs-4 bi bi-person-check"></i>
                            <Link to="/doctor/viewpatient" className="quickact fw-bold">view Patients</Link>
                            <i className="bi bi-arrow-right-short quickact fs-4"></i>
                        </div>


                        <div className="d-flex align-items-center justify-content-between quickcard border border-0 rounded  py-1 px-3 mx-2 flex-fill">
                            <i className="quickact fs-4 bi bi-coin"></i>
                            <Link to="/doctor/earnings" className="quickact fw-bold">View Bills</Link>
                            <i className="bi bi-arrow-right-short quickact fs-4"></i>
                        </div>

                        <div className="d-flex align-items-center justify-content-between quickcard border border-0 rounded  py-1 px-3 mx-2 flex-fill mb-3">
                            <i className="quickact fs-4 bi bi-people"></i>
                            <Link to="/doctor/managePrescription" className="quickact fw-bold">View Prescriptions</Link>
                            <i className="bi bi-arrow-right-short quickact fs-4"></i>
                        </div>
                        
                    </div>
                </div>

            </div>
        </>
    )
}