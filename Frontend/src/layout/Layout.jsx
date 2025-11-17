import React from 'react'
import Navbar from '../components/shared/Navbar'
import { Outlet } from 'react-router-dom'
import { Toaster } from 'sonner'
import Footer from '../components/shared/Footer'

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