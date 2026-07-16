import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import AppointmentModel from "../models/AppointmentModel";
import { db } from "../firebase/FirebaseConfig";

class AppointmentService {

    async add(data) {
        let newApment = new AppointmentModel()
        newApment.patientId = data.patientId
        newApment.doctorId = data.doctorId
        newApment.appointmentDate = data.appointmentDate
        newApment.appointmentTime = data.appointmentTime
        newApment.reason = data.reason
        const docRef = addDoc(collection(db, "appointments"), { ...newApment });
        return docRef;
    }

    async  isSlotBooked(doctorId, appointmentDate, appointmentTime) {
    const q = query(
        collection(db, "appointments"),
        where("doctorId", "==", doctorId),
        where("appointmentDate", "==", appointmentDate),
        where("appointmentTime", "==", appointmentTime)
    );

    const snapshot = await getDocs(q);

    return !snapshot.empty;
}
}

export default new AppointmentService()