import { addDoc, collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import AppointmentModel from "../models/AppointmentModel";
import { db } from "../firebase/FirebaseConfig";
import AuthService from "./AuthService";

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

    async isSlotBooked(doctorId, appointmentDate, appointmentTime) {
        const q = query(
            collection(db, "appointments"),
            where("doctorId", "==", doctorId),
            where("appointmentDate", "==", appointmentDate),
            where("appointmentTime", "==", appointmentTime)
        );

        const snapshot = await getDocs(q);

        return !snapshot.empty;
    }

    async AppointmentByDoctor(doctorId) {
        const q = query(collection(db, "appointments"), where("doctorId", "==", doctorId),where("appointmentStatus","in",["Pending","Accepted"]))
        const querySnapshot = await getDocs(q)
        let appointments = []
        querySnapshot.forEach((appt) => {
            // doc.data() is never undefined for query doc snapshots
            appointments.push({ id: appt.id, ...appt.data() })
        });
        return appointments
    }

    async updateStatus(apptId, status) {
        const appointmentRef = doc(db, "appointments", apptId);
        await updateDoc(appointmentRef, {
            appointmentStatus: status
        });
    }
}

export default new AppointmentService()