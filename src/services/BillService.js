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
                querySnapshot.forEach((bill) => {
                    // doc.data() is never undefined for query doc snapshots
                    Bills.push({ id: bill.id, ...bill.data() })
                });
                return Bills
    }
}

export default new BillService();