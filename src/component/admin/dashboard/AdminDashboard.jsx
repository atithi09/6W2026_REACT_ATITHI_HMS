import { useState } from "react";
import AuthService from "../../../services/AuthService"
import { Link } from "react-router-dom";
export default function admin() {
    const formattedDate = new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
    })
    return (
        <>

            <div className="page-title m-md-3 p-md-5 mt-3 pt-3 mb-lg-0 pb-lg-0">
                <div className="heading">
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
            <div className="mx-3 px-5">
                <div className="d-flex flex-wrap justify-content-between">
                    <div className="dashcard shadow rounded p-2 d-flex align-items-start gap-3">
                        <span><i className="bi bi-person-circle text-primary opacity-50 fs-1"></i></span>
                        <h5 className="fw-bold text-primary-emphasis p-2"> Doctors</h5>
                    </div>
                    <div className="dashcard shadow rounded p-2 d-flex align-items-start gap-3">
                       <span><i className="bi bi-person-circle text-success opacity-50 fs-1"></i></span>
                        <h5 className="fw-bold text-success p-2"> Patients</h5>
                    </div>

                    <div className="dashcard shadow rounded p-2 d-flex align-items-start gap-3">
                       <span><i className="bi bi-person-circle text-danger opacity-50 fs-1"></i></span>
                        <h5 className="fw-bold p-2 text-danger"> Appoitnments</h5>
                    </div>

                    <div className="dashcard shadow rounded p-2 d-flex align-items-start gap-3">
                      <span><i className="bi bi-person-circle text-warning-emphasis opacity-50 fs-1"></i></span>
                        <h5 className="fw-bold text-warning-emphasis p-2"> Revenue</h5>
                    </div>

                </div>


            </div>
        </>
    );
}