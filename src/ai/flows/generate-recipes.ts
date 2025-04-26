// Use server directive is required for Genkit flows.
'use server';

/**
 * @fileOverview Recipe generation flow based on available ingredients.
 *
 * This file defines a Genkit flow that takes a list of ingredients as input
 * and returns a list of recipe suggestions. It includes the input and output
 * schema definitions, the flow definition, and an exported function to call the flow.
 *
 * @remarks
 *  - generateRecipes - A function that handles the recipe generation process.
 *  - GenerateRecipesInput - The input type for the generateRecipes function.
 *  - GenerateRecipesOutput - The return type for the generateRecipes function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

// Define the input schema for the generateRecipes function
const GenerateRecipesInputSchema = z.object({
  ingredients: z
    .string()
    .describe('A comma-separated list of ingredients available in the fridge.'),
  dietaryRestrictions: z
    .string()
    .optional()
    .describe('Optional dietary restrictions or preferences (e.g., vegetarian, gluten-free).'),
});
export type GenerateRecipesInput = z.infer<typeof GenerateRecipesInputSchema>;

// Define the output schema for the generateRecipes function
const GenerateRecipesOutputSchema = z.object({
  recipes: z.array(
    z.object({
      name: z.string().describe('The name of the recipe.'),
      ingredientsRequired: z.array(
        z.string().describe('A list of ingredients required for the recipe.')
      ),
      instructions: z.string().describe('Step-by-step instructions for the recipe.'),
      availableIngredientsUsed: z
        .array(z.string())
        .describe('Ingredients from the input that are used in this recipe.'),
    })).describe('A list of recipe suggestions based on the input ingredients.'),
});
export type GenerateRecipesOutput = z.infer<typeof GenerateRecipesOutputSchema>;

// Exported function to call the generateRecipesFlow
export async function generateRecipes(input: GenerateRecipesInput): Promise<GenerateRecipesOutput> {
  return generateRecipesFlow(input);
}

// Define the prompt for the AI model
const generateRecipesPrompt = ai.definePrompt({
  name: 'generateRecipesPrompt',
  input: {
    schema: z.object({
      ingredients: z
        .string()
        .describe('A comma-separated list of ingredients available in the fridge.'),
      dietaryRestrictions: z
        .string()
        .optional()
        .describe('Optional dietary restrictions or preferences (e.g., vegetarian, gluten-free).'),
    }),
  },
  output: {
    schema: z.object({
      recipes: z.array(
        z.object({
          name: z.string().describe('The name of the recipe.'),
          ingredientsRequired: z.array(
            z.string().describe('A list of ingredients required for the recipe.')
          ),
          instructions: z
          .string()
          .transform((val) => {
            return val
              .split(/(\d+\.) /)
              .map((item, index) =>
                index % 2 === 1 ? `<b>${item}</b>` : item
              )
              .join("") + "<br/>";
          })
            .transform((val) => val.replace(/\n/g, "<br/>"))
            .describe('Step-by-step instructions for the recipe.'),
            availableIngredientsUsed: z
            .array(z.string())
            .describe('Ingredients from the input that are used in this recipe.'),
        })
      )
        .describe(
          'A list of recipe suggestions based on the input ingredients.'
        ),
    }),


  },
  prompt: `You are a recipe suggestion AI. Given the ingredients a user has on hand, suggest recipes they can make.

  Ingredients:
  {{ingredients}}

  {{#if dietaryRestrictions}}
  Dietary Restrictions:
  {{dietaryRestrictions}}
  {{/if}}

  Return a JSON array of recipes that can be made using the available ingredients, highlighting which of the provided ingredients are used in each recipe. Each recipe in the array should have a name, a list of ingredients required, step-by-step instructions, and a list of available ingredients that were used from the input.\n  
  
  Important: For the step-by-step instructions, follow this format precisely:
  <b>1.</b> First step instruction<br/>
  <b>2.</b> Second step instruction<br/>
  <b>3.</b> Third step instruction<br/>
  
  Include any blank lines between steps. This format is essential for proper display.`,
});

// Define the Genkit flow
const generateRecipesFlow = ai.defineFlow<
  typeof GenerateRecipesInputSchema,
  typeof GenerateRecipesOutputSchema
>(
  {
    name: 'generateRecipesFlow',
    inputSchema: GenerateRecipesInputSchema,
    outputSchema: GenerateRecipesOutputSchema,
  },
  async input => {
    const {output} = await generateRecipesPrompt(input);
    return output!;
  }
);
