'use client'

import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/config";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const GENERIC_AVATAR = 'https://ui-avatars.com/api/?name=User&background=random';


export default function AuthStatus() {
  const [user, loading, error] = useAuthState(auth);

  if (loading) return <span>Cargando usuario...</span>;
  if (error) return <span className="text-red-500">Error: {error.message}</span>;
  if (user) return (
    <span>
      <img
        src={user.photoURL || GENERIC_AVATAR}
        alt="Avatar"
        className="w-10 h-10 rounded-full border-2 border-green-700 object-cover"
      />
    </span>
  );

  const [showLogin, setShowLogin] = React.useState(false);
  const [showRegister, setShowRegister] = React.useState(false);

  return (
    <span className="flex gap-2 items-center">
      <button
        className="px-3 py-1 bg-green-700 text-white rounded hover:bg-green-800 transition"
        onClick={() => setShowLogin(true)}
      >
        Iniciar sesión
      </button>
      <button
        className="px-3 py-1 bg-transparent text-green-700 rounded hover:bg-gray-300 transition border border-green-700"
        onClick={() => setShowRegister(true)}
      >
        Registrarse
      </button>
      {showLogin && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded shadow p-6 relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl"
              onClick={() => setShowLogin(false)}
              aria-label="Cerrar"
            >
              ×
            </button>
            <LoginForm onSuccess={() => setShowLogin(false)} />
          </div>
        </div>
      )}
      {showRegister && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded shadow p-6 relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl"
              onClick={() => setShowRegister(false)}
              aria-label="Cerrar"
            >
              ×
            </button>
            <RegisterForm onSuccess={() => setShowRegister(false)} />
          </div>
        </div>
      )}
    </span>
  );
}
