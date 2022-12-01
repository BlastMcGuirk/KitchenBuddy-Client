import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Platform, StatusBar, StyleSheet } from 'react-native';
import { ItemDetailsPage } from './app/pages/ItemDetailsPage';
import { Home } from './app/pages/Home';
import { RecipeDetailsPage } from './app/pages/RecipeDetailsPage';
import { Colors } from './app/constants/Colors';
import { OverflowMenuProvider } from 'react-navigation-header-buttons';

const Stack = createNativeStackNavigator();

export type RootStackParamList = {
  PantryPage: undefined,
  RecipesPage: undefined,
  ShoppingListPage: undefined,
  ItemDetailsPage: {id: number},
  RecipeDetailsPage: {id: number},
  PantryListItem: undefined,
  RecipeListItem: undefined,
  ShoppingListListItem: undefined,
}

export default function App() {
  return (
    <NavigationContainer>
      <OverflowMenuProvider>
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
            name="ItemDetailsPage" 
            component={ItemDetailsPage}
            options={{
              headerShown: true,
              title: ''
            }}
          />
          <Stack.Screen
            name="RecipeDetailsPage"
            component={RecipeDetailsPage}
            options={{
              headerShown: true,
              title: ''
            }}
          />
        </Stack.Navigator>
      </OverflowMenuProvider>
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
