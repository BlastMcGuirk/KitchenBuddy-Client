import { StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';
import { FontSizes } from '../constants/FontSizes';
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
    },
    Margin_None: {
        margin: 0
    },
    Padding_Wide: {
        padding: Spacings.Wide
    },
    Padding_Standard: {
        padding: Spacings.Standard
    },
    Padding_Narrow: {
        padding: Spacings.Narrow
    },
    Padding_None: {
        padding: 0
    },

    // Inputs
    TextInput: {
        margin: 0,
        paddingBottom: Spacings.VeryNarrow,
        borderBottomWidth: 1,
        fontSize: FontSizes.M
    },

    // Text
    TextSize_XS: {
        fontSize: FontSizes.XS
    }
});