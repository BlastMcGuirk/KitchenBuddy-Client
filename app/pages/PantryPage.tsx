import React, { ReactElement, useEffect, useState } from 'react'
import { ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SearchBar } from '@rneui/themed';
import { RootStackParamList } from '../../App';
import { PantryListItem } from '../components/PantryListItem';
import { Colors } from '../constants/Colors';
import { Loading } from '../components/Loading';
import { GET } from '../utils/HTTPRequests';
import { FormatHeader } from '../utils/FormatHeader';
import { CommonStyles } from '../styles/CommonStyles';

// Get props from the stack nav props
type PantryPageProps = NativeStackScreenProps<RootStackParamList, 'PantryPage'>;

/**
 * A page that displays the items in the pantry
 * @param props Props for the page
 * @returns The page
 */
export function PantryPage(props: PantryPageProps): ReactElement {
    // Whether or not the data is loading
    const [loading, setLoading] = useState(true);
    // The pantry items data
    const [items, setItems] = useState<any[]>([]);
    // The filter text
    const [filter, setFilter] = useState('');

    // Fetch the pantry items data
    useEffect(() => {
        GET('/Items/Pantry', setLoading, setItems);
    }, []);

    // Set the header
    useEffect(() => {
        FormatHeader(props.navigation, 'PANTRY', [
            {name: 'Add New Item', onPress: () => props.navigation.navigate("NewItemPage")}
        ]);
    }, [props.navigation])

    return (
        <>
            <SearchBar
                placeholder='Search for food...'
                value={filter}
                onChangeText={setFilter}
                containerStyle={{
                    backgroundColor: Colors.LightPrimary,
                }}
                lightTheme={true} />
            <ScrollView style={CommonStyles.Background_Standard}>
                {loading && <Loading />}
                {!loading && items.filter(item => {
                    if (filter === "") return true;
                    return item.name.toLowerCase().includes(filter.toLocaleLowerCase());
                }).map(item => (
                    <PantryListItem 
                        key={item.id} 
                        id={item.id} 
                        name={item.name} 
                        quantity={item.quantity} 
                        units={item.units}
                        expiration={item.expiration} /> 
                ))}
            </ScrollView>
        </>
    )
}