import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import { MedicalRecord } from "../models/MedicalRecord";
import { db } from "../firebase/FirebaseConfig";

class MedicalRecordServices {

    async add(data) {
        let newRecord = new MedicalRecord()
        newRecord.appointmentId = data.appointmentId
        newRecord.patientId = data.patientId
        newRecord.patientName=data.patientName
        newRecord.doctorId = data.doctorId
        newRecord.diagnosis = data.diagnosis
        newRecord.symptoms = data.symptoms
        newRecord.treatment = data.treatment
        newRecord.notes = data.notes
        const docRef = await addDoc(collection(db, "medicalRecord"), { ...newRecord });

        return docRef
    }

    async single(id){
         const docRef = doc(db, "medicalRecord", id);
                const docSnap = await getDoc(docRef);
        
                if (docSnap.exists()) {
                    return { id: docSnap.id, ...docSnap.data() }
                    // docSnap.data() will be undefined in this case
                }
                else {
                    console.log("no such document exist")
                    return false
                }
    }
}
export default new MedicalRecordServices()