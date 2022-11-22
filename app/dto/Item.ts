/**
 * Any item that can be used in the app (pantry, shopping, recipe ingredient, etc.)
 */
export interface Item {
    /**
     * The id of the item
     */
    id: number;
    /**
     * The name of the item
     */
    name: string;
    /**
     * The item units
     */
    units: string;
}