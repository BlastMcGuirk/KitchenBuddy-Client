import React, { ReactElement } from 'react'
import { View } from 'react-native';
import { CommonStyles } from '../styles/CommonStyles';

// Props for the page layout layout
export interface PageLayoutProps {
    children: ReactElement | (ReactElement | null)[];
}

/**
 * A layout so that all pages look generally the same
 * 
 * @param props Props for the page layout layout
 * @returns A standard page layout
 */
export function PageLayout(props: PageLayoutProps) {
    return (
        <View style={[
            CommonStyles.Background_Standard,
            CommonStyles.Margin_Wide
        ]}>
            {props.children}
        </View>
    )
}