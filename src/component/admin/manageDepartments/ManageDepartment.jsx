import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import DepartmentServices from '../../../services/DepartmentServices'
import Swal from 'sweetalert2'

export default function ManageDepartment() {

    const [departments, setDepartments] = useState([])
    async function fetchDepartments() {
        let res = await DepartmentServices.all()
        setDepartments(res)
    }
    useEffect(() => {
        fetchDepartments()
    }, [])

    async function deleteDepartment(id) {
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
                await DepartmentServices.deleteDepartment(id)
                fetchDepartments()

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
                            <div className="col-lg-8">
                                <h1 className="heading-title ">Departments</h1>
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
            <div className="container">

                <div className="d-flex justify-content-between my-3">

                    <div className="mt-4 mb-2">
                        <h3>Existing Departments</h3>
                    </div>

                    <div className=" mt-4 mb-2">
                        <Link to='/admin/addDepartment'>
                            <button className="btn btn-primary">
                                + Add Department
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
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th style={{ width: "300px" }}>Description</th>
                                    <th>Status</th>
                                    <th>Date</th>
                                    <th width="170">Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {departments.map((department, index) => (
                                    <tr key={department.id}>
                                        <td>{index + 1}</td>

                                        <td>
                                            <img
                                                src={department.image}
                                                alt={department.name}
                                                className="rounded-circle border shadow-sm"
                                                style={{
                                                    width: "70px",
                                                    height: "70px",
                                                    objectFit: "cover"
                                                }}
                                            />
                                        </td>

                                        <td className="fw-semibold">
                                            {department.name}
                                        </td>

                                        <td
                                            className="description-cell"
                                            title={department.description}
                                        >
                                            {department.description}
                                        </td>

                                        <td>
                                            <span
                                                className={`badge ${department.status
                                                        ? "bg-success"
                                                        : "bg-danger"
                                                    }`}
                                            >
                                                {department.status ? "Active" : "Inactive"}
                                            </span>
                                        </td>

                                        <td>
                                            {new Date(department.createdAt).toLocaleDateString()}
                                        </td>

                                        <td>
                                            <Link to={`/admin/editDepartment/${department.id}`}>
                                                <button className="btn btn-outline-primary btn-sm rounded-circle me-2">
                                                    <i className="bi bi-pencil-fill"></i>
                                                </button>
                                            </Link>

                                            <button
                                                className="btn btn-outline-danger btn-sm rounded-circle"
                                                onClick={() => deleteDepartment(department.id)}
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
            </div>
        </>
    )
}