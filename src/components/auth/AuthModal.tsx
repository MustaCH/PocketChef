"use client";
import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export default function AuthModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [tab, setTab] = useState<'login' | 'register'>('login');
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
        <button className="absolute top-2 right-2 text-xl" onClick={onClose}>&times;</button>
        <div className="flex mb-4">
          <button className={`flex-1 btn ${tab === 'login' ? 'btn-primary' : 'btn-ghost'}`} onClick={() => setTab('login')}>Iniciar sesión</button>
          <button className={`flex-1 btn ${tab === 'register' ? 'btn-primary' : 'btn-ghost'}`} onClick={() => setTab('register')}>Registrarse</button>
        </div>
        {tab === 'login' ? <LoginForm onSuccess={onClose} /> : <RegisterForm onSuccess={onClose} />}
      </div>
    </div>
  );
}
