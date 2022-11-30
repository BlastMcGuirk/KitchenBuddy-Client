import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { PantryPage } from "./PantryPage";
import { RecipesPage } from './RecipesPage';
import { ShoppingListPage } from './ShoppingListPage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors } from '../constants/Colors';

// Create the bottom tab navigator
const Tab = createBottomTabNavigator();

export function Home() {
    return (
        <Tab.Navigator initialRouteName='PantryPage' screenOptions={{
            tabBarActiveTintColor: Colors.Black,
            tabBarInactiveTintColor: Colors.Inactive,
            tabBarStyle: {
                backgroundColor: Colors.Primary,
            }
        }}>
            <Tab.Screen name="RecipesPage" component={RecipesPage} options={{
                tabBarIcon: (props) => {
                    return <Icon name='book' size={props.size} color={props.color}/>
                },
                tabBarLabel: 'Recipes'
            }} />
            <Tab.Screen name="PantryPage" component={PantryPage} options={{
                tabBarIcon: (props) => {
                    return <CommunityIcon name='fridge' size={props.size} color={props.color}/>
                },
                tabBarLabel: 'Pantry'
            }} />
            <Tab.Screen name="ShoppingListPage" component={ShoppingListPage} options={{
                tabBarIcon: (props) => {
                    return <Icon name='shopping-basket' size={props.size} color={props.color}/>
                },
                tabBarLabel: 'Shopping List'
            }} />
        </Tab.Navigator>
    )
}