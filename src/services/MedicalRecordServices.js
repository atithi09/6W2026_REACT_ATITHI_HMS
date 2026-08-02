import { addDoc, collection } from "firebase/firestore";
import { MedicalRecord } from "../models/MedicalRecord";
import { db } from "../firebase/FirebaseConfig";

class MedicalRecordServices{
    async add(data) {
            let newRecord= new MedicalRecord()
            
            const docRef = await addDoc(collection(db, "medicalRecord"), { ...newDept });
    
            return docRef
        }
}