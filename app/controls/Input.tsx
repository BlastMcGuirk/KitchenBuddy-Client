import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { CommonStyles } from '../styles/CommonStyles';

/**
 * Props for the input
 */
export interface InputProps {
    // The label to display under the text input
    label: string;
    // The value for the input
    value: string;
    // What to do when the input changes
    setValue: (v: string) => void;
    // Optional styles for the whole input view
    styles?: any[];
}

/**
 * A control to display a text input with a label
 * @param props Props for the control
 * @returns An input with a label
 */
export function Input(props: InputProps) {
    return (
        <View style={props.styles}>
            <TextInput 
                style={[CommonStyles.TextInput]} 
                value={props.value} 
                onChangeText={props.setValue}
            />
            <Text 
                style={[CommonStyles.TextSize_XS]}
            >
                {props.label}
            </Text>
        </View>
    )
}