import AppLayout from '@/layouts/app-layout'
import { Head } from '@inertiajs/react'
import React from 'react'

export default function Dashboard() {
    return (
        <>
            <Head title='Dashboard'/>
        </>
    )
}

Dashboard.layout = (page: React.ReactNode) => <AppLayout children={page}/>
