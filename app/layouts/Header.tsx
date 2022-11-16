import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { FontSizes } from "../constants/FontSizes";
import { Paddings } from "../constants/Spacings";

export interface HeaderMenuOption {
    text: string;
    action: () => void;
}

export interface HeaderProps {
    headerText: string;
    headerMenuOptions: HeaderMenuOption[];
}

export function Header(props: HeaderProps) {
    return (
        <View style={styles.header}>
            <Text style={styles.headerText}>{props.headerText}</Text>
            {props.headerMenuOptions.length && (
                <Text>...</Text>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        padding: Paddings.Standard
    },
    headerText: {
        color: Colors.White,
        fontSize: FontSizes.Header
    }
});