import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

export default function GuestRoute({ children }: { children: React.ReactNode }) {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return (
            <div className='flex h-screen items-center justify-center bg-[#e4edf2]'>
                <div className='size-8 border-4 border-[#5813e1] border-t-transparent rounded-full animate-spin' />
            </div>
        );
    }

    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />;
    }

    return <>{children}</>;
}