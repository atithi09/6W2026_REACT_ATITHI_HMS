// import DoctorModel from "../models/DoctorModel";
import { collection, addDoc, getDocs, doc, getDoc, updateDoc, deleteDoc, setDoc, where, query } from "firebase/firestore"
import { auth, db } from "../firebase/FirebaseConfig"
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import DoctorModel from "../models/DoctorModel";

class DoctorServices {

    async registerDoctor(data) {
        const userData = await createUserWithEmailAndPassword(auth, data.email, data.password)
        const user = userData.user
        let newUser = new DoctorModel()
        newUser.id = user.uid
        newUser.name = data.name
        newUser.email = user.email
        newUser.userType = 2
        newUser.dob = data.dob
        newUser.departmentid = data.departmentid;
        newUser.mobile = data.mobile

        const setDocData = await setDoc(doc(db, "users", user.uid), { ...newUser });
        await signOut(auth);
        return setDocData

    }

    async all() {
        let q = query(collection(db, "users"), where("userType", "==", 2))
        const querySnapshot = await getDocs(q);
        let doctors = []
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            doctors.push({ id: doc.id, ...doc.data() })
        });
        return doctors;
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

    async deleteDoctor(id) {
        const docref = doc(db, "users", id)
        await deleteDoc(docref)
    }

}
export default new DoctorServices();