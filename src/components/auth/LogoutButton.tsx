'use client';

import { signOut } from "firebase/auth";
import { auth } from "@/firebase/config";

export default function LogoutButton() {
  return (
    <button
      className="font-semibold text-sm"
      onClick={() => signOut(auth)}
    >
      Cerrar sesión
    </button>
  );
}
