'use client'

import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "@/firebase/config";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import AuthModal from "@/components/auth/AuthModal";
import { Spinner } from "@heroui/spinner";

interface SaveRecipeButtonProps {
  recipe: any; // Cambia el tipo según tu modelo de receta
}

export default function SaveRecipeButton({ recipe }: SaveRecipeButtonProps) {
  const [user] = useAuthState(auth);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Cuando cambia la receta, resetea el estado de éxito
  useEffect(() => {
    setSuccess(false);
  }, [recipe]);
  const [error, setError] = useState("");

  // SVG icons
  const BookmarkIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={24} height={24} strokeWidth={2} aria-hidden="true">
      <path d="M18 7v14l-6 -4l-6 4v-14a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4z"></path>
    </svg>
  );
  const BookmarkIconFilled = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width={24} height={24} strokeWidth={2} aria-hidden="true">
      <path d="M18 7v14l-6 -4l-6 4v-14a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4z"></path>
    </svg>
  );

  const handleSave = async () => {
    if (!user) {
      setModalOpen(true);
      return;
    }
    setLoading(true);
    setError("");
    // Limpia el objeto de campos undefined y loggea
    // Prueba: guardar sin el campo createdAt
    const cleanRecipe = Object.fromEntries(
      Object.entries({ ...recipe })
        .filter(([_, v]) => v !== undefined)
    );

    try {
      await addDoc(collection(db, "users", user.uid, "recipes"), cleanRecipe);
      setSuccess(true);
    } catch (e: any) {
      setError(e.message || JSON.stringify(e));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        className="btn btn-success flex items-center justify-center p-2"
        onClick={handleSave}
        disabled={loading}
        aria-label={loading ? "Guardando..." : success ? "Receta guardada" : "Guardar receta"}
        title={loading ? "Guardando..." : success ? "Receta guardada" : "Guardar receta"}
      >
        {loading ? (
          <Spinner/>
        ) : success ? (
          BookmarkIconFilled
        ) : (
          BookmarkIcon
        )}
      </button>
      <AuthModal open={modalOpen} onClose={() => setModalOpen(false)} />
      {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
    </>
  );
}
