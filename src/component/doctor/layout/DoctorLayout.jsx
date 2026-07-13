import { useEffect } from "react";
import AuthService from "../../../services/AuthService";
import DoctorFooter from "./DoctorFooter";
import DoctorHeader from "./DoctorHeader";
import {Outlet, useNavigate} from "react-router-dom"
import { toast } from "react-toastify";



export default function DoctorLayout() {

  const nav=useNavigate()
    function getEmail(){
        return AuthService.email()
    }
    function getUserType(){
        return AuthService.userType()
    }
    let email=getEmail()
    let userType=getUserType()
    
    function security(){
        if (email== null || userType!=='2'){
            toast.error("Unauthorized access")
            nav("/")
        }
    }
    useEffect(()=>{
        security()
    },[])

  return (
    <>
    <DoctorHeader/>   
    <Outlet/>
    <DoctorFooter/>
    </>     
  )
}