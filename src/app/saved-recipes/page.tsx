'use client';

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/config";
import SavedRecipesView from "@/components/SavedRecipesView";

export default function SavedRecipesPage() {
  const [user, loading] = useAuthState(auth);
  if (loading) return <div>Cargando...</div>;
  if (!user) return <div>Debes iniciar sesión para ver tus recetas guardadas.</div>;
  return <SavedRecipesView user={user} />;
}
