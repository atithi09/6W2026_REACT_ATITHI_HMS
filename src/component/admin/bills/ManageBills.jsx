import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AuthService from '../../../services/AuthService'
import PatientService from '../../../services/PatientService'
import { RingLoader } from 'react-spinners'
import { toast } from 'react-toastify'
import BillService from '../../../services/BillService'
import DoctorServices from '../../../services/DoctorServices'

const override = {
    display: "block",
    margin: "0 auto",
}

export default function ManageBills() {
    const [loading, setLoading] = useState(true)
    const [bills, setBills] = useState([])
    const [patients, setPatients] = useState([])
    const [doctors, setDoctors] = useState([])
    const now = new Date()
    const thisMonth = bills.filter((bill) => {
        const date = bill.createdAt.toDate();
        return (
            date.getMonth() === now.getMonth() &&
            date.getFullYear() === now.getFullYear()
        );
    });
    const thisYear = bills.filter((bill) => {
        const date = bill.createdAt.toDate()
        return (
            date.getFullYear() === now.getFullYear()
        );
    });

    const totalEarnings = bills.reduce((total, bill) => {
        return total + Number(bill.totalAmount)
    }, 0)

    const monthlyEarnings = thisMonth.reduce((total, bill) => {
        return total + Number(bill.totalAmount);
    }, 0);

    const yearlyEarnings = thisYear.reduce((total, bill) => {
        return total + Number(bill.totalAmount);
    }, 0);

    async function fetchBills() {
        try {
            let res = await BillService.allBills()
            setBills(res)
            console.log(res)
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
        let res = await PatientService.all()
        setPatients(res)
    }
    async function fetchDoctors() {
        let res = await DoctorServices.all()
        setDoctors(res)
    }

    useEffect(() => {
        fetchBills()
        fetchPatients()
        fetchDoctors()
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
                                <h1 className="heading-title ">Earnings</h1>
                                <p className="mb-0">
                                    Track your consultation earnings and review your billing history.
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
                            <li className="current">Earnings</li>
                        </ol>
                    </div>
                </nav>
            </div>

            <div className="container mt-4">
                <div className="row g-4 mb-4">

                    <div className="col-md-4">
                        <div className="card border-0 shadow-sm rounded-4 h-100">
                            <div className="card-body p-4">
                                <div className="d-flex justify-content-between align-items-start">
                                    <div>
                                        <p className="text-muted mb-2">Total Earnings</p>
                                        <h2 className="fw-bold mb-1">₹{totalEarnings}</h2>
                                        <small className="text-muted">All time</small>
                                    </div>

                                    <div className="bg-primary bg-opacity-10 rounded-circle p-3">
                                        <i className="bi bi-wallet2 text-primary fs-4"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card border-0 shadow-sm rounded-4 h-100">
                            <div className="card-body p-4">
                                <div className="d-flex justify-content-between align-items-start">
                                    <div>
                                        <p className="text-muted mb-2">This Year</p>
                                        <h2 className="fw-bold mb-1">₹{yearlyEarnings.toLocaleString("en-IN")}</h2>
                                        <small className="text-muted">January-{now.toLocaleString("en-IN", {
                                            month: "long",
                                            year: "numeric"
                                        })}</small>
                                    </div>

                                    <div className="bg-warning bg-opacity-10 rounded-circle p-3">
                                        <i className="bi bi-bar-chart-line text-warning fs-4"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card border-0 shadow-sm rounded-4 h-100">
                            <div className="card-body p-4">
                                <div className="d-flex justify-content-between align-items-start">
                                    <div>
                                        <p className="text-muted mb-2">This Month</p>
                                        <h2 className="fw-bold mb-1">₹{monthlyEarnings.toLocaleString("en-IN")}</h2>
                                        <small className="text-muted">{now.toLocaleString("en-IN", {
                                            month: "long",
                                            year: "numeric"
                                        })}</small>
                                    </div>

                                    <div className="bg-success bg-opacity-10 rounded-circle p-3">
                                        <i className="bi bi-calendar-check text-success fs-4"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {bills.length >
                0 ?
                <div className="container">

                    <div className="d-flex justify-content-between my-3">

                        <div className="mt-4 mb-2">
                            <h3>Consultation Bills</h3>
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
                                        <th className='text-nowrap'>Doctor Name</th>
                                        <th className='text-nowrap'>Invoice Number</th>
                                        <th className='text-nowrap'>Amount</th>
                                        <th className='text-nowrap'>Date</th>
                                        <th className='text-nowrap'>Payment Status</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {bills.map((bill, index) => (
                                        <tr key={bill.id}>
                                            <td>{index + 1}</td>

                                            <td className='text-nowrap'>{patients.find((p) => p.id == bill.patientId)?.name}</td>
                                            <td className='text-nowrap text-justify'>{doctors.find((p) => p.id == bill.doctorId)?.name}</td>
                                            <td
                                                className="description-cell text-nowrap"
                                            >
                                                {bill.invoiceNumber}
                                            </td>
                                            <td>&#8377;{bill.totalAmount}</td>
                                            <td className='text-nowrap'>
                                                {bill.createdAt?.toDate().toLocaleDateString()}
                                            </td>
                                            <td>
                                                <span className="badge appBadge bg-success fs-6">
                                                    {bill.paymentStatus}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
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
                                No Earning.
                            </h4>

                            <p className="text-muted mb-4">
                                You don't have any Earnings at the moment. Check back later.
                            </p>

                        </div>
                    </div>
                </div>)
            }
        </>
    )
}