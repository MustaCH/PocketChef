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
          className={`p-4 cursor-pointer border-2 border-green-700 font-semibold rounded-lg hover:bg-green-200 dark:hover:bg-green-700 m-4 duration-150 ${selectedIndex === i ? "p-4 bg-green-200 dark:bg-green-700 font-bold m-2 border-2 border-green-700  rounded-lg" : ""}`}
          onClick={() => onSelect(i)}
        >
          {r.name}
        </li>
      ))}
    </ul>
  );
}
