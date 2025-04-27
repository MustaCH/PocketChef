'use client'

import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/config";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import LogoutButton from "@/components/auth/LogoutButton";
import AuthModal from "./AuthModal";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator
} from "../ui/dropdown-menu";
import { Spinner } from "@heroui/spinner";

const GENERIC_AVATAR = 'https://ui-avatars.com/api/?name=User&background=random';


import { useTheme } from "@/hooks/useTheme";

export default function AuthStatus() {
  const [user, loading, error] = useAuthState(auth);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [initialTab, setInitialTab] = useState<'login' | 'register'>('login');
  const { theme, toggleTheme } = useTheme();

  if (loading) return <Spinner/>;
  if (error) return <span className="text-red-500">Error: {error.message}</span>;
  if (user) return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="focus:outline-none">
          <img
            src={user.photoURL || GENERIC_AVATAR}
            alt="Avatar"
            className="w-10 h-10 rounded-full border-2 border-green-700 object-cover cursor-pointer"
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[150px]">
        <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">{user.displayName || user.email}</div>
        <DropdownMenuSeparator />
        <button
          onClick={toggleTheme}
          className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors rounded"
        >
          {theme === "dark" ? (
            <svg xmlns="http://www.w3.org/2000/svg"   viewBox="0 0 24 24" fill="none" stroke="currentColor"  strokeLinecap="round" strokeLinejoin="round" width={24} height={24}  strokeWidth={2}> <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z"></path> </svg> 
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg"   viewBox="0 0 24 24" fill="none" stroke="currentColor"  strokeLinecap="round" strokeLinejoin="round" width={24} height={24}  strokeWidth={2}> <path d="M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0"></path> <path d="M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7"></path> </svg> 
          )}
          <span>{theme === "dark" ? "Oscuro" : "Claro"}</span>
        </button>
        <DropdownMenuSeparator />
        <div className="px-4 py-2">
          <LogoutButton />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );



  return (
    <span className="flex gap-2 items-center">
      <button
        className="px-3 py-1 bg-transparent text-green-700 text-sm font-semibold rounded hover:bg-gray-300"
        onClick={() => { setInitialTab('login'); setShowAuthModal(true); }}
      >
        Ingresar
      </button>
      <button
        className="px-3 py-1 bg-green-700 text-white text-sm font-semibold rounded hover:bg-green-800 transition"
        onClick={() => { setInitialTab('register'); setShowAuthModal(true); }}
      >
        Registrarse
      </button>
      <AuthModal open={showAuthModal} onClose={() => setShowAuthModal(false)} initialTab={initialTab} />
    </span>
  );
}
