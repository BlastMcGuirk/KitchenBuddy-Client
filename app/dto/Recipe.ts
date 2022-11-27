import { RecipeIngredient } from "./RecipeIngredient";

/**
 * A recipe
 */
export interface Recipe {
    /**
     * The id of the recipe
     */
    recipeId: number;
    /**
     * The name of the recipe
     */
    name: string;
    /**
     * The description of the recipe
     */
    description: string;
    /**
     * The prep time for the recipe
     */
    prepTime: number;
    /**
     * The cook time for the recipe
     */
    cookTime: number;
    /**
     * The ingredients of the recipe
     */
    ingredients?: RecipeIngredient[];
    /**
     * The instructions for the recipe
     */
    instructions: string;
}