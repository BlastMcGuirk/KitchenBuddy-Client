import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PantryView from "./PantryView";
import RecipesView from './RecipesView';
import ShoppingView from './ShoppingView';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors } from '../constants/Colors';

// Create the bottom tab navigator
const Tab = createBottomTabNavigator();

export function Home() {
    return (
        <Tab.Navigator initialRouteName='Pantry' screenOptions={{
            tabBarActiveTintColor: Colors.Black,
            tabBarInactiveTintColor: Colors.Inactive,
            tabBarStyle: {
                backgroundColor: Colors.Primary,
            }
        }}>
            <Tab.Screen name="Recipes" component={RecipesView} options={{
                tabBarIcon: (props) => {
                    return <Icon name='book' size={props.size} color={props.color}/>
                }
            }} />
            <Tab.Screen name="Pantry" component={PantryView} options={{
                tabBarIcon: (props) => {
                    return <CommunityIcon name='fridge' size={props.size} color={props.color}/>
                }
            }} />
            <Tab.Screen name="Shopping" component={ShoppingView} options={{
                tabBarIcon: (props) => {
                    return <Icon name='shopping-basket' size={props.size} color={props.color}/>
                }
            }} />
        </Tab.Navigator>
    )
}