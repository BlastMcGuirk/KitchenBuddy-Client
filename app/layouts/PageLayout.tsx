import React, { ReactElement } from 'react'
import { Platform, StatusBar, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../constants/Colors';
import { FontSizes } from '../constants/FontSizes';
import { Paddings } from '../constants/Spacings';
import { Header, HeaderMenuOption } from './Header';

export interface PageLayout {
    children: ReactElement | ReactElement[];
}

export default function PageLayout(props: PageLayout) {
    return (
        <View style={styles.container}>
            {props.children}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.Primary,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    }
});