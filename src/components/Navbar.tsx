'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/config";
import AuthStatus from "@/components/auth/AuthStatus";
import LogoutButton from "@/components/auth/LogoutButton";

export default function Navbar() {
  const pathname = usePathname();
  const [user] = useAuthState(auth);

  const BookmarkIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={24} height={24} strokeWidth={2} aria-hidden="true">
      <path d="M18 7v14l-6 -4l-6 4v-14a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4z"></path>
    </svg>
  );
  const BookmarkIconFilled = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={24} height={24} strokeWidth={2} aria-hidden="true">
      <path d="M18 7v14l-6 -4l-6 4v-14a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4z"></path>
    </svg>
  );

  return (
    <nav className="w-full bg-white border-b flex items-center px-4 py-2 justify-between shadow-sm">
      {pathname === "/saved-recipes" && <div className="flex-1 flex items-center"> 
        <Link href="/" className="text-2xl font-bold text-green-700 flex items-center gap-2">
          <img className='w-12 h-12' src='/logo.png' alt='PocketChef Logo'/>
        </Link>             
      </div>}
      <div className={`flex-1 flex items-center gap-4 ${pathname === "/saved-recipes" ? "justify-end" : "justify-between"}`}>
        {pathname !== "/saved-recipes" && (
          <Link href="/" className="text-2xl font-bold text-green-700 flex items-center gap-2">
            <img className='w-12 h-12' src='/logo.png' alt='PocketChef Logo'/>
          </Link> 
        )}
        <div className="flex items-center gap-2">
          {user && (
            <Link href="/saved-recipes" className="flex items-center gap-1 px-4 py-2 text-green-700 font-semibold transition-colors">
              Guardadas {pathname === "/saved-recipes" ? <span className="text-green-700">{BookmarkIconFilled}</span> : <span className="text-green-700">{BookmarkIcon}</span>}
            </Link>
          )}
          <div className="flex items-center gap-2">
            <AuthStatus />
          </div>
        </div>
      </div>
    </nav>
  );
}
