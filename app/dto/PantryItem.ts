import { Item } from "./Item";

export interface PantryItem extends Item {
    quantity: number;
    expiration?: Date;
}