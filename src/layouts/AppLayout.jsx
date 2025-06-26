import Header from '@/components/Header'
import React from 'react'
import { Outlet } from 'react-router-dom'

const AppLayout = () => {
    return (
        <>
            <div className="grid-background"></div>
            <main className="min-h-screen container lg:px-28 md:px-20 sm:px-16 ">
                <Header />
                <Outlet />
            </main>
            <div className="p-10 text-center bg-gray-800 mt-10">
                Made with 💗 by Herika Rajput
            </div>
        </>
    )
}

export default AppLayout