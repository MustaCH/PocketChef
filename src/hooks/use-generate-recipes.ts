import { useState } from 'react';
import { generateRecipes, GenerateRecipesOutput } from '@/ai/flows/generate-recipes';
import { useToast } from '@/hooks/use-toast';

export function useGenerateRecipes() {
  const [isLoading, setIsLoading] = useState(false);
  const [recipes, setRecipes] = useState<GenerateRecipesOutput | null>(null);
  const { toast } = useToast();

  const handleGenerateRecipes = async (values: any) => {
    setIsLoading(true);
    try {
      const generatedRecipes = await generateRecipes(values);
      setRecipes(generatedRecipes);
      toast({
        title: 'Recipes Generated!',
        description: 'Successfully generated recipes based on your ingredients.',
      });
    } catch (error: any) {
      console.error('Error generating recipes:', error);
      toast({
        title: 'Error',
        description: error?.message || 'Failed to generate recipes. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    recipes,
    setRecipes,
    handleGenerateRecipes,
  };
}
