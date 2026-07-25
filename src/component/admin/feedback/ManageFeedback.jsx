import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AuthService from '../../../services/AuthService'
import PatientService from '../../../services/PatientService'
import DoctorService from '../../../services/DoctorServices'
import FeedbackService from '../../../services/FeedbackService'

export default function ManageFeedback() {
    
    const [feedbacks, setfeedbacks] = useState([])
    const [patients, setPatients] = useState([])
    const [doctors, setDoctors] = useState([])

    async function fetchFeedbacks() {
        let res = await FeedbackService.all()
        setfeedbacks(   res)
    }

    async function fetchPatients() {
        let res = await PatientService.all()
        setPatients(res)
    }

    async function fetchDoctors() {
        let res = await DoctorService.all()  
        setDoctors(res)      
    }

    useEffect(() => {
        fetchFeedbacks()
        fetchPatients()
        fetchDoctors()
    }, [])

   

    return (
        <>
            <div className="page-title">
                <div className="heading">
                    <div className="container">
                        <div className="row d-flex justify-content-center text-center">
                            <div className="col-lg-8">
                                <h1 className="heading-title ">Feedbacks</h1>
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
                            <li className="current">Feedbacks</li>
                        </ol>
                    </div>
                </nav>
            </div>
            {feedbacks?
                <div className="container">

                    <div className="d-flex justify-content-between my-3">

                        <div className="mt-4 mb-2">
                            <h3>Feedbacks</h3>
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
                                        <th>Patient Name</th>
                                        <th>Doctor Name</th>
                                        <th>Ratings</th>
                                        <th>Date</th>
                                        <th>Reviews</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {feedbacks.map((feedback, index) => (
                                        <tr key={feedback.id}>
                                            <td>{index + 1}</td>

                                            <td>{patients.find((p) => p.id == feedback.patientId)?.name}</td>
                                            <td>{doctors.find((p) => p.id == feedback.doctorId)?.name}</td>

                                            <td
                                                className="description-cell"
                                            >
                                                {feedback.rating}
                                            </td>

                                            <td>
                                                {new Date(feedback.createdAt).toLocaleDateString()}
                                            </td>
                                            <td>{feedback.review}</td>
                                            
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div> : (<div className="col-12">
                    <div className="card border-0 shadow-sm text-center py-5">
                        <div className="card-body">
                            <i
                                className="bi bi-calendar2-x text-primary"
                                style={{ fontSize: "4rem" }}
                            ></i>

                            <h4 className="mt-3 fw-bold">
                                No Feedbacks yet
                            </h4>

                            <p className="text-muted mb-4">
                                You don't have any feedback at the moment. Check back later.
                            </p>

                        </div>
                    </div>
                </div>)
            }
        </>
    )
}