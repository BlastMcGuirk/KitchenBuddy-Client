import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { HeaderButtons, HeaderButton, Item, HiddenItem, OverflowMenu } from "react-navigation-header-buttons";
import { Colors } from "../constants/Colors";
import { FontSizes } from "../constants/FontSizes";

/**
 * A menu option
 */
export interface MenuOption {
    // The text to display
    name: string;
    // The action to take
    onPress: () => void;
    // The icon name if it should be visible
    iconName?: string;
}

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
    options?: MenuOption[]
) {
    // Get the shown buttons (icon name specified)
    let shownButtons = options?.filter(option => option.iconName);
    // Get the overflow buttons (no icon name specified)
    let overflowButtons = options?.filter(option => !option.iconName);

    // Set the header
    navigation.setOptions({
        // Set the header
        headerTitle: title,
        headerRight: () => (
            <HeaderButtons 
                HeaderButtonComponent={(props) => 
                    <HeaderButton IconComponent={Icon} iconSize={FontSizes.Header} {...props}/>
                }
            >
                {/* Display the shown buttons */}
                {shownButtons?.map(button => {
                    return <Item 
                        key={button.name} 
                        title={button.name} 
                        iconName={button.iconName} 
                        onPress={button.onPress} />
                })}

                {/* Display the overflow menu */}
                {overflowButtons && overflowButtons.length > 0 && <OverflowMenu 
                    style={{ marginHorizontal: 10 }} 
                    OverflowIcon={() => <Icon name="more-vert" size={FontSizes.Header} color={Colors.Black}/>}
                >
                    {/* Display the hidden items */}
                    {overflowButtons.map(button => {
                        return <HiddenItem key={button.name} title={button.name} onPress={button.onPress} />
                    })}
                </OverflowMenu>}
            </HeaderButtons>
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