"use client";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "@/firebase/config";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import AuthModal from "@/components/auth/AuthModal";

interface SaveRecipeButtonProps {
  recipe: any; // Cambia el tipo según tu modelo de receta
}

export default function SaveRecipeButton({ recipe }: SaveRecipeButtonProps) {
  const [user] = useAuthState(auth);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSave = async () => {
    if (!user) {
      setModalOpen(true);
      return;
    }
    setLoading(true);
    setError("");
    try {
      await addDoc(collection(db, "users", user.uid, "recipes"), {
        ...recipe,
        createdAt: Timestamp.now(),
      });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button className="btn btn-success" onClick={handleSave} disabled={loading}>
        {loading ? "Guardando..." : success ? "¡Guardado!" : "Guardar receta"}
      </button>
      <AuthModal open={modalOpen} onClose={() => setModalOpen(false)} />
      {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
    </>
  );
}
