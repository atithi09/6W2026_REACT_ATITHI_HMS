import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import DoctorServices from '../../../services/DoctorServices'
import DepartmentServices from '../../../services/DepartmentServices'

export default function Doctors() {

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

  return (
    <>
      <main className="main">
        {/* Page Title */}
        <div className="page-title">
          <div className="heading">
            <div className="container">
              <div className="row d-flex justify-content-center text-center">
                <div className="col-lg-8">
                  <h1 className="heading-title">Doctors</h1>
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
                <li className="current">Doctors</li>
              </ol>
            </div>
          </nav>
        </div>
        {/* End Page Title */}
        {/* Doctors Section */}
        <section id="doctors" className="doctors section">
          <div className="container" >
            <div className="row gy-4">

              { doctors.map((doctor)=>(
                <div
                  className="col-lg-3 col-md-6"
                >
                  <div className="doctor-card">
                    <div className="doctor-image">
                      <img
                        src="assets/img/health/doctorPlaceholder.avif"
                        alt={doctor.name}
                        className="img-fluid"
                      />
                      <div className="doctor-overlay">
                        {/* <div className="social-links">
                          <Link to="#!">
                            <i className="bi bi-linkedin" />
                          </Link>
                          <Link to="#!">
                            <i className="bi bi-envelope" />
                          </Link>
                          <Link to="#!">
                            <i className="bi bi-phone" />
                          </Link>
                        </div> */}
                      </div>
                    </div>
                    <div className="doctor-content">
                      <h4>{doctor.name}</h4>
                      <span className="specialty">
                        {/* {departments.find((d)=> d.id==doctor.departmentid)?.name} */}
                        {doctor.specialization}
                        </span>
                      
                      <div className="doctor-meta">
                        <div className="experience">
                          <i className="bi bi-award" />
                          <span>{doctor.experience}</span>
                        </div>
                        <div className="department">
                          <i className="bi bi-building" />
                          <span> {departments.find((d)=> d.id==doctor.departmentid)?.name}</span>
                        </div>
                      </div>
                      <Link to="/appointment" className="btn-appointment">
                        Book Appointment
                      </Link>
                    </div>
                  </div>
                </div>
                ))
              }
              {/* End Doctor Card */}
              
            </div>
          </div>
        </section>
        {/* /Doctors Section */}
      </main>

    </>
  )
}