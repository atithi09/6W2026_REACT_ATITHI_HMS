import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { useNavigate, useParams } from "react-router-dom"
import { Link } from "react-router-dom"

import DepartmentServices from "../../../services/DepartmentServices"

export default function EditDepartment() {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')

    const params = useParams()
    const nav = useNavigate()

    async function updateDepartment(e) {
        e.preventDefault()

        if (
            !name.trim() ||
            !description.trim()
        ) {
            toast.info("All fields are required")
            return
        }
        try {
            let payload = {
                name: name,
                description: description
            }
            await DepartmentServices.update(payload, params.id)
            nav("/admin/manageDepartment")
            toast.success("Details Updated")
        }
        catch (err) {
            console.log("Error:", err)
            toast.error("Error adding department")
        }
    }
        async function getDepartmentDetails() {
            let res = await DepartmentServices.getSingle(params.id)

            if (res) {
                setName(res.name)
                setDescription(res.description)
            }
            else {
                toast.error("No such document")
            }
        }
    
    useEffect(() => {
        getDepartmentDetails()
    }, [])



    return (
        <>
            <div className="page-title">
                <div className="heading">
                    <div className="container">
                        <div className="row d-flex justify-content-center text-center">
                            <div className="col-lg-8">
                                <h1 className="heading-title"> Departments </h1>
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
                            <li className="current">Update Departments</li>
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
                                        <h2>Update details</h2>
                                    </div>
                                    <div
                                    className="appointment-form"

                                >
                                    <form
                                        action=""
                                        method=""
                                        className="php-email-form"
                                        onSubmit={updateDepartment}
                                    >
                                        <div className="row gy-4">
                                            <div className="col-md-6">
                                                <input
                                                    type="text"
                                                    name="name"
                                                    className="form-control"
                                                    placeholder=" Name"
                                                    required=""
                                                    value={name}
                                                    onChange={(e) => { setName(e.target.value) }}
                                                />
                                            </div>

                                            <div className="col-md-6">
                                                <input
                                                    type="text"
                                                    name="name"
                                                    className="form-control"
                                                    placeholder="Description"
                                                    required=""
                                                    value={description}
                                                    onChange={(e) => setDescription(e.target.value)}
                                                />
                                            </div>

                                            <div className="col-12">
                                                <div className="loading">Loading</div>
                                                <div className="error-message" />

                                                <button type="submit" className="btn-book" >
                                                    Update
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