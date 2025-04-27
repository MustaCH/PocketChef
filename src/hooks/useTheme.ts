import { useEffect, useState } from "react";
import { db } from "@/firebase/config";
import { doc, getDoc, setDoc } from "firebase/firestore";

export function useTheme(user?: { uid: string }) {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("theme") as "light" | "dark") || "light";
    }
    return "light";
  });

  // Leer preferencia de Firestore al iniciar sesión
  useEffect(() => {
    if (user && user.uid) {
      const fetchTheme = async () => {
        const ref = doc(db, "users", user.uid);
        const snap = await getDoc(ref);
        const firestoreTheme = snap.exists() ? snap.data().theme : null;
        if (firestoreTheme === "dark" || firestoreTheme === "light") {
          setTheme(firestoreTheme);
          localStorage.setItem("theme", firestoreTheme);
        }
      };
      fetchTheme();
    }
  }, [user]);

  // Aplicar el tema al html y guardar en localStorage
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Guardar preferencia en Firestore al cambiar el tema
  const toggleTheme = async () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    if (user && user.uid) {
      await setDoc(doc(db, "users", user.uid), { theme: newTheme }, { merge: true });
    }
  };

  return { theme, toggleTheme };
}
