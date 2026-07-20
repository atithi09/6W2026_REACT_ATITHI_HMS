import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "./component/patient/layout/Layout"
import Home from "./component/patient/home/Home"
import About from "./component/patient/about/About"
import Department from "./component/patient/department/Department"
import Services from "./component/patient/services/Services"
import Appointment from "./component/patient/appointment/Appointment"
import Doctors from "./component/patient/doctors/Doctors"
import Contacts from "./component/patient/contact/Contacts"
import Login from "./component/patient/auth/Login"
import { ToastContainer } from "react-toastify"
import SignUp from "./component/patient/auth/SignUp"
import PatientProfile from "./component/patient/profile/PatientProfile"
import AdminLayout from "./component/admin/layout/AdminLayout"
import AdminDashboard from "./component/admin/dashboard/AdminDashboard"
import DoctorLayout from "./component/doctor/layout/DoctorLayout"
import DoctorDashboard from "./component/doctor/dashboard/DoctorDashboard"
import ManageDoctor from "./component/admin/manageDoctor/ManageDoctor"
import AddDoctor from "./component/admin/manageDoctor/AddDoctor"
import EditDoctor from "./component/admin/manageDoctor/EditDoctor"
import EditDepartment from "./component/admin/manageDepartments/EditDepartment"
import AddDepartment from "./component/admin/manageDepartments/AddDepartment"
import ManageDepartment from "./component/admin/manageDepartments/ManageDepartment"
import EditPatients from "./component/admin/managePatient/EditPatients"
import ManagePatient from "./component/admin/managePatient/ManagePatient"
import DoctorProfile from "./component/doctor/profile/DoctorProfile"
import ViewAppointments from "./component/doctor/appointments/ViewAppointments"
import PatientsList from "./component/doctor/patients/PatientsList"
import AppointmentHistory from "./component/doctor/appointments/AppointmnetHistory"
import ManageAppointments from "./component/admin/appointment/ManageAppointment"
import ViewMyAppointment from "./component/patient/appointment/ViewMyAppointment"
import MyAppointmentHistory from "./component/patient/appointment/MyAppointmentHistory"




function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout/>}>
          <Route path='/' element={<Home/>}></Route>
          <Route path='about' element={<About/>}></Route>
          <Route path='department' element={<Department/>}></Route>
          <Route path='services' element={<Services/>}></Route>
          <Route path='appointment' element={<Appointment/>}></Route>
          <Route path='doctors' element={<Doctors/>}></Route>
          <Route path='contact' element={<Contacts/>}></Route>
          <Route path='login' element={<Login/>}></Route>
          <Route path='signup' element={<SignUp/>}></Route>
          <Route path='profile/:id' element={<PatientProfile/>}></Route>
          <Route path='myAppt' element={<ViewMyAppointment/>}></Route>
          <Route path='myAppthistory' element={<MyAppointmentHistory/>}></Route>
          
          </Route>

          
          <Route path='/admin' element={<AdminLayout/>}>
          <Route path='/admin' element={<AdminDashboard/>}></Route>
          <Route path='managedoc' element={<ManageDoctor/>}>/</Route>
          <Route path='addDoc' element={<AddDoctor/>}>/</Route>
          <Route path='editDoc/:id' element={<EditDoctor/>}></Route>
          <Route path='addDepartment' element={<AddDepartment/>}></Route>
          <Route path='editDepartment/:id' element={<EditDepartment/>}></Route>
          <Route path='manageDepartment' element={<ManageDepartment/>}></Route>
          <Route path='editpatient/:id' element={<EditPatients/>}></Route>
          <Route path='managepatient' element={<ManagePatient/>}></Route>
          <Route path='manageappts' element={<ManageAppointments/>}></Route>
          </Route>

          
          <Route path='/doctor' element={<DoctorLayout/>}>
          <Route path='/doctor' element={<DoctorDashboard/>}></Route> 
          <Route path='doctorProfile/:id' element={<DoctorProfile/>}></Route>
          <Route path='viewpatient' element={<PatientsList/>}></Route>
          <Route path='viewappt' element={<ViewAppointments/>}></Route>  
          <Route path='appthistory' element={<AppointmentHistory/>}></Route>        
          </Route>
          
        </Routes>
      </BrowserRouter>
      <ToastContainer/>
    </>
  )
}

export default App
