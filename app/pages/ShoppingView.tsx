import { NativeStackScreenProps } from '@react-navigation/native-stack';
import CheckBox from 'expo-checkbox';
import React, { ReactElement, useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { RootStackParamList } from '../../App';
import { HeaderMenu } from '../components/HeaderMenu';
import { Loading } from '../components/LoadingView';
import ShoppingListItemView from '../components/ShoppingListItemView';
import { Colors } from '../constants/Colors';
import { FontSizes } from '../constants/FontSizes';
import { Paddings } from '../constants/Spacings';
import { ShoppingItem } from '../dto/ShoppingItem';
import { FormatHeader } from '../utils/FormatHeader';
import { GET } from '../utils/HTTPRequests';

// Get props from the stack nav props
type ShoppingViewProps = NativeStackScreenProps<RootStackParamList, 'ShoppingView'>;

/**
 * A view that displays the shopping list items
 * @param props Props for the view
 * @returns The view
 */
export default function ShoppingView(props: ShoppingViewProps): ReactElement {
    // Whether or not the data is loading
    const [loading, setLoading] = useState(true);
    // The shopping items data
    const [shoppingItems, setShoppingItems] = useState<ShoppingItem[]>([]);
    // Whether or not the header menu is showing
    const [headerMenuShowing, setHeaderMenuShowing] = useState(false);

    // Fetch the data
    useEffect(() => {
        GET("/Items/Shopping", setLoading, setShoppingItems);
    }, []);

    // Set the menu options
    useEffect(() => {
        FormatHeader(props.navigation, 'SHOPPING', setHeaderMenuShowing);
    }, [props.navigation])

    if (loading) return <Loading />

    return (
        <>
            <ScrollView style={styles.pantry}>
                <View style={styles.label}>
                    <CheckBox 
                        disabled={true} />
                    <Text style={styles.labelItem}>Item</Text>
                    <Text style={styles.labelQuantity}>Qty</Text>
                    <Text style={styles.labelUnits}>Units</Text>
                </View>
                {loading && <Loading />}
                {!loading && shoppingItems.map(shoppingItem => (
                    <ShoppingListItemView 
                        key={shoppingItem.id} 
                        id={shoppingItem.id} 
                        name={shoppingItem.name}
                        isChecked={shoppingItem.isChecked}
                        quantity={shoppingItem.quantity}
                        units={shoppingItem.units} /> 
                ))}
            </ScrollView>
            <HeaderMenu showing={headerMenuShowing} options={[
                {name: 'Clear All', onPress: () => console.log("Cleared")}
            ]} />
        </>
    )
}

const styles = StyleSheet.create({
    pantry: {
        backgroundColor: Colors.Background
    },
    label: {
        flexDirection: 'row',
        backgroundColor: Colors.LightPrimary,
        padding: Paddings.Narrow,
        alignItems: 'center'
    },
    labelItem: {
        fontSize: FontSizes.Label,
        marginLeft: Paddings.Narrow,
        flex: .55,
    },
    labelQuantity: {
        fontSize: FontSizes.Label,
        flex: .2
    },
    labelUnits: {
        fontSize: FontSizes.Label,
        flex: .25,
    }
});