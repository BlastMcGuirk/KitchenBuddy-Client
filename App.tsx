import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Platform, StatusBar, StyleSheet } from 'react-native';
import PantryView from './app/pages/PantryView';
import ItemView from './app/pages/ItemView';

const Stack = createNativeStackNavigator();

export type RootStackParamList = {
  Pantry: undefined
  ItemView: {id: number}
}

export default function App() {
  return (
    <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Pantry"
            component={PantryView}
            options={{
              headerShown: false
            }}
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
