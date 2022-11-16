import React from 'react'
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import { useNavigation } from '@react-navigation/native';
import { PantryItem } from '../dto/PantryItem';
import { FontSizes } from '../constants/FontSizes';
import { Paddings } from '../constants/Spacings';
import { Colors } from '../constants/Colors';

type PantryItemViewProps = StackNavigationProp<RootStackParamList, 'PantryItemView'>;

export default function PantryItemView(props: PantryItem) {
    const navigation = useNavigation<PantryItemViewProps>();

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
                <Text style={styles.label}>{props.name}</Text>
                <View style={styles.sublabel}>
                    <Text>{props.quantity} {props.units}</Text>
                </View>
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

