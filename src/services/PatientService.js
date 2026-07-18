import { collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db } from "../firebase/FirebaseConfig";

class PatientService {

    async all() {

        let q = query(collection(db, "users"), where("userType", "==", 3))
        const querySnapshot = await getDocs(q);
        let patients = [];
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            patients.push({ id: doc.id, ...doc.data() });
        });
        return patients
    }

    async getSingle(id) {
        const docRef = doc(db, "users", id);
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
    
    async update(payload, id) {
        const doctorRef = doc(db, "users", id);
        return await updateDoc(doctorRef, payload);
    }

    async delete(id) {
        const docRef = doc(db, 'users', id)
        await deleteDoc(docRef)
    }
}

export default new PatientService()