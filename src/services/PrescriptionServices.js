import { addDoc, collection, getDocs, query, where } from "firebase/firestore"
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

async recordByPatient(patientId){
            const q = query(collection(db, "prescriptions"), where("patientId", "==", patientId))
                    const querySnapshot = await getDocs(q)
                    let medicines = []
                    querySnapshot.forEach((record) => {
                        // doc.data() is never undefined for query doc snapshots
                        medicines.push({ id: record.id, ...record.data() })
                    });
                    return medicines
        }



}

export default new PrescriptionServices()