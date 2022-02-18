import React, { ReactElement, useEffect, useState } from 'react'
import { Platform, ScrollView, StatusBar, StyleSheet } from 'react-native';
import PantryItem from '../components/PantryItemView';
import { GetPantryItems } from '../data/FakeData';

export default function PantryView(): ReactElement {
    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState<any[]>([]);

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

    return (
        <ScrollView style={styles.container}>
            {loading && (
            <div>
                <p>Loading...</p>
            </div>
            )}
            {!loading &&
            items.map(item => (
                <PantryItem key={item.id} id={item.id} name={item.name} quantity={item.quantity} units={item.units} /> 
            ))
            }
      </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      paddingBottom: 30
    },
  });