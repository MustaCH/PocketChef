'use client'

import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { useEffect } from "react";


export default function AuthModal({ open, onClose, initialTab = 'login' }: { open: boolean; onClose: () => void; initialTab?: 'login' | 'register' }) {
  const [tab, setTab] = useState<'login' | 'register'>(initialTab);

  useEffect(() => {
    if (open) setTab(initialTab);
  }, [initialTab, open]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 min-h-screen">
      <div className="flex flex-col gap-12 bg-white dark:bg-neutral-800 rounded-lg shadow-lg p-6 w-96 max-w-md relative">
        <button className="absolute top-2 right-4 text-xl" onClick={onClose}>&times;</button>
        <div className="flex flex-col gap-4 mt-6">
          {
            tab === 'login' ? <h2 className="text-center font-semibold text-2xl">Iniciar sesión</h2> : <h2 className="text-center font-semibold text-2xl">Registrarse</h2>
          }
        </div>
        {tab === 'login' ? <LoginForm onSuccess={onClose} /> : <RegisterForm onSuccess={onClose} />}
        {tab === 'login' ? <p className="text-center text-muted-foreground text-sm">¿No tienes una cuenta? <button onClick={() => setTab('register')} className="text-green-700 font-semibold">Registrarse</button></p> : <p className="text-center text-muted-foreground text-sm">¿Ya tienes una cuenta? <button onClick={() => setTab('login')} className="text-green-700 font-semibold">Iniciar sesión</button></p>}
      </div>
    </div>
  );
}
