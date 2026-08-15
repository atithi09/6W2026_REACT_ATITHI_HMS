import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/FirebaseConfig";
import BillModel from "../models/BillModel";

class BillService {

    async add(data) {
        let newBill = new BillModel();
        newBill.appointmentId = data.appointmentId;
        newBill.patientId = data.patientId;
        newBill.doctorId = data.doctorId;
        newBill.invoiceNumber = data.invoiceNumber;
        newBill.consultationFee = data.consultationFee;
        newBill.totalAmount = data.totalAmount;
        newBill.paymentId = data.paymentId;
        newBill.paymentMethod = data.paymentMethod;
        newBill.paymentStatus = data.paymentStatus;
        newBill.createdAt = data.createdAt;

        const docRef = await addDoc(
            collection(db, "Bills"),
            { ...newBill }
        );

        return docRef.id;
    }

    async BillByPatient(patientId){
        const q = query(collection(db, "Bills"), where("patientId", "==", patientId))
                const querySnapshot = await getDocs(q)
                let Bills = []
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    Bills.push({ id: doc.id, ...doc.data() })
                });
                return Bills
    }

    async BillByDoctor(doctorId){
        const q = query(collection(db, "Bills"), where("doctorId", "==", doctorId))
                const querySnapshot = await getDocs(q)
                let Bills = []
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    Bills.push({ id: doc.id, ...doc.data() })
                });
                return Bills

    }

   async allBills() {
        let bills = []
        const querySnapshot = await getDocs(collection(db, "Bills"));
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
           
            bills.push({ id: doc.id, ...doc.data() })
        });
        return bills
    }
}

export default new BillService();