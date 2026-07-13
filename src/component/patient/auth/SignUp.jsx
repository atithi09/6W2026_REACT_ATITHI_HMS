import { useState } from "react"
import { toast } from "react-toastify"
import UserService from "../../../services/UserService"
export default function SignUp() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPass, setConfirmPass] = useState('')

    async function submitForm(e) {
        e.preventDefault()
        try {
            let payload = {
                name: name,
                email: email,
                password: password
            }
            await UserService.register(payload)
            toast.success("User Registered")
        } catch (error) {
            console.log(error);
            console.log(error.code);
            console.log(error.message);

            if (error.code === "auth/weak-password") {
                toast.error("Password must be at least 6 characters long.");
            } else if (error.code === "auth/email-already-in-use") {
                toast.error("Email already exists.");
            } else {
                toast.error(error.message);
            }
        }
    }
    return (
        <>
            <main className="container  ">
                <div className="row login">
                    <div className="col-12 text-center">
                        <h1>Sign Up</h1>
                        <p className="hero-description my-3 fs-5">Please Sign Up to cretae a new account.</p>
                    </div>
                </div>
                <div className="row align-items-center ">

                    <div className="col-12 mb-5 col-lg-6 d-flex justify-content-center align-items-center ">
                        <img src="assets/img/img-login.webp" className="img-fluid login-img" />
                    </div>

                    <div className="col-12 mb-5 col-lg-6 ">
                        <form
                            action=""
                            method=""
                            className=""
                            onSubmit={submitForm}
                        >
                            <div className="row g-4 d-flex align-items-center">

                                <div className="col-12 d-flex justify-content-center">
                                    <input
                                        type="text"
                                        className="form-control w-75"
                                        name="name"
                                        id="name"
                                        placeholder="Enter your name"
                                        required=""
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                                <div className="col-12 d-flex justify-content-center">
                                    <input
                                        type="email"
                                        className="form-control w-75"
                                        name="email"
                                        id="email"
                                        placeholder="Email"
                                        required=""
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="col-12 d-flex justify-content-center ">
                                    <input
                                        type="password"
                                        className="form-control w-75 "
                                        name="passwrod"
                                        id="passwrod"
                                        placeholder="Enter Password"
                                        required=""
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <div className="col-12 d-flex justify-content-center mb-4">
                                    <input
                                        type="password"
                                        className="form-control w-75 "
                                        name="c-passwrod"
                                        id="c-passwrod"
                                        placeholder="Confirm Password"
                                        required=""
                                        onChange={(e) => setConfirmPass(e.target.value)}
                                    />
                                </div>


                                <div className="col-12 text-center">
                                    <button type="submit" className="btn btn-primary text-white w-75">
                                        Create account
                                    </button>
                                </div>

                            </div>
                        </form>
                    </div>
                </div>
            </main>



        </>
    )
}