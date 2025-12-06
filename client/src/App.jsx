import { Route, Routes } from "react-router";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import RegisterForm from "./components/register/RegisterForm";
import Header from "./components/header/Header";
import MovieCatalog from "./components/movie-catalog/MovieCatalog";
import NotFound from "./components/not-found/NotFound";
import { useContext} from "react";
import UserContext from "./contexts/UserContext";
import Logout from "./components/logout/Logout";
import CreateMovie from "./components/create-movie/CreateMovie";
import MovieDetails from "./components/movie-details/MovieDetails";
import EditMovie from "./components/edit-movie/EditMovie";

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
        <Route path="/catalog/create" element={<CreateMovie/>}/>
        <Route path="/catalog/:movieId/details" element={<MovieDetails/>}/>
        <Route path="/catalog/:movieId/edit" element={<EditMovie/>}/>
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </>
  )
}