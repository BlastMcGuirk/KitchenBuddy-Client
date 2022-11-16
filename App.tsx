import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, Platform, StatusBar, StyleSheet } from 'react-native';
import PantryView from './app/pages/PantryView';
import ItemView from './app/pages/ItemView';
import { Colors } from './app/constants/Colors';

const Stack = createNativeStackNavigator();

export type RootStackParamList = {
  PantryView: {},
  RecipesView: {},
  ShoppingView: {},
  PantryItemView: undefined,
  RecipeListItemView: undefined,
  ShoppingListItemView: undefined,
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
          }}
        >
          <Stack.Screen
            name="Pantry"
            component={PantryView}
            options={({navigation, route}) => ({
              headerTitle: 'Kitchen Buddy',
              headerRight: () => (
                <Button onPress={() => {}} title='Add' />
              )
            })}
          />
          <Stack.Screen 
            name="ItemView" 
            component={ItemView}
            options={{
              headerShown: false
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
