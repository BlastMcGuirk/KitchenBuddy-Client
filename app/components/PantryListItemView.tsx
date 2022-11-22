import React from 'react'
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import { useNavigation } from '@react-navigation/native';
import { PantryItem } from '../dto/PantryItem';
import { FontSizes } from '../constants/FontSizes';
import { Paddings } from '../constants/Spacings';
import { Colors } from '../constants/Colors';
import { MonthYear } from '../utils/DateFormatter';

// Get props from the stack nav props
type PantryItemViewProps = StackNavigationProp<RootStackParamList, 'PantryItemView'>;

/**
 * A view that displays a line in the pantry list
 * @param props Props for the view
 * @returns The Pantry Item view
 */
export default function PantryListItemView(props: PantryItem) {
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
                    <Text style={styles.qtySpacing}>Qty: {props.quantity}</Text>
                    <Text style={styles.unitsSpacing}>Units: {props.units}</Text>
                    <Text style={styles.expSpacing}>
                        {props.expiration ? 
                            `Exp: ${MonthYear(props.expiration)}` :
                            null}
                    </Text>
                </View>
            </View>
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    item: {
        padding: Paddings.Standard,
        borderBottomColor: Colors.Gray,
        borderBottomWidth: 1,
    },
    label: {
        fontSize: FontSizes.Label,
    },
    sublabel: {
        flexDirection: "row",
    },
    qtySpacing: {
        flex: .25,
        fontSize: FontSizes.Sublabel
    },
    unitsSpacing: {
        flex: .45,
        fontSize: FontSizes.Sublabel
    },
    expSpacing: {
        flex: .3,
        textAlign: 'right',
        fontSize: FontSizes.Sublabel
    }
})

