import React from 'react'
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import { useNavigation } from '@react-navigation/native';
import { PantryItem } from '../pages/ItemView';

type PantryScreenProps = StackNavigationProp<RootStackParamList, 'Pantry'>;

export default function PantryItemView(props: PantryItem) {
    const navigation = useNavigation<PantryScreenProps>();

    return (
        <TouchableHighlight 
            onPress={() => navigation.navigate('ItemView',
                {
                    id: props.id
                }
            )} 
            onLongPress={() => console.log("Long")} 
            underlayColor="white"
        >
            <View style={styles.item}>
                <Text style={styles.title}>{props.name}</Text>
                <View style={styles.subtitle}>
                    <Text>{props.quantity} {props.units}</Text>
                </View>
            </View>
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    item: {
        padding: 15,
        borderBottomWidth: 1
    },
    title: {
        fontSize: 24
    },
    subtitle: {
        flexDirection: "row",
        fontSize: 20
    },
})

