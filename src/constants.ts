import { LanguageTexts } from "../types";

interface Texts { [key: string]: LanguageTexts };
export const TEXTS: Texts = {
  en: {
    fridgeChef: "PocketChef",
    enterIngredients:
      "Enter the ingredients you have and we'll generate delicious recipes for you!",
    ingredients: "Ingredients",
    dietaryRestrictions: "Dietary Restrictions (Optional)",
    generateRecipes: "Generate Recipes",
    generatedRecipes: "Generated Recipes",
    clearRecipes: "Clear Recipes",
    availableIngredientsHighlighted:
      "Ingredients required (available ingredients highlighted)",
    enjoyYourMeal: "Enjoy your meal!",
    noRecipesFound: "No recipes found for the given ingredients.",
    generatingRecipes: "Generating Recipes...",
    pleaseWait:
      "Please wait while we generate recipes based on your ingredients.",
    recipesGenerated: "Recipes Generated!",
    successfullyGenerated:
      "Successfully generated recipes based on your ingredients.",
    error: "Error",
    failedToGenerate: "Failed to generate recipes. Please try again.",
    ingredientsPlaceholder: "e.g., chicken, rice, broccoli",
    dietaryRestrictionsPlaceholder: "e.g., vegetarian, gluten-free",
  },
  es: {
    fridgeChef: "PocketChef",
    enterIngredients:
      "ingresa los ingredientes que tienes y nosotros generaremos recetas deliciosas para ti!",
    ingredients: "Ingredientes",
    dietaryRestrictions: "Restricciones dietarias (Opcional)",
    generateRecipes: "Generar recetas",
    generatedRecipes: "¡Bon apetit!",
    clearRecipes: "Borrar recetas",
    availableIngredientsHighlighted:
      "Ingredientes requeridos (ingredientes disponibles destacados)",
    enjoyYourMeal: "Disfruta tu comida!",
    noRecipesFound: "No se encontraron recetas para éstos ingredientes.",
    generatingRecipes: "Generando Recetas...",
    pleaseWait:
      "Un minuto estamos cocinando :winking_face:",
    recipesGenerated: "Recetas listas!",
    successfullyGenerated:
      "¡Bon Apetit!.",
    error: "Error",
    failedToGenerate: "Error al generar las recetas, intentalo de nuevo",
    ingredientsPlaceholder: "e., pollo, arroz, brocoli",
    dietaryRestrictionsPlaceholder: "e., vegano, libre de gluten",
  },
};