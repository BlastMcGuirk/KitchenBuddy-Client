import React, { ReactElement } from 'react'
import { StyleSheet, View } from 'react-native';
import { Colors } from '../constants/Colors';
import { CommonStyles } from '../styles/CommonStyles';

export interface PageLayout {
    children: ReactElement | ReactElement[];
}

export function PageLayout(props: PageLayout) {
    return (
        <View style={[
            CommonStyles.StandardBackground,
            CommonStyles.WideMargin
        ]}>
            {props.children}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.Background
    }
});