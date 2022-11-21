import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import CheckBox from 'expo-checkbox';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import { useNavigation } from '@react-navigation/native';
import { FontSizes } from '../constants/FontSizes';
import { Paddings } from '../constants/Spacings';
import { ShoppingItem } from '../dto/ShoppingItem';

type ShoppingListViewProps = StackNavigationProp<RootStackParamList, 'ShoppingListItemView'>;

export default function ShoppingListItemView(props: ShoppingItem) {
    const navigation = useNavigation<ShoppingListViewProps>();
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
        margin: Paddings.Narrow,
        marginBottom: 0,
        flexDirection: 'row',
        alignItems: 'center'
    },
    name: {
        fontSize: FontSizes.ShoppingItem,
        marginLeft: Paddings.Narrow,
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
