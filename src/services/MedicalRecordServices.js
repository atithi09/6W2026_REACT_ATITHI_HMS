import { addDoc, collection } from "firebase/firestore";
import { MedicalRecord } from "../models/MedicalRecord";
import { db } from "../firebase/FirebaseConfig";

class MedicalRecordServices {

    async add(data) {
        let newRecord = new MedicalRecord()
        newRecord.appointmentId = data.appointmentId
        newRecord.patientId = data.patientId
        newRecord.doctorId = data.doctorId
        newRecord.diagnosis = data.diagnosis
        newRecord.symptoms = data.symptoms
        newRecord.treatment = data.treatment
        newRecord.notes = data.notes
        const docRef = await addDoc(collection(db, "medicalRecord"), { ...newRecord });

        return docRef
    }
}
export default new MedicalRecordServices()