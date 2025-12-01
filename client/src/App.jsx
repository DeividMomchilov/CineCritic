import { Route, Routes } from "react-router";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import RegisterForm from "./components/register/RegisterForm";
import Header from "./components/header/Header";
import MovieCatalog from "./components/movie-catalog/MovieCatalog";
import NotFound from "./components/not-found/NotFound";
import { useState } from "react";
import UserContext from "./contexts/UserContext";

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

  const userContextValue = {
    user,
    isAuthenticated: !!user?.accessToken,
    registerHandler,
    loginHandler,
    logoutHandler,
  }

  return (
    <UserContext.Provider value={userContextValue}>
      <Header/>
      <Routes>
        <Route index element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<RegisterForm/>}/>
        <Route path="/catalog" element={<MovieCatalog/>}/>
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </UserContext.Provider>
  )
}