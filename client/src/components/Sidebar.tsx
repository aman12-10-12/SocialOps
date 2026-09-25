import { CalendarDaysIcon, LayoutDashboardIcon, LogOutIcon, UserIcon, Wand2Icon } from 'lucide-react'
import { NavLink, useLocation } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

// Neumorphism shadow tokens (SocialOps palette)
const NEU_INSET = "shadow-[inset_5px_5px_10px_rgba(1,31,75,0.14),inset_-5px_-5px_10px_rgba(255,255,255,0.85)]"

const Sidebar = ({isOpen, setIsOpen} : {isOpen : boolean, setIsOpen : (val: boolean) => void}) => {

    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation()

    const handleLogout = async () => {
        await logout();
        navigate("/login", { replace: true });
    };

    const navItems = [
        {name: "Dashboard", icon: LayoutDashboardIcon, path: "/dashboard"},
        {name: "Accounts", icon: UserIcon, path: "/accounts"},
        {name: "Scheduler", icon: CalendarDaysIcon, path: "/schedule"},
        {name: "AI Composer", icon: Wand2Icon, path: "/ai-composer"}
    ]
  return (
    <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#e4edf2] shadow-[4px_0_16px_rgba(1,31,75,0.12)] flex flex-col h-full transform transition-transform duration-200 ease-in-out md:relative md:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
        
        {/* Logo */} 
        <div className='p-6 pb-4'>
            <div className='text-xl tracking-tight text-[#011f4b] flex items-center gap-1.5'>
                <img src='/logo.svg' alt='logo' className='size-6'/> SocialOps
            </div>
        </div>

        {/* nav section label */}
        <div className='px-6 py-2'>
            <span className='text-xs text-[#6497b1] uppercase tracking-wider'>Menu</span>
        </div>

        {/* Nav links */}
        <nav className='flex-1 px-3 space-y-1'>
            {navItems.map((item)=> {
                const isActive = location.pathname === item.path;
                return (
                    <NavLink key={item.name} to={item.path} end={item.path === "/dashboard"}
                    onClick={()=>setIsOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-150 
                    ${isActive ? `bg-[#e4edf2] text-[#4500e2] ${NEU_INSET}` : "text-[#03396c]/70 hover:bg-[#d8e6ef]/40 hover:text-[#011f4b]"}`}>
                        <item.icon className={`size-4.5 shrink-0 ${isActive ? "text-[#5813e1]" : "text-[#6497b1]"}`} />
                        {item.name}
                        {isActive && <span className='ml-auto w-[5px] h-5 rounded-full bg-gradient-to-b from-[#5813e1] to-[#4500e2]'/>}
                    </NavLink>
                )
            })}
        </nav>

        {/* User Footer*/}
        <div className='p-4 border-t border-[#bbdcf0]/60'>
            <div className='flex items-center gap-3 p-2 rounded-xl hover:bg-[#d8e6ef]/40 transition-colors'>
                <div className='size-8 rounded-full bg-gradient-to-br from-[#5813e1] to-[#4500e2]
                flex items-center justify-center text-white text-sm font-medium shrink-0'>
                    {user?.name?.charAt(0).toUpperCase() || "U"}
                </div>
                <div className='flex-1 min-w-0'>
                    <div className='text-sm text-[#011f4b] truncate'>{user?.name}</div>
                    <div className='text-xs text-[#6497b1] truncate'>{user?.email}</div>
                </div>
            </div>

            <button 
            onClick={handleLogout}
            className='mt-1 flex items-center gap-2 px-3 py-2 w-full rounded-xl text-sm text-[#03396c]/70
            hover:bg-[#d8e6ef]/40 hover:text-[#4500e2] transition-all duration-150'>
                <LogOutIcon className='size-4'/>
                Sign Out
            </button>
        </div>
    </div>
  )
}

export default Sidebar