import { StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { ReactElement, useEffect, useState } from 'react'
import { RootStackParamList } from '../../App';
import { GetRecipe } from '../data/FakeData';
import PageLayout from '../layouts/PageLayout';
import { Recipe } from '../dto/Recipe';
import { Paddings } from '../constants/Spacings';
import { FontSizes } from '../constants/FontSizes';
import { Loading } from '../components/LoadingView';
import { NotFound } from '../components/NotFoundView';

// Get props from the stack nav props
type RecipeViewProps = NativeStackScreenProps<RootStackParamList, 'RecipeView'>;

/**
 * A view that displays all the data about a recipe
 * @param props Props for the view
 * @returns The view
 */
export default function RecipeView({ route, navigation }: RecipeViewProps): ReactElement {
    // Whether or not the data is loading
    const [loading, setLoading] = useState(false);
    // The recipe data
    const [recipe, setRecipe] = useState<Recipe>();

    // Fetch the data
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

    if (loading) return <Loading />
    if (!recipe) return <NotFound />

    return (
        <PageLayout>
            <View style={styles.container}>
                <Text style={styles.title}>{recipe.name}</Text>
                <View style={styles.row}>
                    <Text style={styles.sublabel}>Prep: {recipe.prepTime}</Text>
                    <Text style={[styles.sublabel, styles.leftPadding]}>Cook: {recipe.cookTime}</Text>
                </View>
                <View style={styles.ingredientsView}>
                    <Text style={styles.ingredient}>Ingredients:</Text>
                    {recipe.ingredients.map(ingredient => {
                        return(
                            <View style={[styles.row, styles.leftPadding]}>
                                <Text style={styles.ingredientName}>{ingredient.name}</Text>
                                <Text style={styles.ingredientQuantity}>{ingredient.quantity} {ingredient.units}</Text>
                            </View>
                        )
                    })}
                </View>
            </View>
        </PageLayout>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: Paddings.Wide,
    },
    title: {
        fontSize: FontSizes.Header,
        paddingBottom: Paddings.Narrow
    },
    sublabel: {
        fontSize: FontSizes.Sublabel
    },
    row: {
        flexDirection: 'row'
    },
    leftPadding: {
        paddingLeft: Paddings.Wide
    },
    ingredientsView: {
        paddingTop: Paddings.Narrow
    },
    ingredient: {
        fontSize: FontSizes.Ingredients
    },
    ingredientName: {
        flex: .5,
        fontSize: FontSizes.Ingredients
    },
    ingredientQuantity: {
        flex: .5,
        fontSize: FontSizes.Ingredients
    }
});