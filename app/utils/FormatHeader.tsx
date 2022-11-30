import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Colors } from "../constants/Colors";
import { FontSizes } from "../constants/FontSizes";

/**
 * A utility function to format the header for a page.
 * This includes setting the title, adding a menu, and all the styling.
 * @param navigation The navigation object
 * @param title The title of the header
 * @param setMenuShowing Toggle displaying the menu
 */
export function FormatHeader(
    navigation: NativeStackNavigationProp<any, any, any>, 
    title: string, 
    setMenuShowing: (value: React.SetStateAction<boolean>) => void
) {
    navigation.setOptions({
        // Set the header
        headerTitle: title,
        headerRight: () => (
            <View style={{marginRight: 10}}>
                <Icon 
                    name="more-vert" 
                    color={Colors.Black} 
                    size={FontSizes.Header} 
                    onPress={() => {
                        setMenuShowing(prev => !prev);
                    }} />
            </View>
        ),
        // Set the style
        headerTintColor: Colors.Black,
        headerStyle: {
            backgroundColor: Colors.Primary
        },
        headerTitleStyle: {
            fontSize: FontSizes.Header
        }
    })
}