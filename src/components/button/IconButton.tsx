import React from 'react';
import { useColorScheme } from 'react-native';
import { TouchableOpacity, StyleSheet, TouchableOpacityProps } from 'react-native';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';


type IconButtonProps = {
    onPress: () => void;
    iconName: string;
    iconSize?: number;
    iconColor?: string;
    width?: number;
    height?: number;
    borderRadius?: number;
} & TouchableOpacityProps;

export default function IconButton({
    onPress,
    iconName,
    iconSize = 24,
    iconColor,
    width = 36,
    height = 36,
    borderRadius = 10,
    ...props
}: IconButtonProps) {

    const scheme = useColorScheme();
    const themeColor = scheme === 'dark' ? '#fff' : '#000';
    const color = iconColor ? iconColor : themeColor;
    return (
        <TouchableOpacity
            style={[
                styles.button,
                {
                    width,
                    height,
                    borderRadius,
                }
            ]}
            onPress={onPress}
            {...props}
        >
            <MaterialDesignIcons name={iconName} size={iconSize} color={color} />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});
