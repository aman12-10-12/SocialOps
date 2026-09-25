import { useState } from 'react'
import Sidebar from './Sidebar'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { MenuIcon } from 'lucide-react'
import { useAuth } from '../context/authContext'

const pageTitles : Record<string, string> = {
    "/dashboard" : "Dashboard",
    "/accounts" : "Social Accounts",
    "/schedule" : "Post Scheduler",
    "/ai-composer" : "AI Composer"
}

const Layout = () => {

    const {isAuthenticated, isLoading} = useAuth()

    const location = useLocation()
    const title = pageTitles[location.pathname] || "SocialAI"
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    
    if(isLoading) {
        return (
            <div className='flex h-screen items-center justify-center bg-[#e4edf2]'>
                <div className='size-8 border-4 border-[#5813e1] border-t-transparent rounded-full animate-spin'/>
            </div>
        )
    }

    if(!isAuthenticated) {
        return <Navigate to="/login" replace />
    }

  return (
    <div className='flex h-screen bg-[#e4edf2]'>

        {/* Mobile Overlay */}

        {isMobileMenuOpen && <div className='fixed inset-0 bg-[#011f4b]/50 z-40 md:hidden'
        onClick={()=> setIsMobileMenuOpen(false)}/>}
        
        <Sidebar isOpen={isMobileMenuOpen} setIsOpen={setIsMobileMenuOpen}/>

        <div className='flex-1 flex flex-col overflow-hidden'>

            {/* Top Bar */}

            <header className='h-16 bg-[#e4edf2] border-b border-[#bbdcf0]/60 flex items-center px-4 md:px-8 gap-4'>
                <button className='md:hidden p-2 -ml-2 text-[#03396c]' onClick={()=> setIsMobileMenuOpen(true)}>
                    <MenuIcon className='size-6'/>
                </button>
                <div>
                    <h1 className='text-[#011f4b]'>{title}</h1>
                    <p className='text-sm text-[#6497b1] hidden sm:block'>Manage and automate your social presence</p>
                </div>
            </header>

            <main className='flex-1 overflow-auto p-4 sm:p-6 md:p-8 xl:p-12'> 
                <Outlet />
            </main>

        </div>
    </div>
  )
}

export default Layout