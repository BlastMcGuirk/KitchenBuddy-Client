import { NativeStackScreenProps } from '@react-navigation/native-stack';
import CheckBox from 'expo-checkbox';
import React, { ReactElement, useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RootStackParamList } from '../../App';
import ShoppingListItemView from '../components/ShoppingListItemView';
import { Colors } from '../constants/Colors';
import { FontSizes } from '../constants/FontSizes';
import { Paddings } from '../constants/Spacings';
import { GetShoppingItems } from '../data/FakeData';
import { ShoppingItem } from '../dto/ShoppingItem';

type ShoppingViewProps = NativeStackScreenProps<RootStackParamList, 'ShoppingView'>;

export default function ShoppingView(props: ShoppingViewProps): ReactElement {
    const [loading, setLoading] = useState(true);
    const [shoppingItems, setShoppingItems] = useState<ShoppingItem[]>([]);
    const [headerMenuShowing, setHeaderMenuShowing] = useState(false);
    const [allChecked, setAllChecked] = useState(false);

    useEffect(() => {
        setLoading(true);
        //fetch("https://localhost:7044/Items/Pantry")
        //.then(res => res.json())
        GetShoppingItems()
        .then(data => {
            setShoppingItems(data);
            setLoading(false);
        });
    }, []);

    useEffect(() => {
        props.navigation.setOptions({
            headerTitle: 'SHOPPING',
            headerRight: () => (
                <View style={{marginRight: 10}}>
                    <Icon 
                        name="more-vert" 
                        color={Colors.Black} 
                        size={FontSizes.Header} 
                        onPress={() => {
                            setHeaderMenuShowing(prev => !prev);
                        }} />
                </View>
            ),
            headerTintColor: Colors.Black,
            headerStyle: {
                backgroundColor: Colors.Primary
            },
            headerTitleStyle: {
                fontSize: FontSizes.Header
            }
        })
    }, [props.navigation])

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
                {loading && (
                    <View>
                        <Text>Loading...</Text>
                    </View>
                )}
                {!loading &&
                shoppingItems.map(shoppingItem => (
                    <ShoppingListItemView 
                        key={shoppingItem.id} 
                        id={shoppingItem.id} 
                        name={shoppingItem.name}
                        isChecked={shoppingItem.isChecked}
                        quantity={shoppingItem.quantity}
                        units={shoppingItem.units} /> 
                ))
            }
            </ScrollView>
            {headerMenuShowing && 
                <View style={styles.headerMenu}>
                    <Text style={styles.headerOption}>Add Food</Text>
                    <Text style={styles.headerOption}>Second</Text>
                </View>
            }
        </>
    )
}

const styles = StyleSheet.create({
    pantry: {
        backgroundColor: Colors.Background
    },
    headerMenu: {
        position: 'absolute',
        right: 0,
        zIndex: 1,
        borderWidth: 1,
        borderTopWidth: 0,
        display: 'flex',
    },
    headerOption: {
        borderTopWidth: 1,
        padding: 5,
        paddingLeft: 10,
        width: 150,
        height: 40,
        fontSize: FontSizes.Menu
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