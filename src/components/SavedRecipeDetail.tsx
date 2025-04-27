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
          <svg xmlns="http://www.w3.org/2000/svg"   viewBox="0 0 24 24" fill="none" stroke="currentColor"  strokeLinecap="round" strokeLinejoin="round" width={24} height={24}  strokeWidth={2}> <path d="M15 6l-6 6l6 6"></path> </svg>
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
