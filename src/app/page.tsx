'use client';

import {Switch} from '@/components/ui/switch';
import {TEXTS} from '@/constants';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from '@/components/ui/card';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {Separator} from '@/components/ui/separator';
import {generateRecipes, GenerateRecipesOutput} from '@/ai/flows/generate-recipes';
import {useForm} from 'react-hook-form';
import {useLocalStorage} from 'usehooks-ts';

import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import {useToast} from '@/hooks/use-toast';
import {useEffect, useState} from 'react';
import {Icons} from '@/components/icons';
import {cn} from '@/lib/utils';
import React from 'react';
import { LanguageTexts } from '../../types';


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
  const [lang, setLang] = useLocalStorage<'en' | 'es'>('lang', 'en');
  const texts: LanguageTexts = TEXTS[lang];

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
        <div className='flex flex-col gap-8'>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">{lang === 'en' ? 'English' : 'Español'}</span>
            <Switch
              id="airplane-mode"
              checked={lang === 'es'}
              onCheckedChange={() => setLang(lang === 'en' ? 'es' : 'en')}
            />
          </div>
          <div className="relative flex flex-col items-center mb-8">   
              <img className='w-28 h-28' src='/logo.png' alt='PocketChef Logo'/>
              <h1 className="absolute bottom-2 text-3xl text-center font-bold text-foreground mb-2">{texts.fridgeChef}</h1>
          </div>
        </div>
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>{texts.ingredients}</CardTitle>
            <CardDescription className="text-muted-foreground">
                {texts.enterIngredients}
              </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name='ingredients'
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>
                        {texts.ingredients}
                      </FormLabel>
                      <FormControl>
                        <Input placeholder={texts.ingredientsPlaceholder} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='dietaryRestrictions'
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>{texts.dietaryRestrictions}</FormLabel>
                      <FormControl>
                        <Input placeholder={texts.dietaryRestrictionsPlaceholder} {...field} />

                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className='flex justify-between'>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
                    {texts.generateRecipes}
                  </Button>
                  {recipes && (
                    <div className="flex justify-end mb-4">
                      <Button variant='destructive' onClick={() => setRecipes(null)}>
                        <Icons.trash className="mr-2 h-4 w-4" />
                        {texts.clearRecipes}
                      </Button>
                    </div>
                  )}
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        {recipes?.recipes && recipes.recipes.length > 0 ? (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">{texts.generatedRecipes}</h2>
            <Separator />
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {recipes.recipes.map((recipe, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle>{recipe.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <ul>
                      {recipe.ingredientsRequired.map((ingredient, i) => (
                        <li key={i} className="text-sm">
                          {recipe.availableIngredientsUsed.includes(ingredient) ? (
                            <span className="font-medium text-primary">{ingredient}</span>
                          ) : (
                            <span>{ingredient}</span>
                          )}
                        </li>
                      ))}
                    </ul>
                  <div className="mt-2 h-40 text-sm overflow-auto" dangerouslySetInnerHTML={{
                    __html: recipe.instructions
                  }} />

                  </CardContent>
                  <CardFooter>
                    <p className="text-xs text-muted-foreground">{texts.enjoyYourMeal}</p>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          recipes?.recipes && (
            <Card>
              <CardContent>{texts.noRecipesFound}</CardContent>
            </Card>
          )
        )}
      </div>
    </div>
  );
}
