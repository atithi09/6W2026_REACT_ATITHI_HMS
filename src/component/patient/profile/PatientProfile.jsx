import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CloudinaryService from "../../../services/CloudinaryService";
import PatientService from "../../../services/PatientService";
import { toast } from "react-toastify";

export default function PatientProfile() {
    const params = useParams()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [mobile, setMobile] = useState('')
    const [gender, setGender] = useState('')
    const [date, setDate] = useState('')
    const [address, setAddress] = useState('')
    const [image, setImage] = useState('')

    async function fetchPatients() {
        let data = await PatientService.getSingle(params.id)
        console.log(data)
        if (data) {
            setName(data.name || "");
            setEmail(data.email || "");
            setMobile(data.phone || "");
            setGender(data.gender || "");
            setDate(data.dob || "");
            setAddress(data.address || "");
            setImage(data.profileImage || "");
        }
    }
    useEffect(() => {
        fetchPatients()
    })

    async function updateProfile(e) {
        e.preventDefault()

        let imageUrl = ""
        if (image) {
            imageUrl = await CloudinaryService.upload(image)
            console.log(imageUrl)
        }

        try {
            let payload = {
                name: name,
                email: email,
                phone: mobile,
                gender: gender,
                dob: date,
                address: address,
                profileImage: imageUrl,
            }
            await PatientService.update(payload, params.id)
            toast.success("Profile updated.")

        } catch (err) {
            console.log("Error:", err)
            toast.error("Something went wrong")
        }
    }

    return (
        <>
            {/* Page Title */}
            <div className="page-title">
                <div className="heading">
                    <div className="container">
                        <div className="row justify-content-center text-center">
                            <div className="col-lg-8">
                                <h1 className="heading-title">My Profile</h1>
                                <p className="mb-0">
                                    Manage your personal information.
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
                            <li className="current">My Profile</li>
                        </ol>
                    </div>
                </nav>
            </div>

            {/* Profile Section */}
            <section className="section">
                <div className="container">

                    <div className="card border-0 info shadow rounded-4  justify-content-center">

                        <h2 className="text-center mt-2">Personal Information</h2>


                        <div className="row g-4 align-items-center justify-content-evenly p-3 p-md-4">

                            {/* Profile Image */}
                            <div className="col-12 col-md-6 col-lg-4 align-self-start text-center mb-4 mb-md-0">

                                <img
                                    src={image || "/assets/img/health/doctorPlaceholder.avif"}
                                    alt="Profile"
                                    className="img-fluid rounded-circle border border-4 shadow"
                                    style={{
                                        width: "100%",
                                        maxWidth: "220px",
                                        aspectRatio: "1/1",
                                        objectFit: "cover"
                                    }}
                                />

                                <div className="mt-4">
                                    <label className="btn btn-primary px-3">
                                        <i className="bi bi-camera-fill me-2"></i>
                                        Change Photo
                                        <input type="file"
                                            hidden
                                            onChange={(e) => setImage(e.target.files[0])} />
                                    </label>
                                </div>

                            </div>



                            <section
                                id="appointmnet"
                                className="appointmnet section p-0 col-12 col-md-6 col-lg-7"
                            >

                                <div className="appointment-form ">

                                    <form
                                        action=""
                                        method=""
                                        className="php-email-form"
                                        onSubmit={updateProfile}
                                    >
                                        <div className="row gy-4 p-2">



                                            <div className="col-12 col-lg-6">
                                                <input
                                                    type="text"
                                                    name="name"
                                                    className="form-control"
                                                    placeholder="Full Name"
                                                    required
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                />
                                            </div>
                                            <div className="col-12 col-lg-6">
                                                <input
                                                    type="email"
                                                    name="email"
                                                    className="form-control"
                                                    placeholder="Email Address"
                                                    required
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                />
                                            </div>
                                            <div className="col-12 col-lg-6">
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    className="form-control"
                                                    placeholder="Phone Number"
                                                    required
                                                    value={mobile}
                                                    onChange={(e) => setMobile(e.target.value)}
                                                />
                                            </div>

                                            <div className="col-12 col-lg-6">
                                                <input
                                                    type="text"
                                                    name="name"
                                                    className="form-control"
                                                    placeholder="Gender"
                                                    required
                                                    value={gender}
                                                    onChange={(e) => setGender(e.target.value)}
                                                />
                                            </div>

                                            <div className="col-12 col-lg-6">
                                                <input
                                                    type="date"
                                                    name="date"
                                                    className="form-control"
                                                    required
                                                    value={date}
                                                    onChange={(e) => setDate(e.target.value)}
                                                />
                                            </div>

                                            <div className="col-12 col-lg-6 ">
                                                <input
                                                    type="text"
                                                    name="name"
                                                    className="form-control"
                                                    placeholder="Address"
                                                    required
                                                    value={address}
                                                    onChange={(e) => setAddress(e.target.value)}
                                                />
                                            </div>

                                            <div className="col-12">
                                                <div className="loading">Loading</div>
                                                <div className="error-message" />

                                                <button
                                                    type="submit"
                                                    className="btn-book w-100 w-md-auto"
                                                >
                                                    Update Profile
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </section>
                        </div>
                    </div>

                </div>
            </section>

            {/* Quick Access */}
            <section className="section pt-0">
                <div className="container">

                    <div className="row g-4">

                        {/* Appointments */}
                        <div className="col-lg-6">

                            <div className="card border-0 shadow h-100 profile-option-card">

                                <div className="card-body p-4">

                                    <div className="d-flex align-items-center mb-3">

                                        <div className="icon-box me-3">
                                            <i className="bi bi-calendar-check"></i>
                                        </div>

                                        <div>
                                            <h4 className="mb-1">
                                                My Appointments
                                            </h4>

                                            <p className="text-muted mb-0">
                                                View upcoming and previous appointments.
                                            </p>
                                        </div>

                                    </div>

                                    <Link
                                        to="/patient/appointments"
                                        className="btn btn-primary mt-3"
                                    >
                                        View Appointments
                                    </Link>

                                </div>

                            </div>

                        </div>

                        {/* Medical History */}
                        <div className="col-lg-6">

                            <div className="card border-0 shadow h-100 profile-option-card">

                                <div className="card-body p-4">

                                    <div className="d-flex align-items-center mb-3">

                                        <div className="icon-box me-3">
                                            <i className="bi bi-file-earmark-medical"></i>
                                        </div>

                                        <div>

                                            <h4 className="mb-1">
                                                Medical History
                                            </h4>

                                            <p className="text-muted mb-0">
                                                View prescriptions, diagnoses and treatment records.
                                            </p>

                                        </div>

                                    </div>

                                    <Link
                                        to="/patient/history"
                                        className="btn btn-primary mt-3"
                                    >
                                        View Medical History
                                    </Link>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>
            </section>
        </>
    )
}