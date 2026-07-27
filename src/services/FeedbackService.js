import { addDoc, collection, getDocs, query, where } from "firebase/firestore"
import FeedbackModel from "../models/FeedbackModel"
import { db } from "../firebase/FirebaseConfig"

class FeedbackService{

async add(data){
let feedback=new FeedbackModel()
feedback.patientId= data.patientId,
feedback.name=data.name,
feedback.email=data.email,
feedback.doctorId=data.doctorId,
feedback.rating=data.rating,
feedback.review=data.review
feedback.experience=data.experience
const docref= await addDoc(collection(db,"feedback"),{...feedback})
return docref;
}

async all(){
    let feedback=[]
    let querySnapshot= await getDocs(collection(db,"feedback"))
    querySnapshot.forEach((doc)=>{
        feedback.push({id:doc.id,...doc.data()})
    })
    return feedback
}
async FeedbackByDoctor(doctorId) {
        const q = query(collection(db, "feedback"), where("doctorId", "==", doctorId))
        const querySnapshot = await getDocs(q)
        let feedback = []
        querySnapshot.forEach((appt) => {
            // doc.data() is never undefined for query doc snapshots
            feedback.push({ id: appt.id, ...appt.data() })
        });
        return feedback
    }



}

export default new FeedbackService() 