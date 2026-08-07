import { Link } from "react-router-dom";

function RecordHistory() {
    return (
        <>

            <div className="page-title">
                <div className="heading">
                    <div className="container">
                        <div className="row d-flex justify-content-center text-center">
                            <div className="col-lg-8">
                                <h1 className="heading-title ">Medical Records</h1>
                                
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
                            <li className="current">Upcoming Appointments</li>
                        </ol>
                    </div>
                </nav>
            </div>
            <section id="appointmnet" className="appointmnet section">
                <div className="container" >
                    <div className="row">
                        <h1>hieeee</h1>

                    </div>
                </div>
            </section>
        </>
    )

}
export default RecordHistory;