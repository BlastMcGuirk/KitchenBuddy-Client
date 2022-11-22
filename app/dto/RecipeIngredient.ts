import { Item } from './Item'

/**
 * An ingredient in a recipe, which is an item
 */
export interface RecipeIngredient extends Item {
    /**
     * The quantity of the item
     */
    quantity: number
}