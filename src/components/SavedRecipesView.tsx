'use client';
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/config";
import SavedRecipesList from "@/components/SavedRecipesList";
import SavedRecipeDetail from "@/components/SavedRecipeDetail";
import { motion, AnimatePresence } from "framer-motion";


import { Spinner } from "@heroui/spinner";

export default function SavedRecipesView({ user }: { user: any }) {
  const [recipes, setRecipes] = useState<any[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number|null>(null);
  const [loading, setLoading] = useState(true);
  const [showDetailMobile, setShowDetailMobile] = useState(false);

  useEffect(() => {
    async function fetchRecipes() {
      const snapshot = await getDocs(collection(db, "users", user.uid, "recipes"));
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setRecipes(data);
    }
    fetchRecipes();
  }, [user]);

  useEffect(() => {
    setLoading(true);
    async function fetchRecipes() {
      const snapshot = await getDocs(collection(db, "users", user.uid, "recipes"));
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setRecipes(data);
      setLoading(false);
    }
    fetchRecipes();
  }, [user]);

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  useEffect(() => {
    if (!isMobile && recipes.length > 0) {
      setSelectedIndex(0);
    }
    if (isMobile) {
      setSelectedIndex(null);
      setShowDetailMobile(false);
    }
  }, [isMobile, recipes.length]);

  if (loading) {
    return <div className="flex justify-center items-center min-h-[200px]"><Spinner /></div>;
  }
  if (recipes.length === 0) {
    return <div className="p-4">No tienes recetas guardadas.</div>;
  }

  return (
    <div className="flex min-h-screen w-full bg-secondary">
      <div className={`border-r w-full md:w-1/3 ${isMobile && showDetailMobile ? "hidden" : "block"}`}>
        <SavedRecipesList
          recipes={recipes}
          selectedIndex={!isMobile ? (selectedIndex ?? -1) : -1}
          onSelect={i => { setSelectedIndex(i); setShowDetailMobile(true); }}
        />
      </div>
      <div className={`flex-1 w-full ${isMobile && !showDetailMobile ? "hidden" : "block"}`}>
        {isMobile ? (
          <AnimatePresence>
            {showDetailMobile && selectedIndex !== null && (
              <motion.div
                key="recipe-detail-mobile"
                initial={{ x: "100%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "100%", opacity: 0, transition: { duration: 0.2 } }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="absolute left-0 w-full bg-background z-20 top-16"
                style={{ height: "calc(100vh - 4rem)" }}
              >
                <SavedRecipeDetail
                  recipe={recipes[selectedIndex]}
                  onBack={() => setShowDetailMobile(false)}
                />
              </motion.div>
            )}
          </AnimatePresence>
        ) : (
          selectedIndex !== null && (
            <SavedRecipeDetail
              recipe={recipes[selectedIndex]}
              onBack={undefined}
            />
          )
        )}
      </div>
    </div>
  );
}
