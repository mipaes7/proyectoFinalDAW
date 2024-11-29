import React from "react";
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from "./Home";
import MangasLibrary from "./MangasLibrary";
import MangaDetails from "./MangaDetails";
import Login from "../Auth/Login";
import Register from "../Auth/Register"

const Main = () => {


  return (
    <main className="mainContainer">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/library' element={<MangasLibrary />} />
        <Route path='/manga/:id' element={<MangaDetails />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/*' element={<Navigate to={'/'} />} />
      </Routes>
    </main>
  );
};

export default Main;
