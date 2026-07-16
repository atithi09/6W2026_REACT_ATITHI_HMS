export default class AppointmentModel{
    patientId=''
    doctorId=''
    appointmentDate=''
    appointmentTime=''
    reason=''
    appointmentStatus='Pending' //Pending/Accepted/Completed/Cancelled
    createdAt=Date.now()
    updatedAt=Date.now()
}