"use client";
import { useState } from "react";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/firebase/config";
import { Button } from "../ui/button";

export default function RegisterForm({ onSuccess }: { onSuccess?: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      onSuccess?.();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setLoading(true);
    setError("");
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      onSuccess?.();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleRegister} className="flex flex-col gap-4 w-full max-w-xs mx-auto">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        className="border-2 rounded-lg p-2"
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
        className=" border-2 rounded-lg p-2"
      />
      <Button type="submit" className="bg-green-700 text-white font-semibold p-2" disabled={loading}>
        {loading ? "Registrando..." : "Registrarse"}
      </Button>
      <button type="button" className="bg-blue-600 text-white font-semibold p-2 rounded-lg text-sm flex items-center gap-2 justify-center" onClick={handleGoogle} disabled={loading}>
        Registrarse con Google
      </button>
      {error && <div className="text-red-500 text-sm">{error}</div>}
    </form>
  );
}
