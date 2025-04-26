'use client';

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/config";
import SavedRecipesView from "@/components/SavedRecipesView";

export default function SavedRecipesPage() {
  const [user, loading] = useAuthState(auth);
  if (loading) return <div>Cargando...</div>;
  if (!user) return <div className="grid place-items-center h-screen"><h1>Debes iniciar sesión para ver tus recetas guardadas.</h1></div>;
  return <SavedRecipesView user={user} />;
}
