import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/config";
import SavedRecipesList from "@/components/SavedRecipesList";
import SavedRecipeDetail from "@/components/SavedRecipeDetail";

export default function SavedRecipesView({ user }: { user: any }) {
  const [recipes, setRecipes] = useState<any[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number|null>(null);
  const [showDetailMobile, setShowDetailMobile] = useState(false);

  useEffect(() => {
    async function fetchRecipes() {
      const snapshot = await getDocs(collection(db, "users", user.uid, "recipes"));
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setRecipes(data);
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
        {(selectedIndex !== null && (!isMobile || showDetailMobile)) && (
          <SavedRecipeDetail
            recipe={recipes[selectedIndex]}
            onBack={isMobile ? () => setShowDetailMobile(false) : undefined}
          />
        )}
      </div>
    </div>
  );
}
