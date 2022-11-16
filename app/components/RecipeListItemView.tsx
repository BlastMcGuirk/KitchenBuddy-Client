import React from 'react'
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import { useNavigation } from '@react-navigation/native';
import { PantryItem } from '../dto/PantryItem';
import { FontSizes } from '../constants/FontSizes';
import { Paddings } from '../constants/Spacings';
import { Colors } from '../constants/Colors';
import { Recipe } from '../dto/Recipe';

type RecipeListViewProps = StackNavigationProp<RootStackParamList, 'PantryItemView'>;

export default function RecipeListItemView(props: Recipe) {
    const navigation = useNavigation<RecipeListViewProps>();

    return (
        <TouchableHighlight 
            onPress={() => navigation.navigate('ItemView',
                {
                    id: props.recipeId
                }
            )} 
            onLongPress={() => console.log("Long")} 
            underlayColor={Colors.OffWhite}
        >
            <View style={styles.item}>
                <Text style={styles.label}>{props.name}</Text>
            </View>
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    item: {
        padding: Paddings.Standard,
        borderBottomWidth: 1
    },
    label: {
        fontSize: FontSizes.Label
    },
    sublabel: {
        flexDirection: "row",
        fontSize: FontSizes.Sublabel
    },
})

