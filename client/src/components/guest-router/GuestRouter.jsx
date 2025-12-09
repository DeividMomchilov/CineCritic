import { useContext } from "react";
import UserContext from "../../contexts/UserContext";
import { Navigate, Outlet } from "react-router";

export default function GuestRouter(){
    const { isAuthenticated } = useContext(UserContext);

    if(isAuthenticated)
        return <Navigate to={"/"}/>

    return <Outlet/>
}