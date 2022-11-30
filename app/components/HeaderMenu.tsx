import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '../constants/Colors';
import { FontSizes } from '../constants/FontSizes';

/**
 * A menu option
 */
interface MenuOption {
    // The text to display
    name: string;
    // The action to take
    onPress: () => void;
}

/**
 * Props for the Header Menu
 */
export interface HeaderMenuProps {
    /**
     * Whether or not the menu is visible
     */
    showing: boolean;
    /**
     * The menu options
     */
    options: MenuOption[];
}

/**
 * Renders the header menu, or nothing if it is not visible
 * @param props HeaderMenuProps
 * @returns The header menu
 */
export function HeaderMenu(props: HeaderMenuProps) {
    // Render nothing if it shouldn't be showing
    if (!props.showing) return (<></>);

    return (
        <View style={styles.headerMenu}>
            {props.options.map(option => {
                return (
                    <Text 
                        key={option.name}
                        style={styles.headerOption} 
                        onPress={option.onPress}
                    >
                        {option.name}
                    </Text>
                )
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    headerMenu: {
        position: 'absolute',
        right: 5,
        top: -5,
        zIndex: 1,
        borderWidth: 1,
        borderTopWidth: 0,
        display: 'flex',
        backgroundColor: Colors.White
    },
    headerOption: {
        borderTopWidth: 1,
        padding: 5,
        paddingHorizontal: 20,
        paddingVertical: 12,
        fontSize: FontSizes.Menu
    }
});
