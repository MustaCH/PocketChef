import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/config";
import SavedRecipesList from "@/components/SavedRecipesList";
import SavedRecipeDetail from "@/components/SavedRecipeDetail";

export default function SavedRecipesView({ user }: { user: any }) {
  const [recipes, setRecipes] = useState<any[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showDetailMobile, setShowDetailMobile] = useState(false);

  useEffect(() => {
    async function fetchRecipes() {
      const snapshot = await getDocs(collection(db, "users", user.uid, "recipes"));
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setRecipes(data);
    }
    fetchRecipes();
  }, [user]);

  // Responsive: detect if mobile
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  if (recipes.length === 0) {
    return <div className="p-4">No tienes recetas guardadas.</div>;
  }

  return (
    <div className="flex h-full w-full bg-secondary">
      {/* Lista de recetas */}
      <div className={`border-r w-full md:w-1/3 ${isMobile && showDetailMobile ? "hidden" : "block"}`}>
        <SavedRecipesList
          recipes={recipes}
          selectedIndex={selectedIndex}
          onSelect={i => { setSelectedIndex(i); setShowDetailMobile(true); }}
        />
      </div>
      {/* Detalle de receta */}
      <div className={`flex-1 w-full ${isMobile && !showDetailMobile ? "hidden" : "block"}`}>
        <SavedRecipeDetail
          recipe={recipes[selectedIndex]}
          onBack={isMobile ? () => setShowDetailMobile(false) : undefined}
        />
      </div>
    </div>
  );
}
