import React from 'react'
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import { useNavigation } from '@react-navigation/native';
import { PantryItem } from '../dto/PantryItem';
import { FontSizes } from '../constants/FontSizes';
import { Spacings } from '../constants/Spacings';
import { Colors } from '../constants/Colors';
import { MonthYear } from '../utils/DateFormatter';

// Get props from the stack nav props
type PantryListItemProps = StackNavigationProp<RootStackParamList, 'PantryListItem'>;

/**
 * A component that displays a line in the pantry list
 * @param props Props for the component
 * @returns The Pantry List Item component
 */
export function PantryListItem(props: PantryItem) {
    const navigation = useNavigation<PantryListItemProps>();

    return (
        <TouchableHighlight 
            onPress={() => navigation.navigate('ItemDetailsPage',
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
        padding: Spacings.Standard,
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

