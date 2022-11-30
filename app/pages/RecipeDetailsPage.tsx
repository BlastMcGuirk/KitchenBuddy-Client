import { StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { ReactElement, useEffect, useState } from 'react'
import { RootStackParamList } from '../../App';
import { PageLayout } from '../layouts/PageLayout';
import { Recipe } from '../dto/Recipe';
import { Spacings } from '../constants/Spacings';
import { FontSizes } from '../constants/FontSizes';
import { Loading } from '../components/Loading';
import { NotFound } from '../components/NotFound';
import { GET } from '../utils/HTTPRequests';
import { CommonStyles } from '../styles/CommonStyles';

// Get props from the stack nav props
type RecipeDetailsPageProps = NativeStackScreenProps<RootStackParamList, 'RecipeDetailsPage'>;

/**
 * A page that displays all the data about a recipe
 * @param props Props for the page
 * @returns The page
 */
export function RecipeDetailsPage({ route, navigation }: RecipeDetailsPageProps): ReactElement {
    // Whether or not the data is loading
    const [loading, setLoading] = useState(false);
    // The recipe data
    const [recipe, setRecipe] = useState<Recipe>();

    // Fetch the data
    useEffect(() => {
        GET('/Recipes/' + route.params.id, setLoading, setRecipe);
    }, []);

    if (loading) return <Loading />
    if (!recipe) return <NotFound />

    return (
        <PageLayout>
            <View style={CommonStyles.WideMargin}>
                <Text style={styles.title}>{recipe.name}</Text>
                <Text style={styles.sublabel}>{recipe.description}</Text>
                <View style={styles.row}>
                    <Text style={styles.sublabel}>Prep: {recipe.prepTime}</Text>
                    <Text style={[styles.sublabel, styles.leftPadding]}>Cook: {recipe.cookTime}</Text>
                </View>
                <View style={styles.ingredientsView}>
                    <Text style={styles.ingredient}>Ingredients:</Text>
                    {recipe.ingredients?.map(ingredient => {
                        return(
                            <View style={[styles.row, styles.leftPadding]} key={ingredient.id}>
                                <Text style={styles.ingredientName}>{ingredient.name}</Text>
                                <Text style={styles.ingredientQuantity}>{ingredient.quantity} {ingredient.units}</Text>
                            </View>
                        )
                    })}
                </View>
                <View style={styles.ingredientsView}>
                    <Text style={styles.ingredient}>Instructions:</Text>
                    {recipe.instructions.split("\n").map((instruction, i) => {
                        return (
                            <View style={[styles.row, styles.leftPadding]} key={i}>
                                <Text style={styles.ingredientName}>{(i + 1) + ")"} {instruction}</Text>
                            </View>
                        )
                    })}
                </View>
            </View>
        </PageLayout>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: FontSizes.Header,
        paddingBottom: Spacings.Narrow
    },
    sublabel: {
        fontSize: FontSizes.Sublabel
    },
    row: {
        flexDirection: 'row'
    },
    leftPadding: {
        paddingLeft: Spacings.Wide
    },
    ingredientsView: {
        paddingTop: Spacings.Narrow
    },
    ingredient: {
        fontSize: FontSizes.Ingredients
    },
    ingredientName: {
        flex: .5,
        fontSize: FontSizes.Sublabel
    },
    ingredientQuantity: {
        flex: .5,
        fontSize: FontSizes.Sublabel
    }
});