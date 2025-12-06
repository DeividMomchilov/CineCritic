import { Route, Routes } from "react-router";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import RegisterForm from "./components/register/RegisterForm";
import Header from "./components/header/Header";
import MovieCatalog from "./components/movie-catalog/MovieCatalog";
import NotFound from "./components/not-found/NotFound";
import { useContext} from "react";
import UserContext from "./contexts/UserContext";
import Logout from "./components/logout/logout";
import CreateMovie from "./components/create-movie/CreateMovie";

export default function App() {
  const { user } = useContext(UserContext);
  return (
    <>
      <Header/>
      <Routes>
        <Route index element={<Home/>}/>
        <Route path="/logout" element={<Logout/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<RegisterForm/>}/>
        <Route path="/catalog" element={<MovieCatalog/>}/>
        <Route path="/create" element={<CreateMovie/>}/>
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </>
  )
}