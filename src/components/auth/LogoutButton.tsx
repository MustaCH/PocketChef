'use client';

import { signOut } from "firebase/auth";
import { auth } from "@/firebase/config";

export default function LogoutButton() {
  return (
    <button
      className="font-semibold text-sm text-red-700"
      onClick={() => signOut(auth)}
    >
      Cerrar sesión
    </button>
  );
}
