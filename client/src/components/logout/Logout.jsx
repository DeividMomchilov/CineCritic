import { useContext, useEffect } from "react";
import UserContext from "../../contexts/UserContext";
import { useNavigate } from "react-router";

export default function Logout(){
    const {logoutHandler} = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() =>{
    logoutHandler()
        .then(() => navigate('/'))
        .catch(() =>{
            navigate('/')
        });
    },[]);

    return null;
}