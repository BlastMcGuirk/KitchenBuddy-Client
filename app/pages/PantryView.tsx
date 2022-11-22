import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { ReactElement, useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SearchBar } from '@rneui/themed';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RootStackParamList } from '../../App';
import PantryListItemView from '../components/PantryListItemView';
import { Colors } from '../constants/Colors';
import { FontSizes } from '../constants/FontSizes';
import { GetPantryItems } from '../data/FakeData';
import { Loading } from '../components/LoadingView';

// Get props from the stack nav props
type PantryViewProps = NativeStackScreenProps<RootStackParamList, 'PantryView'>;

/**
 * A view that displays the items in the pantry
 * @param props Props for the view
 * @returns The view
 */
export default function PantryView(props: PantryViewProps): ReactElement {
    // Whether or not the data is loading
    const [loading, setLoading] = useState(true);
    // The pantry items data
    const [items, setItems] = useState<any[]>([]);
    // Whether or not the header menu is showing
    const [headerMenuShowing, setHeaderMenuShowing] = useState(false);
    // The filter text
    const [filter, setFilter] = useState('');

    // Fetch the pantry items data
    useEffect(() => {
        setLoading(true);
        //fetch("https://localhost:7044/Items/Pantry")
        //.then(res => res.json())
        GetPantryItems()
        .then(data => {
            setItems(data);
            setLoading(false);
        });
    }, []);

    // Set the menu options
    useEffect(() => {
        props.navigation.setOptions({
            headerTitle: 'PANTRY',
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

    if (loading) return <Loading />

    return (
        <>
            <SearchBar
                placeholder='Search for food...'
                value={filter}
                onChangeText={setFilter}
                containerStyle={{
                    backgroundColor: Colors.Background,
                }}
                lightTheme={true} />
            <ScrollView style={styles.pantry}>
                {items.filter(item => {
                    if (filter === "") return true;
                    return item.name.toLowerCase().includes(filter.toLocaleLowerCase());
                }).map(item => (
                    <PantryListItemView 
                        key={item.id} 
                        id={item.id} 
                        name={item.name} 
                        quantity={item.quantity} 
                        units={item.units}
                        expiration={item.expiration} /> 
                ))}
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
    }
});