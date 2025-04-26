'use client'

import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/config";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import LogoutButton from "./LogoutButton";
import AuthModal from "./AuthModal";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator
} from "../ui/dropdown-menu";
import { Spinner } from "@heroui/spinner";

const GENERIC_AVATAR = 'https://ui-avatars.com/api/?name=User&background=random';


export default function AuthStatus() {
  const [user, loading, error] = useAuthState(auth);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [initialTab, setInitialTab] = useState<'login' | 'register'>('login');

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
        <div className="px-4 py-2 text-sm text-gray-700">{user.displayName || user.email}</div>
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
