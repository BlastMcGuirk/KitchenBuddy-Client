import { Item } from "./Item";

/**
 * Data about an item in the shopping list
 */
export interface ShoppingItem extends Item {
    /**
     * The quantity of the item in the shopping list
     */
    quantity: number;
    /**
     * Whether or not the item is checked
     */
    isChecked: boolean;
}