import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PantryView from "./PantryView";
import RecipesView from './RecipesView';
import ShoppingView from './ShoppingView';

const Tab = createBottomTabNavigator();

export function Home() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Pantry" component={PantryView} />
            <Tab.Screen name="Recipes" component={RecipesView} />
            <Tab.Screen name="Shopping" component={ShoppingView} />
        </Tab.Navigator>
    )
}