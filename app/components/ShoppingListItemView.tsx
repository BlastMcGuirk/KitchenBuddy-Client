import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native'
import CheckBox from 'expo-checkbox';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import { useNavigation } from '@react-navigation/native';
import { FontSizes } from '../constants/FontSizes';
import { Paddings } from '../constants/Spacings';
import { Colors } from '../constants/Colors';
import { ShoppingItem } from '../dto/ShoppingItem';

type ShoppingListViewProps = StackNavigationProp<RootStackParamList, 'ShoppingListItemView'>;

export default function ShoppingListItemView(props: ShoppingItem) {
    const navigation = useNavigation<ShoppingListViewProps>();
    const [checked, setChecked] = useState(false);

    return (
        <TouchableHighlight 
            onPress={() => navigation.navigate('ItemView',
                {
                    id: props.id
                }
            )} 
            onLongPress={() => console.log("Long")} 
            underlayColor={Colors.OffWhite}
        >
            <View style={styles.item}>
                <CheckBox 
                    disabled={false}
                    value={checked}
                    onValueChange={setChecked} />
                <Text style={styles.label}>{props.name}</Text>
            </View>
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    item: {
        padding: Paddings.Standard,
        borderBottomWidth: 1
    },
    label: {
        fontSize: FontSizes.Label
    },
    sublabel: {
        flexDirection: "row",
        fontSize: FontSizes.Sublabel
    },
})

