import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { ReactElement, useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SearchBar } from '@rneui/themed';
import Icon from 'react-native-vector-icons/MaterialIcons';
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
    const [headerMenuShowing, setHeaderMenuShowing] = useState(false);
    const [filter, setFilter] = useState('');

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
                {loading && (
                    <View>
                        <Text>Loading...</Text>
                    </View>
                )}
                {!loading &&
                recipes.filter(recipe => {
                    if (filter === "") return true;
                    return recipe.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase());
                }).map(recipe => (
                    <RecipeListItemView 
                        key={recipe.recipeId}
                        recipeId={recipe.recipeId}
                        name={recipe.name}
                        prepTime={recipe.prepTime}
                        cookTime={recipe.cookTime}
                        ingredients={recipe.ingredients} /> 
                ))
            }
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