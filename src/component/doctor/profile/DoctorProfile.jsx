import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import DoctorServices from "../../../services/DoctorServices";
import { toast } from "react-toastify";
import CloudinaryService from "../../../services/CloudinaryService";

export default function DoctorProfile() {

    const params = useParams();

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [mobile, setMobile] = useState('')
    const [gender, setGender] = useState('')
    const [dob, setDob] = useState('')
    const [availability, setAvailability] = useState('')
    const [specialization, setSpecialization] = useState('')
    const [experience, setExperience] = useState('')
    const [consultationfee, setConsultationfee] = useState('')
    const [qualification, setQualification] = useState('')
    const [image, setImage] = useState('')

    async function fetchDoctor() {
        const data = await DoctorServices.getSingle(params.id);

        if (data) {
            setName(data.name);
            setEmail(data.email)
            setMobile(data.mobile)
            setDob(data.dateOFbirth)
            setImage(data.image)
            setGender(data.gender)
            setAvailability(data.availability)
            setSpecialization(data.specialization)
            setConsultationfee(data.consultationFee)
            setExperience(data.experience)
            setQualification(data.qualification)
        }
    }
    useEffect(() => {
        fetchDoctor();
    }, []);

    async function updateProfile(e) {
        e.preventDefault()
        let imageUrl = ""
        if (image) {
            imageUrl = await CloudinaryService.upload(image)
        }
        try {
            let payload = {
                name: name,
                email: email,
                mobile: mobile,
                dateOFbirth: dob,
                gender: gender,
                specialization: specialization,
                qualification: qualification,
                experience: experience,
                consultationFee: consultationfee,
                availability: availability,
                image: imageUrl
            }
            await DoctorServices.update(payload, params.id);
            toast.success("Profile Updated")
            console.log(payload.image)
        }
        catch (err) {
            console.log("error:", err)
            toast.error("Error updating details")
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
                                <h2 className="heading-title">{`Welcome, ${name}`}</h2>
                                <p className="mt-2 lead">
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

                        <h2 className="text-center mt-4">Personal Information</h2>


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

                                        <input
                                            type="file"
                                            hidden
                                            accept="image/*"
                                            onChange={(e) => setImage(e.target.files[0])}
                                        />
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
                                    >
                                        <div className="row gy-4 p-2">



                                            <div className="col-12 col-lg-6">
                                                <input
                                                    type="text"
                                                    name="name"
                                                    className="form-control"
                                                    placeholder="Full Name"
                                                    required=""
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
                                                    required=""
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
                                                    required=""
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
                                                    required=""
                                                    value={gender}
                                                    onChange={(e) => setGender(e.target.value)}
                                                />
                                            </div>

                                            <div className="col-12 col-lg-6">
                                                <input
                                                    type="date"
                                                    name="date"
                                                    className="form-control"
                                                    required=""
                                                    value={dob}
                                                    onChange={(e) => setDob(e.target.value)}
                                                />
                                            </div>

                                            <div className="col-12 col-lg-6">
                                                <input
                                                    type="text"
                                                    name="name"
                                                    className="form-control"
                                                    placeholder="Availability"
                                                    required=""
                                                    value={availability}
                                                    onChange={(e) => setAvailability(e.target.value)}
                                                />
                                            </div>

                                            <div className="col-12 col-lg-6">
                                                <input
                                                    type="text"
                                                    name="name"
                                                    className="form-control"
                                                    placeholder="Specialization"
                                                    required=""
                                                    value={specialization}
                                                    onChange={(e) => setSpecialization(e.target.value)}
                                                />
                                            </div>

                                            <div className="col-12 col-lg-6">
                                                <input
                                                    type="text"
                                                    name="name"
                                                    className="form-control"
                                                    placeholder="Qualification"
                                                    required=""
                                                    value={qualification}
                                                    onChange={(e) => setQualification(e.target.value)}
                                                />
                                            </div>

                                            <div className="col-12 col-lg-6">
                                                <input
                                                    type="text"
                                                    name="name"
                                                    className="form-control"
                                                    placeholder="Experience"
                                                    required=""
                                                    value={experience}
                                                    onChange={(e) => setExperience(e.target.value)}
                                                />
                                            </div>

                                            <div className="col-12 col-lg-6">
                                                <input
                                                    type="text"
                                                    name="name"
                                                    className="form-control "
                                                    placeholder="Consultation fee"
                                                    required=""
                                                    value={consultationfee}
                                                    onChange={(e) => setConsultationfee(e.target.value)}
                                                />
                                            </div>

                                            <div className="col-12">
                                                <div className="loading">Loading</div>
                                                <div className="error-message" />

                                                <button
                                                    type="submit"
                                                    className="btn-book w-100 w-md-auto"
                                                    onClick={updateProfile}
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

        </>
    )
}