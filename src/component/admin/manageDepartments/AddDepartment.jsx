import { useState } from "react"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import DepartmentServices from "../../../services/DepartmentServices"
import CloudinaryService from "../../../services/CloudinaryService"

export default function AddDepartment() {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')
    const nav = useNavigate()

    async function AddDepartment(e) {
        e.preventDefault()

        if (
            !name.trim() ||
            !description.trim()
        ) {
            toast.info("All fields are required")
            return
        }
        try {
            let imageUrl = ""

            if (image) {
                imageUrl = await CloudinaryService.upload(image)
            }
            let payload = {
                name: name,
                description: description,
                image: imageUrl
            }
            await DepartmentServices.add(payload)
            nav("/admin/manageDepartment")
            toast.success("Department Added")
        }
        catch (err) {
            console.log("Error:", err)
            toast.error("Error adding department")
        }


    }

    return (
        <>
            <div className="page-title">
                <div className="heading">
                    <div className="container">
                        <div className="row d-flex justify-content-center text-center">
                            <div className="col-lg-8">
                                <h1 className="heading-title">Departments</h1>
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
                            <li className="current">Departments</li>
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
                                    <h2>Add Department</h2>
                                </div>
                                <div
                                    className="appointment-form"

                                >
                                    <form
                                        action=""
                                        method=""
                                        className="php-email-form"
                                        onSubmit={AddDepartment}
                                    >
                                        <div className="row gy-4">
                                            <div className="col-md-6">
                                                <input
                                                    type="text"
                                                    name="name"
                                                    className="form-control"
                                                    placeholder=" Name"
                                                    required=""
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
                                                    onChange={(e) => setDescription(e.target.value)}
                                                />
                                            </div>
                                            <div className="col-12">
                                                <input
                                                    type="file"
                                                    name="name"
                                                    className="form-control"
                                                    placeholder="Description"
                                                    required=""
                                                    onChange={(e) => { setImage(e.target.files[0]) }}
                                                />
                                            </div>

                                            <div className="col-12">
                                                <div className="loading">Loading</div>
                                                <div className="error-message" />

                                                <button type="submit" className="btn-book" >
                                                    Add Department
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