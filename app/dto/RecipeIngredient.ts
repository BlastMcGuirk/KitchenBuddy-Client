import { Item } from './Item'

export interface RecipeIngredient extends Item {
    quantity: number
}