"use client";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/config";

const GENERIC_AVATAR = 'https://ui-avatars.com/api/?name=User&background=random';


export default function AuthStatus() {
  const [user, loading, error] = useAuthState(auth);

  if (loading) return <span>Cargando usuario...</span>;
  if (error) return <span className="text-red-500">Error: {error.message}</span>;
  if (user) return <span>
      <img
        src={user.photoURL || GENERIC_AVATAR}
        alt="Avatar"
        className="w-10 h-10 rounded-full border-2 border-green-700 object-cover"
      />
  </span>;
  return <span>No has iniciado sesión.</span>;
}
