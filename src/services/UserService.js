import {
createUserWithEmailAndPassword,
signInWithEmailAndPassword,
signOut,
sendEmailVerification
} from "firebase/auth";

import { auth, db } from "../firebase/FirebaseConfig";
import UserModel from "../models/UserModel";
import { doc, setDoc, getDoc } from "firebase/firestore";
import AuthService from "./AuthService";

class UserService {

async register(data) {
    const userData = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
    );

    const user = userData.user;

    try {
        // Send verification email
        await sendEmailVerification(user);

        // Create patient data
        let newUser = new UserModel();

        newUser.id = user.uid;
        newUser.name = data.name;
        newUser.email = user.email;
        newUser.userType = 3;

        // Save patient data in Firestore
        await setDoc(doc(db, "users", user.uid), {
            ...newUser
        });

        return {
            success: true,
            message: "Verification email sent successfully."
        };

    } finally {
        // Sign out the newly registered patient
        await signOut(auth);
    }
}

async login(data) {
    const userData = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
    );

    const user = userData.user;

    try {
        // Fetch user data from Firestore
        const userFirestoreData = await getDoc(
            doc(db, "users", user.uid)
        );

        // Check whether the user exists
        if (!userFirestoreData.exists()) {
            throw new Error("User not found!");
        }

        const userdata = userFirestoreData.data();

        // Require email verification only for patients
        if (
            Number(userdata.userType) === 3 &&
            !user.emailVerified
        ) {
            const error = new Error(
                "Please verify your email before logging in."
            );

            error.code = "auth/email-not-verified";
            throw error;
        }

        // Prepare authentication data
        const authData = {
            id: user.uid,
            email: user.email,
            name: userdata.name,
            userType: userdata.userType,
            token: user.accessToken
        };

        // Save login information
        await AuthService.setData(authData);

        return authData;

    } catch (error) {
        // Sign out if login validation fails
        await signOut(auth);
        throw error;
    }
}


}

export default new UserService();
