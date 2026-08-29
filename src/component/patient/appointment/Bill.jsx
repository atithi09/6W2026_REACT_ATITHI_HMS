import { useEffect, useState } from "react";
import BillService from "../../../services/BillService";
import AuthService from "../../../services/AuthService";
import { Link } from "react-router-dom";
import { RingLoader } from "react-spinners";

const override = {
    display: "block",
    margin: "0 auto",
}
export default function Bills() {

    const [bills, setBills] = useState([]);
    const [loading, setLoading] = useState(true);

    async function fetchBills() {

        try {

            const patientId = AuthService.uid();

            const res = await BillService.BillByPatient(patientId);

            setBills(res);

        } catch (err) {

            console.log("Error fetching bills:", err);

        } finally {

            setLoading(false);

        }
    }
    useEffect(() => {
        fetchBills();
    }, []);


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
                        <div className="row justify-content-center text-center">
                            <div className="col-lg-8">
                                <h1 className="heading-title">My Bills</h1>
                                <p className="mb-0">
                                    Manage your personal information, update your contact details, and keep your profile up to date. Your profile helps us provide a personalized, secure, and seamless healthcare experience.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <nav className="breadcrumbs">
                    <div className="container">
                        <ol>
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li className="current">Bills</li>
                        </ol>
                    </div>
                </nav>
            </div>



            {bills.length === 0 ? (<div className="col-12">
                <div className="card border-0 shadow-sm text-center py-5">
                    <div className="card-body">
                        <i
                            className="bi bi-receipt fs-1"
                            style={{ fontSize: "4rem" }}
                        ></i>

                        <h4 className="mt-3 fw-bold">
                            No Bills Found
                        </h4>

                        <p className="text-muted mb-4">
                            You don't have any appointment bills yet.

                        </p>

                    </div>
                </div>
            </div>

            ) :
                <div className="container my-5">

                    <div className="row">

                        {bills.map((bill) => (
                            <div
                                className="col-md-8 col-lg-6 mb-4"
                                key={bill.id}
                            >

                                <div className="card shadow border-0 rounded-4">
                                    <div className="card-body p-4">
                                        <div className="d-flex justify-content-between align-items-center mb-3">

                                            <div>

                                                <small className="text-muted">
                                                    Invoice
                                                </small>

                                                <h5 className="mb-0">
                                                    {bill.invoiceNumber}
                                                </h5>

                                            </div>

                                            <span className="badge py-2 px-4 fs-6 bg-success">
                                                {bill.paymentStatus}
                                            </span>

                                        </div>
                                        <div>
                                            <strong>Appointment Date: </strong>
                                            <span>{bill.createdAt?.toDate().toLocaleDateString()}</span>
                                        </div>

                                        <hr />


                                        <div className="row">

                                            <div className="col-md-6">

                                                <p className="mb-2">
                                                    <strong>Payment Method:</strong>
                                                    <br />
                                                    {bill.paymentMethod}
                                                </p>

                                            </div>


                                            <div className="col-md-6">

                                                <p className="mb-2">
                                                    <strong>Payment ID:</strong>
                                                    <br />
                                                    {bill.paymentId}
                                                </p>

                                            </div>

                                        </div>


                                        <hr />


                                        <div className="d-flex justify-content-between">

                                            <strong>
                                                Consultation Fee
                                            </strong>

                                            <span>
                                                ₹{bill.consultationFee}
                                            </span>

                                        </div>


                                        <div className="d-flex justify-content-between mt-2 fs-5">

                                            <strong>
                                                Total
                                            </strong>

                                            <strong>
                                                ₹{bill.totalAmount}
                                            </strong>

                                        </div>


                                        <button
                                            className="btn btn-primary mt-4"
                                        >
                                            Download Bill
                                        </button>

                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>

            }


        </>
    );
}