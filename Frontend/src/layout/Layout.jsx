import React from 'react'
import Navbar from '../components/NavBar'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import { Toaster } from 'sonner'

const Layout = () => {
    return (
        <>
            <Navbar />
            <main><Outlet /></main>
            <Toaster />
            <Footer />
        </>
    )
}

export default Layout