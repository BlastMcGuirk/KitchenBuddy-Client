import { Item } from "../dto/Item";
import { PantryItem } from "../dto/PantryItem";
import { Recipe } from "../dto/Recipe";
import { ShoppingItem } from "../dto/ShoppingItem";

var Items: Item[] = [
    {
        id: 1,
        name: 'Chicken',
        units: 'Oz',
    },
    {
        id: 2,
        name: 'Pasta',
        units: 'Boxes'
    },
    {
        id: 3,
        name: 'Chickpeas',
        units: 'Oz',
    }
]

var PantryItems: PantryItem[] = [
    {
        ...Items[0],
        quantity: 16,
        expiration: new Date()
    },
    {
        ...Items[1],
        quantity: 4
    },
    {
        ...Items[2],
        quantity: 8
    }
]

var Recipes: Recipe[] = [
    {
        recipeId: 1,
        name: 'Chicken Pasta'
    },
    {
        recipeId: 2,
        name: 'Chickpea Pasta'
    }
]

var ShoppingItems: ShoppingItem[] = [
    {
        ...Items[1],
        quantity: 2,
        isChecked: true
    },
    {
        ...Items[2],
        quantity: 1,
        isChecked: false
    }
]

export async function GetPantryItems() {
    return PantryItems;
}

export async function GetPantryItem(id: number) {
    return PantryItems.filter(pi => pi.id === id)[0];
}

export async function GetRecipes() {
    return Recipes;
}

export async function GetRecipe(id: number) {
    return Recipes.filter(r => r.recipeId === id)[0];
}

export async function GetShoppingItems() {
    return ShoppingItems;
}

export async function GetShoppingItem(id: number) {
    return ShoppingItems.filter(si => si.id === id)[0];
}