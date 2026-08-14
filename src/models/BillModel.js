export default class BillModel {
    appointmentId = ''
    patientId = ''
    doctorId = ''
    invoiceNumber = Date.now()
    paymentId = ''
    paymentStatus = ''//Pending/Paid
    paymentMethod = ''
    totalAmount = ''
    consultationFee = ''
    createdAt = Date.now()
}