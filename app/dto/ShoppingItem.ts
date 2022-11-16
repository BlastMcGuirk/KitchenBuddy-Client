import { Item } from "./Item";

export interface ShoppingItem extends Item {
    quantity: number;
    isChecked: boolean;
}