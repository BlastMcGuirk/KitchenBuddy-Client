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

    const formattedDate = props.expiration?.getMonth() + "/" + props.expiration?.getFullYear()

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
                            `Exp: ${formattedDate}` :
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

