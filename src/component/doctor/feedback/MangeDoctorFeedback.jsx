import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AuthService from '../../../services/AuthService'
import PatientService from '../../../services/PatientService'
import DoctorService from '../../../services/DoctorServices'
import FeedbackService from '../../../services/FeedbackService'
import { RingLoader } from 'react-spinners'
import { toast } from 'react-toastify'

const override = {
    display: "block",
    margin: "0 auto",
}

export default function MangeDoctorFeedback() {
    const [loading, setLoading] = useState(true)
    const [feedbacks, setfeedbacks] = useState([])
    const [patients, setPatients] = useState([])
    const id=AuthService.uid()
    async function fetchFeedbacks() {
        try {
            let res = await FeedbackService.FeedbackByDoctor(id)
            setfeedbacks(res)
        }
        catch (err) {
            toast.error("Something went wrong")
            console.log(err)
        }
        finally {
            setLoading(false)
        }
    }

    async function fetchPatients() {
        let res = await PatientService.all()
        setPatients(res)
    }

    

    useEffect(() => {
        fetchFeedbacks()
        fetchPatients()
    }, [])

    if (loading) {
        return (
            <div
                className="d-flex justify-content-center align-items-center"
                style={{ minHeight: "80vh" }}
            >
                <RingLoader
                    color="#0D6EFD"
                    loading={loading}
                    cssOverride={override}
                    size={70}
                />
            </div>
        )
    }

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
            {feedbacks.length >0 ?
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
                                        <th className='text-nowrap'>Sr No.</th>
                                        <th className='text-nowrap'>Patient Name</th>
                                        <th className='text-nowrap'>Ratings</th>
                                        <th className='text-nowrap'>Experience</th>
                                        <th className='text-nowrap'>Date</th>
                                        <th className='text-nowrap'>Reviews</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {feedbacks.map((feedback, index) => (
                                        <tr key={feedback.id}>
                                            <td>{index + 1}</td>

                                            <td className='text-nowrap'>{patients.find((p) => p.id == feedback.patientId)?.name}</td>
                                            <td
                                                className="description-cell text-nowrap"
                                            >
                                                {feedback.rating}
                                            </td>
                                            <td>{feedback.experience}</td>
                                            <td className='text-nowrap'>
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