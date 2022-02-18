import { PantryItem } from "../pages/ItemView";

var PantryItems: PantryItem[] = [
    {
        id: 1,
        name: 'Chicken',
        units: 'Oz',
        quantity: 16
    },
    {
        id: 2,
        name: 'Pasta',
        units: 'Boxes',
        quantity: 4
    },
    {
        id: 3,
        name: 'Chickpeas',
        units: 'Oz',
        quantity: 8
    }
]

export async function GetPantryItems() {
    return PantryItems;
}

export async function GetPantryItem(id: number) {
    return PantryItems.filter(pi => pi.id === id)[0];
}