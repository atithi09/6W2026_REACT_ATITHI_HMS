import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { auth, db } from "../firebase/firebaseConfig"
import UserModel from "../models/UserModel"
import { doc, setDoc, getDoc } from "firebase/firestore"
import AuthService from "./AuthService"

class UserService {

    async register(data) {
        const userData = await createUserWithEmailAndPassword(auth, data.email, data.password)
        console.log(userData)
        const user = userData.user
        let newUser = new UserModel()
        newUser.id = user.uid
        newUser.name = data.name
        newUser.email = user.email
        newUser.userType = 3

        const setDocData = await setDoc(doc(db, "users", user.uid), { ...newUser });
        await signOut(auth);
        return setDocData

    }

    async login(data) {
        const userData = await signInWithEmailAndPassword(auth, data.email, data.password)
        const user = userData.user

        const userFirestoreData = await getDoc(doc(db, "users", user.uid))
        const userdata = userFirestoreData.data()
        if (userFirestoreData.exists()) {

            let authData = {
                id: user.uid,
                email: user.email,
                name: userdata.name,
                userType: userdata.userType,
                token: user.accessToken
            };

            await AuthService.setData(authData);

            return authData; // return user details, so we do not need to access localstorage in Login component

        } else {
            throw new Error("User not found!");
        }
    }



}

export default new UserService()