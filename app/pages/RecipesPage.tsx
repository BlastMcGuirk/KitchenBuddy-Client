import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { ReactElement, useEffect, useState } from 'react'
import { ScrollView, StyleSheet } from 'react-native';
import { SearchBar } from '@rneui/themed';
import { RootStackParamList } from '../../App';
import { RecipeListItem } from '../components/RecipeListItem';
import { Colors } from '../constants/Colors';
import { Recipe } from '../dto/Recipe';
import { Loading } from '../components/Loading';
import { GET } from '../utils/HTTPRequests';
import { FormatHeader } from '../utils/FormatHeader';
import { HeaderMenu } from '../components/HeaderMenu';

// Get props from the stack nav props
type RecipesPageProps = NativeStackScreenProps<RootStackParamList, 'RecipesPage'>;

/**
 * A page that displays the recipes
 * @param props Props for the page
 * @returns The page
 */
export function RecipesPage(props: RecipesPageProps): ReactElement {
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
        FormatHeader(props.navigation, 'RECIPES', setHeaderMenuShowing);
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
            <ScrollView style={styles.recipesList}>
                {loading && <Loading />}
                {!loading && recipes.filter(recipe => {
                    if (filter === "") return true;
                    return recipe.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase());
                }).map(recipe => (
                    <RecipeListItem 
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
            <HeaderMenu showing={headerMenuShowing} options={[
                {name: 'Add New Recipe', onPress: () => console.log("Pressipe")}
            ]} />
        </>
    )
}

const styles = StyleSheet.create({
    recipesList: {
        backgroundColor: Colors.Background
    }
});