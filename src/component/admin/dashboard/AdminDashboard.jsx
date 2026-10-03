import { useEffect, useState } from "react";
import AuthService from "../../../services/AuthService"
import BillService from "../../../services/BillService"
import PatientService from "../../../services/PatientService"
import DoctorServices from "../../../services/DoctorServices"
import AppointmentService from "../../../services/AppointmentService"
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function admin() {
    const [loading, setLoading] = useState(true)
    const [bills, setBills] = useState([])
    const [appointments, SetAppointments] = useState([])
    const [patients, SetPatients] = useState([])
    const [doctors, SetDoctors] = useState([])
    const now = new Date()

    async function fetchBills() {
        try {
            let res = await BillService.allBills()
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
    async function fetchPatients() {
        try {
            let res = await PatientService.all()
            SetPatients(res)
        }
        catch (err) {
            toast.error("Something went wrong")
            console.log(err)
        }
        finally {
            setLoading(false)
        }
    }
    async function fetchDoctors() {
        try {
            let res = await DoctorServices.all()
            SetDoctors(res)
        }
        catch (err) {
            toast.error("Something went wrong")
            console.log(err)
        }
        finally {
            setLoading(false)
        }
    }
    const formattedDate = new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
    })


    const thisMonth = bills.filter((bill) => {

        if (!bill.createdAt) return false;

        const date = bill.createdAt?.toDate
            ? bill.createdAt.toDate()
            : new Date(bill.createdAt);

        return (
            date.getMonth() === now.getMonth() &&
            date.getFullYear() === now.getFullYear()
        );
    });

    const monthlyEarnings = thisMonth.reduce((total, bill) => {
        return total + Number(bill.totalAmount);
    }, 0);

    const completedAppointments = appointments.filter((appt) => {

        if (!appt.createdAt) return false;

        const date = appt.createdAt?.toDate
            ? appt.createdAt.toDate()
            : new Date(appt.createdAt);

        return (
            date.getMonth() === now.getMonth() &&
            date.getFullYear() === now.getFullYear() &&
            appt.status === "Completed"
        );
    });

    const todayAppointments = appointments.filter((appt) => {
        if (!appt.createdAt) return false;

        const date = appt.createdAt?.toDate
            ? appt.createdAt.toDate()
            : new Date(appt.createdAt);

        return (
            date.getDate() === now.getDate() &&
            date.getMonth() === now.getMonth() &&
            date.getFullYear() === now.getFullYear() &&
            appt.status === Pending
        );
    })
    const completedApptThisMonth = completedAppointments.length
    const totaldoctors = doctors.length
    const totalpatient = patients.length

    useEffect(() => {
        fetchBills()
        fetchAppointments()
        fetchPatients()
        fetchDoctors()
    }, [])
    return (
        <>

            <div className="page-title px-3 mt-3 pt-5 mb-lg-0 pb-lg-0">
                <div className="heading ">
                    <div className="container-fluid">
                        <div className=" d-flex justify-content-between align-items-start text-start">
                            <div className="w-100">
                                <p className=" text-start fs-6 fw-bolder mb-1 text-secondary p-0">ADMIN DASHBOARD</p>
                                <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between mb-2 mb-lg-0">
                                    <h1 className="heading-title">
                                        Welcome back, Admin
                                    </h1>
                                    <span className="border border-1 rounded p-2">
                                        <i className="bi bi-calendar fs-3 me-2 " style={{ color: ' #112344' }}></i>
                                        <span className="fs-4" style={{ color: ' #112344' }}>{formattedDate}</span>
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
                                <h2 className="fw-bold mb-1">{totaldoctors}</h2>
                                <small className="text-secondary fs-6">Active Doctors</small>
                            </div>
                        </div>
                    </div>

                    <div className="dashcard patient border border-1 rounded border-success p-2 d-flex align-items-start me-2 gap-3">
                        <span><i className="bi bi-person-circle text-success opacity-75 fs-1 "></i></span>
                        <div>
                            <h6 className="fw-bold pt-2 text-secondary text-start"> Patients</h6>
                            <div className="text-start">
                                <h2 className="fw-bold mb-1">{totalpatient}</h2>
                                <small className="text-secondary fs-6">Registered Patients</small>
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

                    <div className="dashcard revenue border border-1 rounded border-warning p-2 d-flex align-items-start me-2 gap-3">

                        <span><i className="bi bi-currency-rupee text-warning-emphasis opacity-75 fs-1"></i></span>
                        <div>
                            <h6 className="fw-bold pt-2 text-secondary text-start"> Revenue</h6>
                            <div className="text-start">
                                <h2 className="fw-bold mb-1">₹{monthlyEarnings.toLocaleString("en-IN")}</h2>
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
                            <div>
                                <i className="d-inline quickact fs-4 me-3 bi bi-calendar-event"></i>
                                <h4 className="d-inline text-start">Today's Appointments</h4>
                            </div>
                            <div>
                                <Link to="/admin/manageappts" className="d-none d-md-block">
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

                        <div className="d-flex align-items-center justify-content-between quickcard border border-0 rounded  py-1 px-3 mx-2 flex-fill mb-2">
                            <i className="quickact fs-4 bi bi-calendar-event"></i>
                            <Link to="/admin/manageappts" className="quickact fw-bold text-nowrap">View Appointments</Link>
                            <i className="bi bi-arrow-right-short quickact fs-4"></i>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}