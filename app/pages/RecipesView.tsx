import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { ReactElement, useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SearchBar } from '@rneui/themed';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RootStackParamList } from '../../App';
import RecipeListItemView from '../components/RecipeListItemView';
import { Colors } from '../constants/Colors';
import { FontSizes } from '../constants/FontSizes';
import { Recipe } from '../dto/Recipe';
import { Loading } from '../components/LoadingView';
import { GET } from '../utils/HTTPRequests';

// Get props from the stack nav props
type RecipesViewProps = NativeStackScreenProps<RootStackParamList, 'RecipesView'>;

/**
 * A view that displays the recipes
 * @param props Props for the view
 * @returns The view
 */
export default function RecipesView(props: RecipesViewProps): ReactElement {
    // Whether or not the data is loading
    const [loading, setLoading] = useState(true);
    // The recipes data
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    // Whether or not the header menu is showing
    const [headerMenuShowing, setHeaderMenuShowing] = useState(false);
    // The filter text
    const [filter, setFilter] = useState('');

    // Fetch the data
    useEffect(() => {
        GET('/Recipes', setLoading, setRecipes);
    }, []);

    // Set the menu options
    useEffect(() => {
        props.navigation.setOptions({
            headerTitle: 'RECIPES',
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
                {recipes.filter(recipe => {
                    if (filter === "") return true;
                    return recipe.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase());
                }).map(recipe => (
                    <RecipeListItemView 
                        key={recipe.recipeId}
                        recipeId={recipe.recipeId}
                        name={recipe.name}
                        description={recipe.description}
                        instructions={recipe.instructions}
                        prepTime={recipe.prepTime}
                        cookTime={recipe.cookTime}
                        ingredients={recipe.ingredients} /> 
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