import { StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';
import { Spacings } from '../constants/Spacings';

export const CommonStyles = StyleSheet.create({
    // Backgrounds
    StandardBackground: {
        backgroundColor: Colors.Background
    },

    // Margins and Paddings
    WideMargin: {
        margin: Spacings.Wide
    }
});