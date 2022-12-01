import { StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';
import { Spacings } from '../constants/Spacings';

export const CommonStyles = StyleSheet.create({
    // Backgrounds
    Background_Standard: {
        backgroundColor: Colors.Background
    },

    // Margins and Paddings
    Margin_Wide: {
        margin: Spacings.Wide
    },
    Margin_Standard: {
        margin: Spacings.Standard
    },
    Margin_Narrow: {
        margin: Spacings.Narrow
    }
});