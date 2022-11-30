import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '../constants/Colors';
import { FontSizes } from '../constants/FontSizes';

export interface HeaderMenuProps {
    showing: boolean;
    options: {name: string; onPress: () => void}[];
}

export function HeaderMenu(props: HeaderMenuProps) {
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
