import { Item } from "./Item";

/**
 * Data about an item in a pantry
 */
export interface PantryItem extends Item {
    /**
     * The quantity in the pantry
     */
    quantity: number;
    /**
     * Optional expiration date
     */
    expiration: Date | null;
}