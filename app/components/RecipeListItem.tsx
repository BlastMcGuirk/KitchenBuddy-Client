import React from 'react'
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import { useNavigation } from '@react-navigation/native';
import { FontSizes } from '../constants/FontSizes';
import { Spacings } from '../constants/Spacings';
import { Colors } from '../constants/Colors';
import { Recipe } from '../dto/Recipe';

// Get props from the stack nav props
type RecipeListItemProps = StackNavigationProp<RootStackParamList, 'RecipeListItem'>;

/**
 * A view that displays a line in the recipes list
 * @param props Props for the view
 * @returns The view
 */
export function RecipeListItem(props: Recipe) {
    const navigation = useNavigation<RecipeListItemProps>();
    
    return (
        <TouchableHighlight 
            onPress={() => navigation.navigate('RecipeDetailsPage',
                {
                    id: props.recipeId
                }
            )} 
            onLongPress={() => console.log("Long")} 
            underlayColor={Colors.OffWhite}
        >
            <View style={styles.item}>
                <Text style={styles.label}>{props.name}</Text>
                <Text style={styles.sublabel}>{props.description}</Text>
                <View style={styles.row}>
                    <Text style={styles.sublabel}>Prep: {props.prepTime}</Text>
                    <Text style={[styles.sublabel, styles.leftPadding]}>Cook: {props.cookTime}</Text>
                </View>
            </View>
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    item: {
        padding: Spacings.Standard,
        paddingVertical: Spacings.Narrow
    },
    row: {
        flexDirection: 'row'
    },
    label: {
        fontSize: FontSizes.Recipe,
        paddingBottom: Spacings.Narrow
    },
    sublabel: {
        flexDirection: "row",
        fontSize: FontSizes.RecipeSmall,
        paddingBottom: Spacings.Narrow
    },
    leftPadding: {
        paddingLeft: Spacings.Wide
    }
})

