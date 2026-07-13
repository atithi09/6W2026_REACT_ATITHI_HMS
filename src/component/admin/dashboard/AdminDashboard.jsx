import { Link } from "react-router-dom";
export default function admin() {
    return (
        <>

        <div className="page-title">
                    <div className="heading">
                        <div className="container">
                            <div className="row d-flex justify-content-center text-center">
                                <div className="col-lg-8">
                                    <h1 className="heading-title">Dashboard</h1>
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
                                <li className="current">Dashboard</li>
                            </ol>
                        </div>
                    </nav>
                </div>
        <div className="p-4">
            <div className="d-flex flex-wrap justify-content-evenly  gap-4">

                <div className="dashcard shadow rounded p-3">
                <h5 className="fw-bold">Total Patients</h5>

                </div>

                <div className="dashcard shadow rounded p-3">
                <h5 className="fw-bold">Total Doctors</h5>
                </div>

                <div className="dashcard shadow rounded p-3">
                <h5 className="fw-bold text-center">Total Appointments</h5>   
                </div>

            </div>

            
        </div>
        </>
    );
}