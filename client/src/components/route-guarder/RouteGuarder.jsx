import { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import UserContext from "../../contexts/UserContext";

export default function RouteGuarder(){
    const { isAuthenticated } = useContext(UserContext)

    if(!isAuthenticated)
        return <Navigate to={"/login"}/>

    return <Outlet/>
}