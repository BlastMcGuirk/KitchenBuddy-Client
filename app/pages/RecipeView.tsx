import { Platform, StatusBar, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { ReactElement, useEffect, useState } from 'react'
import { RootStackParamList } from '../../App';
import { GetPantryItem, GetRecipe } from '../data/FakeData';
import PageLayout from '../layouts/PageLayout';
import { Recipe } from '../dto/Recipe';

type RecipeViewProps = NativeStackScreenProps<RootStackParamList, 'RecipeView'>;

export default function RecipeView({ route, navigation }: RecipeViewProps): ReactElement {
    const [loading, setLoading] = useState(false);
    const [recipe, setRecipe] = useState<Recipe>();

    useEffect(() => {
        setLoading(true);
        //fetch("https://localhost:7044/Items/" + route.params.id + "/Pantry")
        //.then(res => res.json())
        GetRecipe(route.params.id)
        .then(data => {
            setRecipe(data);
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

    if (!recipe) {
        return (
            <PageLayout>
                <Text>Recipe not found.</Text>
            </PageLayout>
        )
    }

    return (
        <PageLayout>
            <Text>{recipe.name}</Text>
        </PageLayout>
    )
}

const styles = StyleSheet.create({
    itemRow: {
        flexDirection: 'row',
    },
});