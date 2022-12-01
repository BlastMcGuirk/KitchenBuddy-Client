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
            CommonStyles.Background_Standard,
            CommonStyles.Margin_Wide
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