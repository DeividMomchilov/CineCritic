import { Route, Routes } from "react-router";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import RegisterForm from "./components/register/RegisterForm";
import Header from "./components/header/Header";
import MovieCatalog from "./components/movie-catalog/MovieCatalog";
import NotFound from "./components/not-found/NotFound";
import { useState } from "react";

export default function App() {
  const [user, setUser] = useState(null);

  const registerHandler = async (email,password) => {
    const newUser = { email, password, };

    const response = await fetch('http://localhost:3030/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    });

    const result = await response.json();
    
    setUser(result);
  }

  const loginHandler = (user) => {
  }

  const logoutHandler = () => {
    setUser(null);
  }

  return (
    <>
      <Header/>
      <Routes>
        <Route index element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<RegisterForm onRegister={registerHandler}/>}/>
        <Route path="/catalog" element={<MovieCatalog/>}/>
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </>
  )
}