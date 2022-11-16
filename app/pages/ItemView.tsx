import { StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { ReactElement, useEffect, useState } from 'react'
import { RootStackParamList } from '../../App';
import { PantryItem } from '../dto/PantryItem';
import { GetPantryItem } from '../data/FakeData';
import PageLayout from '../layouts/PageLayout';

type ItemViewProps = NativeStackScreenProps<RootStackParamList, 'ItemView'>;

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
            <View style={styles.itemRow}>
                <Text>{label}</Text>
                <Text>{value}</Text>
            </View>
        )
    }

    if (loading) {
        return (
            <PageLayout>
                <Text>Loading...</Text>
            </PageLayout>
        )
    }

    if (!item) {
        return (
            <PageLayout>
                <Text>Item not found.</Text>
            </PageLayout>
        )
    }

    return (
        <PageLayout>
            <Text>{item.name}</Text>
            {displayLine("Units", item.units)}
            {displayLine("Quantity", item.quantity)}
        </PageLayout>
    )
}

const styles = StyleSheet.create({
    itemRow: {
        flexDirection: 'row',
    },

});