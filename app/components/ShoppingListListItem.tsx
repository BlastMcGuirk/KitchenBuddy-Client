import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import CheckBox from 'expo-checkbox';
import { FontSizes } from '../constants/FontSizes';
import { Spacings } from '../constants/Spacings';
import { ShoppingItem } from '../dto/ShoppingItem';

/**
 * A view that displays a line in the shopping list
 * @param props Props for the view
 * @returns The view
 */
export function ShoppingListListItem(props: ShoppingItem) {
    // Whether or not the shopping list item is checked
    const [checked, setChecked] = useState(false);

    return (
        <View style={styles.item}>
            <CheckBox 
                value={checked}
                onValueChange={setChecked} />
            <Text style={styles.name}>{props.name}</Text>
            <Text style={styles.quantity}>{props.quantity}</Text>
            <Text style={styles.units}>{props.units}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        margin: Spacings.Narrow,
        marginBottom: 0,
        flexDirection: 'row',
        alignItems: 'center'
    },
    name: {
        fontSize: FontSizes.ShoppingItem,
        marginLeft: Spacings.Narrow,
        flex: .55,
    },
    quantity: {
        fontSize: FontSizes.ShoppingItem,
        flex: .2
    },
    units: {
        fontSize: FontSizes.ShoppingItem,
        flex: .25,
    },
})
