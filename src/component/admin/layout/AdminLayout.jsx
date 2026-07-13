import { Outlet, useNavigate } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import AdminFooter from "./AdminFooter";
import AuthService from "../../../services/AuthService";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function AdminLayout() {
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
        if (email== null || userType!=='1'){
            toast.error("Unauthorized access")
            nav("/")
        }
    }
    useEffect(()=>{
        security()
    },[])
   

    return (
        <>     
        <AdminHeader/>
        <Outlet />
        <AdminFooter/> 
        </> 
    );
}