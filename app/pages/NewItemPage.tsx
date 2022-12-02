import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { ReactElement, useState } from 'react';
import { StyleSheet, Button } from 'react-native';
import { RootStackParamList } from '../../App';
import { Input } from '../controls/Input';
import { PageLayout } from '../layouts/PageLayout';
import { POST } from '../utils/HTTPRequests';

// Page props
type NewItemPageProps = NativeStackScreenProps<RootStackParamList, 'NewItemPage'>;

/**
 * A page to create a new item
 * @param props Props for the page
 * @returns The new item page
 */
export function NewItemPage(props: NewItemPageProps): ReactElement {
    // The name of the new item
    const [name, setName] = useState('');
    // The units of the new item
    const [units, setUnits] = useState('');

    // What to do when the user presses the button
    function addNewItem() {
        // Start the POST request
        POST('/Items', {name, units}, (res: any) => {
            console.log(res);
            if (!res.status) {
                props.navigation.navigate("PantryPage");
            }
        })
    }

    return (
        <PageLayout>
            <Input styles={[styles.bottomMargin]} label='Name' value={name} setValue={setName} />
            <Input styles={[styles.bottomMargin]} label='Units' value={units} setValue={setUnits} />
            <Button title="Add Item" onPress={addNewItem} />
        </PageLayout>
    )
}

const styles = StyleSheet.create({
    bottomMargin: {
        marginBottom: 40
    }
})