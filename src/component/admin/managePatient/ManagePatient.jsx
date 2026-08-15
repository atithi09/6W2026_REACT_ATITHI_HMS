import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import PatientService from "../../../services/PatientService"
import Swal from "sweetalert2"
import { RingLoader } from "react-spinners"

const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
};

export default function ManagePatient() {
    const [patients, setPatients] = useState([])
    const [loading, setLoading] = useState(true)

    async function fetchPatients() {
        try {
            let res = await PatientService.all()
            setPatients(res)
        }
        catch (err) {
            toast.error("Something went wrong")
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchPatients();
    }, [])

    async function deletePatients(id) {
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
                await PatientService.delete(id)
                fetchPatients()

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
                            <li className="current">Patients</li>
                        </ol>
                    </div>
                </nav>
            </div>
            {loading ?
                (
                    <div className="d-flex justify-content-center my-5">
                        <RingLoader
                            color="#0D6EFD"
                            loading={loading}
                            size={70}
                        />
                    </div>
                ) :
                <div className="container">

                    <div className="d-flex justify-content-between">

                        <div className="mt-4 mb-2">
                            <h3>Patients</h3>
                        </div>


                    </div>
                    {patients.length > 0 ? (
                        <div
                            style={{
                                marginBottom: "20px"
                            }}
                        >
                            <div className="table-responsive shadow-sm rounded-4">
                                <table className="table table-hover align-middle text-center mb-0">
                                    <thead className="table-primary">
                                        <tr>
                                            <th className='text-nowrap'>Sr No.</th>
                                            <th>Name</th>
                                            <th>Status</th>
                                            <th>Date</th>
                                            <th width="170">Action</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {patients.map((patients, index) => (
                                            <tr key={patients.id}>
                                                <td>{index + 1}</td>

                                                <td className="fw-semibold text-nowrap">
                                                    {patients.name}
                                                </td>

                                                <td>
                                                    <span
                                                        className={`badge ${patients.status
                                                            ? "bg-success"
                                                            : "bg-danger"
                                                            }`}
                                                    >
                                                        {patients.status ? "Active" : "Inactive"}
                                                    </span>
                                                </td>

                                                <td className='text-nowrap'>
                                                    {new Date(patients.createdAt).toLocaleDateString()}
                                                </td>

                                                <td>
                                                    <Link to={`/admin/editPatient/${patients.id}`}>
                                                        <button className="btn btn-outline-primary btn-sm rounded-circle me-md-2 me-1">
                                                            <i className="bi bi-pencil-fill"></i>
                                                        </button>
                                                    </Link>

                                                    <button
                                                        className="btn btn-outline-danger btn-sm rounded-circle"
                                                        onClick={() => deletePatients(patients.id)}
                                                    >
                                                        <i className="bi bi-trash-fill"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>) : (
                        <div className="col-12">
                            <div className="card border-0 shadow-sm text-center py-5">
                                <div className="card-body">
                                    <i
                                        className="bi bi-person-badge opacity-50 text-primary"
                                        style={{ fontSize: "4rem" }}
                                    ></i>

                                    <h4 className="mt-3 fw-bold">
                                        No Patient Yet
                                    </h4>

                                    <p className="text-muted mb-4">
                                        You don't have any patients at the moment.
                                    </p>

                                </div>
                            </div>
                        </div>)
                    } </div >
            }
        </>
    )
}