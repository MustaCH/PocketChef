'use client';

import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from '@/components/ui/card';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Separator} from '@/components/ui/separator';
import {Textarea} from '@/components/ui/textarea';
import {generateRecipes, GenerateRecipesOutput} from '@/ai/flows/generate-recipes';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import {useToast} from '@/hooks/use-toast';
import {useEffect, useState} from 'react';
import {Icons} from '@/components/icons';
import {cn} from '@/lib/utils';

const formSchema = z.object({
  ingredients: z
    .string()
    .min(2, {
      message: 'Ingredients must be at least 2 characters.',
    })
    .describe('A comma-separated list of ingredients available in the fridge.'),
  dietaryRestrictions: z.string().optional().describe('Optional dietary restrictions.'),
});

export default function Home() {
  const [recipes, setRecipes] = useState<GenerateRecipesOutput | null>(null);
  const {toast} = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ingredients: '',
      dietaryRestrictions: '',
    },
  });

  useEffect(() => {
    if (isLoading) {
      toast({
        title: 'Generating Recipes...',
        description: 'Please wait while we generate recipes based on your ingredients.',
        duration: 5000,
      });
    }
  }, [isLoading, toast]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
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
  }

  return (
    <div className="flex flex-col min-h-screen bg-secondary py-6 md:py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-8">
          <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-2">Fridge Chef</h1>
          <p className="text-muted-foreground">
            Enter the ingredients you have and we&apos;ll generate delicious recipes for you!
          </p>
        </div>
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Ingredients</CardTitle>
            <CardDescription>Enter your ingredients and dietary restrictions.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="ingredients"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Ingredients</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., chicken, rice, broccoli" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dietaryRestrictions"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Dietary Restrictions (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., vegetarian, gluten-free" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isLoading}>
                  {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
                  Generate Recipes
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {recipes?.recipes && recipes.recipes.length > 0 ? (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">Generated Recipes</h2>
            <Separator />
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {recipes.recipes.map((recipe, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle>{recipe.name}</CardTitle>
                    <CardDescription>
                      Ingredients required (available ingredients highlighted)
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <ul>
                      {recipe.ingredientsRequired.map((ingredient, i) => (
                        <li key={i} className="text-sm">
                          {recipe.availableIngredientsUsed.includes(ingredient) ? (
                            <span className="font-medium text-primary">{ingredient} (available)</span>
                          ) : (
                            <span>{ingredient}</span>
                          )}
                        </li>
                      ))}
                    </ul>
                    <Textarea
                      readOnly
                      className="mt-2 h-40 text-sm"
                      value={recipe.instructions}
                    />
                  </CardContent>
                  <CardFooter>
                    <p className="text-xs text-muted-foreground">Enjoy your meal!</p>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          recipes?.recipes && (
            <Card>
              <CardContent>No recipes found for the given ingredients.</CardContent>
            </Card>
          )
        )}
      </div>
    </div>
  );
}
