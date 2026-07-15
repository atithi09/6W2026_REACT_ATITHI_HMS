import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import DoctorServices from "../../../services/DoctorServices"
import { toast } from "react-toastify"
import { useNavigate, useParams } from "react-router-dom"
import DepartmentServices from "../../../services/DepartmentServices"


export default function EditDoctor() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [dob, setDOB] = useState('')
    const [mobile, setMobile] = useState('')
    const [departmentid, setDepartmentid] = useState('')
    const [departments, setDepartments] = useState([])
    async function fetchDepartments() {
        let res = await DepartmentServices.all()
        setDepartments(res)
    }

    useEffect(() => {
        fetchDepartments()
    }, [])


    let nav = useNavigate()
    const params = useParams()

    async function updateDoctor(e) {
        e.preventDefault()
        if (
            !name.trim() ||
            !email.trim() ||
            !dob ||
            !departmentid.trim() ||
            !mobile.trim()
        ) {
            toast.info("All Fields are required ")
            return;
        }
        try {
            let payload = {
                name: name,
                email: email,
                dateOFbirth: dob,
                departmentid: departmentid,
                mobile: mobile,
            }
            await DoctorServices.update(payload, params.id);
            nav(-1)
            toast.success("Details Updated")
        }
        catch (err) {
            console.log("error:", err)
            toast.error("Error updating details")
        }
    }

    async function getDoctorDetails() {
        let res = await DoctorServices.getSingle(params.id)

        if (res) {
            setName(res.name)
            setEmail(res.email)
            setDOB(res.dob)
            setMobile(res.mobile)
            setDepartmentid(res.departmentid)
        }
        else {
            toast.error("No such Document")
        }
    }

    useEffect(() => {
        getDoctorDetails()
    }, [])
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
                            <li className="current">Update Doctors</li>
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
                                    <h2>Edit Doctor</h2>
                                </div>
                                <div
                                    className="appointment-form"

                                >
                                    <form
                                        action=""
                                        method=""
                                        className="php-email-form"
                                        onSubmit={updateDoctor}
                                    >
                                        <div className="row gy-4">
                                            <div className="col-md-6">
                                                <input
                                                    type="text"
                                                    name="name"
                                                    className="form-control"
                                                    placeholder="Full Name"
                                                    required=""
                                                    value={name}
                                                    onChange={(e) => { setName(e.target.value) }}
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <input
                                                    type="email"
                                                    name="email"
                                                    className="form-control"
                                                    placeholder="Email Address"
                                                    required=""
                                                    value={email}
                                                    onChange={(e) => { setEmail(e.target.value) }}
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    className="form-control"
                                                    placeholder="Phone Number"
                                                    required=""
                                                    value={mobile}
                                                    onChange={(e) => { setMobile(e.target.value) }}
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <select
                                                    name="department"
                                                    className="form-select"
                                                    required=""
                                                    value={departmentid}
                                                    onChange={(e) => { setDepartmentid(e.target.value) }}
                                                >
                                                    <option value="" selected disabled>Select Department</option>
                                                    {departments.map((dept) => (
                                                        <option value={dept.id} >{dept.name}</option>
                                                    ))
                                                    }
                                                </select>
                                            </div>
                                            <div className="col-md-6">
                                                <input
                                                    type="date"
                                                    name="date"
                                                    className="form-control"
                                                    required=""
                                                    value={dob}
                                                    onChange={(e) => { setDOB(e.target.value) }}
                                                />
                                            </div>

                                            <div className="col-12">
                                                <button type="submit" className="btn-book" >
                                                    Update Doctor
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