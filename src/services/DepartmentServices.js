import { collection, addDoc, getDocs,doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import DepartmentModel from "../models/DepartmentModel";
import { db } from "../firebase/FirebaseConfig"
import EditDepartment from "../component/admin/manageDepartments/EditDepartment";

class DepartmentServices {

    async add(data) {
        let newDept = new DepartmentModel()
        newDept.name = data.name
        newDept.description = data.description
        newDept.image = data.image
        const docRef = await addDoc(collection(db, "departments"), { ...newDept });

        return docRef
    }

    async all() {
        let departments = []
        const querySnapshot = await getDocs(collection(db, "departments"));
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
           
            departments.push({ id: doc.id, ...doc.data() })
        });
        return departments
    }

    async getSingle(id) {
        const docRef = doc(db, "departments", id);
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
        const doctorRef = doc(db, "departments", id);
        return await updateDoc(doctorRef, payload);
    }

    async deleteDepartment(id) {
        const docref = doc(db, "departments", id)
        await deleteDoc(docref)
    }



}

export default new DepartmentServices()