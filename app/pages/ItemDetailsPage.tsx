import { StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { ReactElement, useEffect, useState } from 'react'
import { RootStackParamList } from '../../App';
import { PantryItem } from '../dto/PantryItem';
import { PageLayout } from '../layouts/PageLayout';
import { FontSizes } from '../constants/FontSizes';
import { Spacings } from '../constants/Spacings';
import { MonthYear } from '../utils/DateFormatter';
import { Loading } from '../components/Loading';
import { NotFound } from '../components/NotFound';
import { GET } from '../utils/HTTPRequests';
import { CommonStyles } from '../styles/CommonStyles';

// Get props from the stack nav props
type ItemDetailsPageProps = NativeStackScreenProps<RootStackParamList, 'ItemDetailsPage'>;

/**
 * A page that displays all the data about an item
 * @param props Props for the page
 * @returns The page
 */
export function ItemDetailsPage(props: ItemDetailsPageProps): ReactElement {
    // Whether or not the data is loading
    const [loading, setLoading] = useState(false);
    // The item data
    const [item, setItem] = useState<PantryItem>();

    // Fetch the data
    useEffect(() => {
        GET('/Items/Pantry/' + props.route.params.id, setLoading, setItem);
    }, []);

    if (loading) return <Loading />
    if (!item) return <NotFound />

    return (
        <PageLayout>
            <View style={CommonStyles.WideMargin}>
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
    title: {
        fontSize: FontSizes.Header,
        paddingBottom: Spacings.Narrow
    },
    sublabel: {
        fontSize: FontSizes.Sublabel
    }
});