import { StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { ReactElement, useEffect, useState } from 'react'
import { RootStackParamList } from '../../App';
import PantryItem from '../components/PantryItemView';
import { GetPantryItem } from '../data/FakeData';

type ItemViewProps = NativeStackScreenProps<RootStackParamList, 'ItemView'>;

export interface PantryItem {
    id: number,
    name: string,
    units: string,
    quantity: number
}

export default function ItemView({ route, navigation }: ItemViewProps): ReactElement {
    const [loading, setLoading] = useState(false);
    const [item, setItem] = useState<PantryItem>();

    useEffect(() => {
        setLoading(true);
        //fetch("https://localhost:7044/Items/" + route.params.id + "/Pantry")
        //.then(res => res.json())
        GetPantryItem(route.params.id)
        .then(data => {
            setItem(data);
            setLoading(false);
        });
    }, []);

    function displayLine(label: string, value: any) {
        return (
            <div style={styles.itemRow}>
                <em>{label}</em>
                <p>{value}</p>
            </div>
        )
    }

    if (loading) {
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        )
    }

    if (!item) {
        return (
            <div>
                <h1>Item not found.</h1>
            </div>
        )
    }

    return (
        <div>
            <h1>{item.name}</h1>
            {displayLine("Units", item.units)}
            {displayLine("Quantity", item.quantity)}
        </div>
    )
}

const styles = StyleSheet.create({
    itemRow: {
        flexDirection: 'row',
    },

});