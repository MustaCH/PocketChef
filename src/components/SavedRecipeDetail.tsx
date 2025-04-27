import { Icons } from "@/components/icons";

interface SavedRecipeDetailProps {
  recipe: any;
  onBack?: () => void;
}

export default function SavedRecipeDetail({ recipe, onBack }: SavedRecipeDetailProps) {
  if (!recipe) return <div className="p-4">Selecciona una receta</div>;
  return (
    <div>
      {onBack && (
        <button onClick={onBack} className="m-4 flex items-center gap-1">
          <Icons.arrowLeft />
          Volver
        </button>
      )}
      <div className="p-4">
          <h2 className="text-xl font-bold mb-2">{recipe.name}</h2>
          <div className="mb-2">
            <strong>Ingredientes requeridos:</strong>
            <ul className="list-disc ml-6">
              {recipe.ingredientsRequired?.map((ing: string, idx: number) => (
                <li key={idx}>{ing}</li>
              ))}
            </ul>
          </div>
          <div className="mb-2">
            <strong>Ingredientes usados:</strong>
            <ul className="list-disc ml-6">
              {recipe.availableIngredientsUsed?.map((ing: string, idx: number) => (
                <li key={idx}>{ing}</li>
              ))}
            </ul>
          </div>
          <div className="mb-2">
            <strong>Instrucciones:</strong>
            <div dangerouslySetInnerHTML={{ __html: recipe.instructions }} />
          </div>
          </div>
    </div>
  );
}
