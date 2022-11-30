import React, { ReactElement, useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SearchBar } from '@rneui/themed';
import { RootStackParamList } from '../../App';
import PantryListItemView from '../components/PantryListItemView';
import { Colors } from '../constants/Colors';
import { FontSizes } from '../constants/FontSizes';
import { Loading } from '../components/LoadingView';
import { GET } from '../utils/HTTPRequests';
import { FormatHeader } from '../utils/FormatHeader';
import { HeaderMenu } from '../components/HeaderMenu';

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
        GET('/Items/Pantry', setLoading, setItems);
    }, []);

    // Set the header
    useEffect(() => {
        FormatHeader(props.navigation, 'PANTRY', setHeaderMenuShowing);
    }, [props.navigation])

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
            <ScrollView style={styles.pantryList}>
                {loading && <Loading />}
                {!loading && items.filter(item => {
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
            <HeaderMenu showing={headerMenuShowing} options={[
                {name: 'Add New Item', onPress: () => console.log("Pressed")},
                {name: 'Delete', onPress: () => console.log("Pressed")},
                {name: 'Delete but really long', onPress: () => console.log("Pressed")}
            ]} />
        </>
    )
}

const styles = StyleSheet.create({
    pantryList: {
        backgroundColor: Colors.Background
    }
});