import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import { useNavigate, useParams } from "react-router-dom"
import PatientService from "../../../services/PatientService"


export default function EditPatients() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [mobile, setMobile] = useState('')
    

    let nav = useNavigate()
    const params = useParams()

    async function updatePatient(e) {
        e.preventDefault()
        if (
            !name.trim() ||
            !email.trim()           
        ) {
            toast.info("All Fields are required ")
            return;
        }
        try {
            let payload = {
                name: name,
                email: email,
            }
            await PatientService.update(payload,params.id);  
            nav(-1)          
            toast.success("Details Updated")
        }
        catch (err) {
            console.log("error:", err)
            toast.error("Error updating details")
        }
    }

    async function getPatientDetails() {
        let res = await PatientService.getSingle(params.id)

        if (res) {
            setName(res.name)
            setEmail(res.email)
        }
        else {
            toast.error("No such Document")
        }
    }

    useEffect(()=>{
        getPatientDetails()
    },[])

    return (
        <>
            <div className="page-title">
                <div className="heading">
                    <div className="container">
                        <div className="row d-flex justify-content-center text-center">
                            <div className="col-lg-8">
                                <h1 className="heading-title">Patients</h1>
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
                            <li className="current">Update Patients</li>
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
                                    <h2>Edit Patients</h2>
                                </div>
                                <div
                                    className="appointment-form"

                                >
                                    <form
                                        action=""
                                        method=""
                                        className="php-email-form"
                                        onSubmit={updatePatient}
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
                                            
                                            <div className="col-12">
                                               <button type="submit" className="btn-book" >
                                                    Update Patient
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