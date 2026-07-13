import { signOut } from "firebase/auth";
import { auth } from "../firebase/FirebaseConfig"

class AuthService{
    async setData(data){
        localStorage.setItem('id', data.id);
        localStorage.setItem('email', data.email)
        localStorage.setItem('name', data.name)
        localStorage.setItem('userType', data.userType)
        localStorage.setItem('token', data.token)
        localStorage.setItem('isLogin', true)
    }

     email(){
        return localStorage.getItem("email");
    }

    userType(){
        return localStorage.getItem("userType")
    }

     logout(){
        localStorage.clear()
        sessionStorage.clear()
        signOut(auth);
    }
}

export default new AuthService