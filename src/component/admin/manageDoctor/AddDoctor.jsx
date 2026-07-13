import { useState } from "react"
import DoctorServices from "../../../services/DoctorServices"
import {toast} from "react-toastify"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"


export default function AddDoctor() {

    const[name,setName]=useState('')
    const[email,setEmail]=useState('')
    const[dob,setDOB]=useState('')
    const[mobile,setMobile]=useState('')
    const[department,setDepartment]=useState('')
    const[password,setPassword]=useState('')
    let nav=useNavigate()

    async function registerDoctor(e){
        e.preventDefault()

        if (
        !name.trim() ||
        !email.trim() ||
        !dob.trim() ||
        !department.trim() ||
        !mobile.trim() ||
        !password.trim()
    ) {
        toast.info("All Fields are required ")
       return;
    }
        try{
            let payload = {
                name:name,
                email:email,
                dob:dob,
                department:department,
                mobile:mobile,
                password:password
            }
               await  DoctorServices.registerDoctor(payload);
                toast.success("Doctor Added")
               nav("/admin/managedoc")
               
        }
        catch (error) {
            console.log(error);
            console.log(error.code);
            console.log(error.message);

            if (error.code === "auth/weak-password") {
                toast.error("Password must be at least 6 characters long.");
            } else if (error.code === "auth/email-already-in-use") {
                toast.error("Email already exists.");
            } else {
                toast.error("Something went wrong");
                console.log("error:",error)
            }
        }
        
        
    }
    return (
         <>
            <div className="page-title">
                <div className="heading">
                    <div className="container">
                        <div className="row d-flex justify-content-center text-center">
                            <div className="col-lg-8">
                                <h1 className="heading-title">Doctors</h1>
                                <p className="mb-0">
                                    Odio et unde deleniti. Deserunt numquam exercitationem. Officiis
                                    quo odio sint voluptas consequatur ut a odio voluptatem. Sit
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
                                <Link to='/'>Home</Link>
                            </li>
                            <li className="current">Add Doctors</li>
                        </ol>
                    </div>
                </nav>
            </div>
          
                <section id="appointmnet" className="appointmnet section">
                    <div className="container" >
                        <div className="row">
                            <div className="col-lg-8 mx-auto">
                                <div className="booking-wrapper">
                                    <div
                                        className="booking-header text-center"
                                    >
                                        <h2>Add Doctor</h2>
                                    </div>
                                    <div
                                        className="appointment-form"

                                    >
                                        <form
                                            action=""
                                            method=""
                                            className="php-email-form"
                                            onSubmit={registerDoctor}
                                        >
                                            <div className="row gy-4">
                                                <div className="col-md-6">
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        className="form-control"
                                                        placeholder="Full Name"
                                                        required=""
                                                        onChange={(e)=>{setName(e.target.value)}}
                                                    />
                                                </div>
                                                <div className="col-md-6">
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        className="form-control"
                                                        placeholder="Email Address"
                                                        required
                                                        onChange={(e)=>{setEmail(e.target.value)}}
                                                    />
                                                </div>
                                                <div className="col-md-6">
                                                    <input
                                                        type="tel"
                                                        name="phone"
                                                        className="form-control"
                                                        placeholder="Phone Number"
                                                        required
                                                        onChange={(e)=>{setMobile(e.target.value)}}
                                                    />
                                                </div>
                                                <div className="col-md-6">
                                                    <select
                                                        name="department"
                                                        className="form-select"
                                                        required
                                                        onChange={(e)=>{setDepartment(e.target.value)}}
                                                    >
                                                        <option value="">Select Department</option>
                                                        <option value="general">General Consultation</option>
                                                        <option value="cardiology">Cardiology</option>
                                                        <option value="neurology">Neurology</option>
                                                        <option value="orthopedics">Orthopedics</option>
                                                        <option value="pediatrics">Pediatrics</option>
                                                        <option value="dermatology">Dermatology</option>
                                                        <option value="oncology">Oncology</option>
                                                    </select>
                                                </div>
                                                <div className="col-md-6">
                                                    <input
                                                        type="date"
                                                        name="date"
                                                        className="form-control"
                                                        required
                                                        onChange={(e)=>{setDOB(e.target.value)}}
                                                    />
                                                </div>
                                                 
                                                <div className="col-md-6">
                                                    <input
                                                        type="password"
                                                        name="password"
                                                        className="form-control"
                                                        placeholder="Create Password"
                                                        required
                                                        onChange={(e)=>{setPassword(e.target.value)}}
                                                    />
                                                </div>

                                                <div className="col-12">
                                                    <div className="loading">Loading</div>
                                                    <div className="error-message" />
                                                    <button type="submit" className="btn-book" >
                                                        Register Doctor
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

        </>
    )
}