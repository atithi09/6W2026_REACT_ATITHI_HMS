import { addDoc, collection } from "firebase/firestore"
import FeedbackModel from "../models/FeedbackModel"
import { db } from "../firebase/FirebaseConfig"

class FeedbackService{

async add(data){
let feedback=new FeedbackModel()
feedback.patientId= data.patientId,
feedback.doctorId=data.doctorId,
feedback.rating=data.rating,
feedback.review=data.review
feedback.experience=data.experience
const docref= await addDoc(collection(db,"feedback"),{...feedback})
return docref;
}






}

export default new FeedbackService() 