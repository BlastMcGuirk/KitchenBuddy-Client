import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Platform, StatusBar, StyleSheet } from 'react-native';
import ItemView from './app/pages/ItemView';
import { Colors } from './app/constants/Colors';
import { Home } from './app/pages/Home';
import RecipeView from './app/pages/RecipeView';

const Stack = createNativeStackNavigator();

export type RootStackParamList = {
  PantryView: {},
  RecipesView: {},
  ShoppingView: {},
  PantryItemView: {},
  RecipeListItemView: {},
  ShoppingListItemView: {},
  ItemView: {id: number},
  RecipeView: {id: number}
}

export default function App() {
  return (
    <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: Colors.Primary
            },
            headerTintColor: Colors.White,
            contentStyle: { backgroundColor: Colors.Background }
          }}
        >
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen 
            name="ItemView" 
            component={ItemView}
            options={{
              headerShown: true,
              title: ''
            }}
          />
          <Stack.Screen
            name="RecipeView"
            component={RecipeView}
            options={{
              headerShown: true,
              title: ''
            }}
          />
        </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    paddingBottom: 30
  },
});
