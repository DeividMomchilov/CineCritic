import { Route, Routes } from "react-router";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import RegisterForm from "./components/register/RegisterForm";
import Header from "./components/header/Header";
import MovieCatalog from "./components/movie-catalog/MovieCatalog";
import NotFound from "./components/not-found/NotFound";
import Logout from "./components/logout/Logout";
import CreateMovie from "./components/create-movie/CreateMovie";
import MovieDetails from "./components/movie-details/MovieDetails";
import EditMovie from "./components/edit-movie/EditMovie";
import RouteGuarder from "./components/route-guarder/RouteGuarder";
import GuestRouter from "./components/guest-router/GuestRouter";
import { ToastContainer } from 'react-toastify';
import Profile from "./components/profile/Profile";

export default function App() {
  return (
    <>
      <Header/>

      <ToastContainer 
          position="bottom-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          theme="dark" // Matches your dark theme perfectly
      />
      
      <Routes>
        
        <Route path="/catalog" element={<MovieCatalog/>}/>
        <Route path="/catalog/:movieId/details" element={<MovieDetails/>}/>
        <Route index element={<Home/>}/>

        <Route element={<GuestRouter/>}>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<RegisterForm/>}/>
        </Route>

        <Route element={<RouteGuarder/>}>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/logout" element={<Logout/>}/>
          <Route path="/catalog/create" element={<CreateMovie/>}/>
          <Route path="/catalog/:movieId/edit" element={<EditMovie/>}/>
        </Route>

        <Route path="*" element={<NotFound/>} />
      </Routes>
    </>
  )
}