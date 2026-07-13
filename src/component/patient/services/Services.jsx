import {Link} from 'react-router-dom'

export default function Services() {
    return (
        <>
            <main className="main">
                {/* Page Title */}
                <div className="page-title">
                    <div className="heading">
                        <div className="container">
                            <div className="row d-flex justify-content-center text-center">
                                <div className="col-lg-8">
                                    <h1 className="heading-title">Services</h1>
                                    <p className="mb-0">
                                        Odio et unde deleniti. Deserunt numquam exercitationem. Officiis
                                        quo odio sint voluptas consequatur ut Link odio voluptatem. Sit
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
                                <li className="current">Services</li>
                            </ol>
                        </div>
                    </nav>
                </div>
                {/* End Page Title */}
                {/* Services Section */}
                <section id="services" className="services section">
                    <div className="container" >
                        <div className="row gy-4">
                            <div
                                className="col-lg-4 col-md-6"
                               
                            >
                                <div className="service-item">
                                    <div className="service-image">
                                        <img
                                            src="assets/img/health/cardiology-2.webp"
                                            alt="Cardiology Services"
                                            className="img-fluid"
                                        />
                                        <div className="service-overlay">
                                            <i className="fas fa-heartbeat" />
                                        </div>
                                    </div>
                                    <div className="service-content">
                                        <h3>Cardiology</h3>
                                        <p>
                                            Comprehensive heart care with advanced diagnostic tools and
                                            treatment options for cardiovascular conditions.
                                        </p>
                                        <div className="service-features"
                                        >
                                            <span className="feature-item">
                                                <i className="fas fa-check" /> ECG Testing
                                            </span>
                                            <span className="feature-item">
                                                <i className="fas fa-check" /> Heart Surgery
                                            </span>
                                        </div>
                                        <Link to="/services" className="service-btn">
                                            <span>Learn More</span>
                                            <i className="fas fa-arrow-right" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            {/* End Service Item */}
                            <div
                                className="col-lg-4 col-md-6"
                            >
                                <div className="service-item">
                                    <div className="service-image">
                                        <img
                                            src="assets/img/health/neurology-3.webp"
                                            alt="Neurology Services"
                                            className="img-fluid"
                                        />
                                        <div className="service-overlay">
                                            <i className="fas fa-brain" />
                                        </div>
                                    </div>
                                    <div className="service-content">
                                        <h3>Neurology</h3>
                                        <p>
                                            Expert neurological care for brain and nervous system disorders
                                            with state-of-the-art imaging technology.
                                        </p>
                                        <div className="service-features">
                                            <span className="feature-item">
                                                <i className="fas fa-check" /> MRI Scans
                                            </span>
                                            <span className="feature-item">
                                                <i className="fas fa-check" /> Stroke Care
                                            </span>
                                        </div>
                                        <Link to="/services" className="service-btn">
                                            <span>Learn More</span>
                                            <i className="fas fa-arrow-right" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            {/* End Service Item */}
                            <div
                                className="col-lg-4 col-md-6"
                                
                            >
                                <div className="service-item">
                                    <div className="service-image">
                                        <img
                                            src="assets/img/health/orthopedics-1.webp"
                                            alt="Orthopedics Services"
                                            className="img-fluid"
                                        />
                                        <div className="service-overlay">
                                            <i className="fas fa-bone" />
                                        </div>
                                    </div>
                                    <div className="service-content">
                                        <h3>Orthopedics</h3>
                                        <p>
                                            Specialized bone and joint treatment including sports medicine
                                            and reconstructive surgery procedures.
                                        </p>
                                        <div className="service-features">
                                            <span className="feature-item">
                                                <i className="fas fa-check" /> Joint Replacement
                                            </span>
                                            <span className="feature-item">
                                                <i className="fas fa-check" /> Sports Medicine
                                            </span>
                                        </div>
                                        <Link to="/services" className="service-btn">
                                            <span>Learn More</span>
                                            <i className="fas fa-arrow-right" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            {/* End Service Item */}
                            <div
                                className="col-lg-4 col-md-6"
                                
                            >
                                <div className="service-item">
                                    <div className="service-image">
                                        <img
                                            src="assets/img/health/pediatrics-4.webp"
                                            alt="Pediatrics Services"
                                            className="img-fluid"
                                        />
                                        <div className="service-overlay">
                                            <i className="fas fa-child" />
                                        </div>
                                    </div>
                                    <div className="service-content">
                                        <h3>Pediatrics</h3>
                                        <p>
                                            Dedicated healthcare for children from infancy through
                                            adolescence with specialized treatment protocols.
                                        </p>
                                        <div className="service-features">
                                            <span className="feature-item">
                                                <i className="fas fa-check" /> Well-Child Visits
                                            </span>
                                            <span className="feature-item">
                                                <i className="fas fa-check" /> Immunizations
                                            </span>
                                        </div>
                                        <Link to="/services" className="service-btn">
                                            <span>Learn More</span>
                                            <i className="fas fa-arrow-right" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            {/* End Service Item */}
                            <div
                                className="col-lg-4 col-md-6"
                                
                            >
                                <div className="service-item">
                                    <div className="service-image">
                                        <img
                                            src="assets/img/health/emergency-2.webp"
                                            alt="Emergency Services"
                                            className="img-fluid"
                                        />
                                        <div className="service-overlay">
                                            <i className="fas fa-ambulance" />
                                        </div>
                                    </div>
                                    <div className="service-content">
                                        <h3>Emergency Care</h3>
                                        <p>
                                            24/7 emergency medical services with rapid response teams and
                                            critical care capabilities.
                                        </p>
                                        <div className="service-features">
                                            <span className="feature-item">
                                                <i className="fas fa-check" /> Trauma Center
                                            </span>
                                            <span className="feature-item">
                                                <i className="fas fa-check" /> Critical Care
                                            </span>
                                        </div>
                                        <Link to="/services" className="service-btn">
                                            <span>Learn More</span>
                                            <i className="fas fa-arrow-right" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            {/* End Service Item */}
                            <div
                                className="col-lg-4 col-md-6"
                                
                            >
                                <div className="service-item">
                                    <div className="service-image">
                                        <img
                                            src="assets/img/health/laboratory-3.webp"
                                            alt="Laboratory Services"
                                            className="img-fluid"
                                        />
                                        <div className="service-overlay">
                                            <i className="fas fa-microscope" />
                                        </div>
                                    </div>
                                    <div className="service-content">
                                        <h3>Laboratory Testing</h3>
                                        <p>
                                            Advanced diagnostic laboratory services with comprehensive
                                            testing panels and rapid result delivery.
                                        </p>
                                        <div className="service-features">
                                            <span className="feature-item">
                                                <i className="fas fa-check" /> Blood Tests
                                            </span>
                                            <span className="feature-item">
                                                <i className="fas fa-check" /> Pathology
                                            </span>
                                        </div>
                                        <Link to="/services" className="service-btn">
                                            <span>Learn More</span>
                                            <i className="fas fa-arrow-right" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            {/* End Service Item */}
                        </div>
                    </div>
                </section>
                {/* /Services Section */}
            </main>

        </>
    )
}