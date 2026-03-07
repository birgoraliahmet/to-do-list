import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

interface CheckboxProps {
    checked: boolean;
    onPress: () => void;
    size?: number;
}

export function Checkbox({ checked, onPress, size = 24 }: CheckboxProps) {
    const colorScheme = useColorScheme() ?? 'light';
    const theme = Colors[colorScheme];

    return (
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={onPress}
            style={[
                styles.container,
                {
                    width: size,
                    height: size,
                    borderColor: checked ? theme.tint : theme.border,
                    backgroundColor: checked ? theme.tint : 'transparent',
                },
            ]}
        >
            {checked && (
                <MaterialIcons name="check" size={size * 0.8} color="#ffffff" />
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 2,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
