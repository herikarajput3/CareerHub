import React from 'react'
import { Outlet } from 'react-router-dom'

const AppLayout = () => {
    return (
        <div>
            AppLayout
            <main><Outlet /></main>
        </div>
    )
}

export default AppLayout