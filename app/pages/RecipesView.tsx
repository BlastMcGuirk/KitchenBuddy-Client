import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { ReactElement, useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { RootStackParamList } from '../../App';
import RecipeListItemView from '../components/RecipeListItemView';
import { Colors } from '../constants/Colors';
import { FontSizes } from '../constants/FontSizes';
import { GetRecipes } from '../data/FakeData';
import { Recipe } from '../dto/Recipe';

type RecipesViewProps = NativeStackScreenProps<RootStackParamList, 'RecipesView'>;

export default function RecipesView(props: RecipesViewProps): ReactElement {
    const [loading, setLoading] = useState(true);
    const [recipes, setRecipes] = useState<Recipe[]>([]);

    useEffect(() => {
        setLoading(true);
        //fetch("https://localhost:7044/Items/Pantry")
        //.then(res => res.json())
        GetRecipes()
        .then(data => {
            setRecipes(data);
            setLoading(false);
        });
    }, []);

    /*useEffect(() => {
        props.navigation.setOptions({
            headerTitle: 'Kitchen Buddy',
            headerRight: () => (
                <Icon 
                    name="more-vert" 
                    color={Colors.White} 
                    size={FontSizes.Header} 
                    onPress={() => {
                        setHeaderMenuShowing(prev => !prev);
                    }} />
            )
        })
    }, [props.navigation])*/

    return (
        <>
            <ScrollView style={styles.pantry}>
                {loading && (
                    <View>
                        <Text>Loading...</Text>
                    </View>
                )}
                {!loading &&
                recipes.map(recipe => (
                    <RecipeListItemView key={recipe.recipeId} recipeId={recipe.recipeId} name={recipe.name} /> 
                ))
            }
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    pantry: {
        backgroundColor: Colors.White
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