import { useState } from 'react'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import UserService from '../../../services/UserService'
export default function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    let nav = useNavigate()
    async function submitForm(e) {
        e.preventDefault()

        let payload = {
            email: username,
            password: password
        }

      try{
        const user = await UserService.login(payload)
        toast.success("logged in")

        if(user.userType=="1"){
            nav("/admin")
        }
        else if(user.userType=="2"){
            nav("/doctor")
        }
        else{
            nav("/")
        }
    }

        catch(err){
            console.log("error:",err)
            toast.error("User not found")
        }

    }
    return (
        <>
            <main className="container  ">
                <div className="row login">
                    <div className="col-12 text-center">
                        <h1>Login</h1>
                        <p className="hero-description my-3 fs-5"> Welcome Back! Please login to your account.</p>
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
                                        type="email"
                                        className="form-control w-75"
                                        name="email"
                                        id="name"
                                        placeholder="Enter email"
                                        required=""
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </div>
                                <div className="col-12 d-flex justify-content-center mb-4">
                                    <input
                                        type="password"
                                        className="form-control w-75 "
                                        name="subject"
                                        id="subject"
                                        placeholder="Enter Password"
                                        required=""
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>


                                <div className="col-12 text-center">
                                    <button type="submit" className="btn btn-primary text-white w-75">
                                        Login
                                    </button>
                                </div>

                                <div className="col-12 text-center">
                                    <p className='d-inline'>Do not have an account? </p>
                                    <Link to='/signup' className="learn-more">
                                        <span>Sign Up</span>
                                        <i className="fas fa-arrow-right" />
                                    </Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </main>



        </>
    )
}