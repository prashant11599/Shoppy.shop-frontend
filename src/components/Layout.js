import React from 'react'
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Navbar from './Navbar';
import "./Layout.css"
const Layout = () => {
  return (
    <>
        <Navbar/>
        <Outlet/>
        <Footer/>
    </>
  )
}

export default Layout