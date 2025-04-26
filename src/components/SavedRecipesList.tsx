interface SavedRecipesListProps {
  recipes: any[];
  selectedIndex: number;
  onSelect: (i: number) => void;
}

export default function SavedRecipesList({ recipes, selectedIndex, onSelect }: SavedRecipesListProps) {
  return (
    <ul className="py-2">
      {recipes.map((r, i) => (
        <li
          key={r.id}
          className={`p-4 cursor-pointer border-2 rounded-lg hover:bg-green-200 m-4 duration-150 ${selectedIndex === i ? "p-4 bg-green-200 font-bold m-2 border-2 border-green-700  rounded-lg" : ""}`}
          onClick={() => onSelect(i)}
        >
          {r.name}
        </li>
      ))}
    </ul>
  );
}
