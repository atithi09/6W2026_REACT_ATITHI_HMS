import { addDoc, collection } from "firebase/firestore"
import Prescription from "../models/PrescriptionModel"
import { db } from "../firebase/FirebaseConfig"

class PrescriptionServices{

async add(data) {
        let newPrescription = new Prescription()
        newPrescription.medicalRecordId = data.medicalRecordId
        newPrescription.patientId = data.patientId
        newPrescription.nextVisitDate=data.nextVisitDate
        newPrescription.doctorId = data.doctorId
        newPrescription.medicines = data.medicines
        newPrescription.instructions = data.instructions
       
        const docRef = await addDoc(collection(db, "prescriptions"), { ...newPrescription });

        return docRef
    }




}

export default new PrescriptionServices()