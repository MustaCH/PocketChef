"use client";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase/config";

export default function LogoutButton() {
  return (
    <button
      className="btn btn-secondary"
      onClick={() => signOut(auth)}
    >
      Cerrar sesión
    </button>
  );
}
