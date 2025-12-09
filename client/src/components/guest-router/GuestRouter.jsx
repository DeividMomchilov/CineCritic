export default function GuestRouter(){
    const { isAuthenticated } = useContext(UserContext);

    if(isAuthenticated)
        return <Navigate to={"/"}/>

    return <Outlet/>
}