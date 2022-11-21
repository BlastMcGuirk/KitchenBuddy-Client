import { RecipeIngredient } from "./RecipeIngredient";

export interface Recipe {
    recipeId: number;
    name: string;
    prepTime: number;
    cookTime: number;
    ingredients: RecipeIngredient[];
}