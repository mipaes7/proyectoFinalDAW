import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Main from './components/Main';
import { AuthProvider } from './context/authContext';

function App() {

  return (
    <>
    <AuthProvider>
      <BrowserRouter>
        <Header/>
        <Main/>
      </BrowserRouter>
      <Footer/>
    </AuthProvider>
    </>
  )
}

export default App
