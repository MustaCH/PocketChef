"use client";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/config";

export default function AuthStatus() {
  const [user, loading, error] = useAuthState(auth);

  if (loading) return <span>Cargando usuario...</span>;
  if (error) return <span className="text-red-500">Error: {error.message}</span>;
  if (user) return <span>Hola, {user.displayName || user.email}!</span>;
  return <span>No has iniciado sesión.</span>;
}
