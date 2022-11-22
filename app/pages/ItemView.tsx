import { StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { ReactElement, useEffect, useState } from 'react'
import { RootStackParamList } from '../../App';
import { PantryItem } from '../dto/PantryItem';
import { GetPantryItem } from '../data/FakeData';
import PageLayout from '../layouts/PageLayout';
import { FontSizes } from '../constants/FontSizes';
import { Paddings } from '../constants/Spacings';
import { MonthYear } from '../utils/DateFormatter';

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
            <View style={styles.container}>
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.sublabel}>{item.quantity} {item.units}</Text>
                {item.expiration && 
                    <Text style={styles.sublabel}>Exp {MonthYear(item.expiration)}</Text>
                }
            </View>
        </PageLayout>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: Paddings.Wide,
    },
    title: {
        fontSize: FontSizes.Header,
        paddingBottom: Paddings.Narrow
    },
    sublabel: {
        fontSize: FontSizes.Sublabel
    }
});