import { StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { ReactElement, useEffect, useState } from 'react'
import { RootStackParamList } from '../../App';
import { PantryItem } from '../dto/PantryItem';
import PageLayout from '../layouts/PageLayout';
import { FontSizes } from '../constants/FontSizes';
import { Paddings } from '../constants/Spacings';
import { MonthYear } from '../utils/DateFormatter';
import { Loading } from '../components/LoadingView';
import { NotFound } from '../components/NotFoundView';
import { GET } from '../utils/HTTPRequests';

// Get props from the stack nav props
type ItemViewProps = NativeStackScreenProps<RootStackParamList, 'ItemView'>;

/**
 * A view that displays all the data about an item
 * @param props Props for the view
 * @returns The view
 */
export default function ItemView({ route, navigation }: ItemViewProps): ReactElement {
    // Whether or not the data is loading
    const [loading, setLoading] = useState(false);
    // The item data
    const [item, setItem] = useState<PantryItem>();

    // Fetch the data
    useEffect(() => {
        GET('/Items/' + route.params.id + '/Pantry', setLoading, setItem);
    }, []);

    if (loading) return <Loading />
    if (!item) return <NotFound />

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