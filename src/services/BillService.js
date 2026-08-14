import { addDoc, collection } from "firebase/firestore";
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
}

export default new BillService();