import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import DoctorServices from "../../../services/DoctorServices"
import Swal from "sweetalert2"
import DepartmentServices from "../../../services/DepartmentServices"


export default function ManageDoctor() {
    const [doctors, setDoctors] = useState([])
    const [departments, setDepartments] = useState([])

    async function fetchDoctors() {
        let res = await DoctorServices.all()
        setDoctors(res)
    }


    async function fetchDepartments() {
        let res = await DepartmentServices.all()
        setDepartments(res)
    }
    useEffect(() => {
        fetchDepartments();
        fetchDoctors();
    }, [])

    async function deleteDoctor(id) {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                await DoctorServices.deleteDoctor(id)
                fetchDoctors()

                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
            }

        });

    }

    return (
        <>
            <div className="page-title">
                <div className="heading">
                    <div className="container">
                        <div className="row d-flex justify-content-center text-center">
                            <div className="col-lg-8 ">
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
                            <li className="current">Doctors</li>
                        </ol>
                    </div>
                </nav>
            </div>
            <div className="container">

                <div className="d-flex justify-content-between my-3">

                    <div >
                        <h3 className="mb-2 mt-4">Existing Doctors</h3>
                    </div>

                    <div className="   mt-4 mb-2">
                        <Link to='/admin/addDoc'>
                            <button className="btn btn-primary">
                                + Add Doctor
                            </button>
                        </Link>
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
                                <th>Sr No.</th>
                                <th>Name</th>
                                <th>Department</th>
                                <th>Status</th>
                                <th>Date</th>
                                <th width="170">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {doctors.map((doctor, index) => (
                                <tr key={doctor.id}>
                                    <td>{index + 1}</td>

                                    <td className="fw-semibold">
                                        {doctor.name}
                                    </td>

                                    <td>{departments.find((d)=>d.id == doctor.departmentid)?.name}</td>

                                    <td>
                                        <span
                                            className={`badge ${doctor.status
                                                ? "bg-success"
                                                : "bg-danger"
                                                }`}
                                        >
                                            {doctor.status ? "Active" : "Inactive"}
                                        </span>
                                    </td>

                                    <td>
                                        {new Date(doctor.createdAt).toLocaleDateString()}
                                    </td>

                                    <td>
                                        <Link to={`/admin/editDoc/${doctor.id}`}>
                                            <button className="btn btn-outline-primary btn-sm rounded-circle me-2">
                                                <i className="bi bi-pencil-fill"></i>
                                            </button>
                                        </Link>

                                        <button
                                            className="btn btn-outline-danger btn-sm rounded-circle"
                                            onClick={() => deleteDoctor(doctor.id)}
                                        >
                                            <i className="bi bi-trash-fill"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div >
        </>
    )
}