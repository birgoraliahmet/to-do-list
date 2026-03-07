import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Checkbox } from './Checkbox';

export interface Task {
    id: string;
    title: string;
    description?: string;
    date: string; // ISO format
    type: 'daily' | 'monthly' | 'yearly';
    completed: boolean;
}

interface TaskCardProps {
    task: Task;
    onToggleComplete: (id: string, currentStatus: boolean) => void;
    onPress: (task: Task) => void;
}

export function TaskCard({ task, onToggleComplete, onPress }: TaskCardProps) {
    const colorScheme = useColorScheme() ?? 'light';
    const theme = Colors[colorScheme];

    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => onPress(task)}
            style={[
                styles.card,
                {
                    backgroundColor: theme.card,
                    borderColor: theme.border,
                    shadowColor: theme.text,
                },
            ]}
        >
            <View style={styles.leftContent}>
                <Checkbox
                    checked={task.completed}
                    onPress={() => onToggleComplete(task.id, task.completed)}
                />
                <View style={styles.textContainer}>
                    <Text
                        style={[
                            styles.title,
                            { color: theme.text },
                            task.completed && { textDecorationLine: 'line-through', opacity: 0.6 },
                        ]}
                    >
                        {task.title}
                    </Text>
                    {task.description ? (
                        <Text style={[styles.description, { color: theme.icon }]} numberOfLines={1}>
                            {task.description}
                        </Text>
                    ) : null}
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderWidth: 1,
        borderRadius: 12,
        marginBottom: 12,
        elevation: 2, // Android shadow
        shadowOffset: { width: 0, height: 1 }, // iOS shadow
        shadowOpacity: 0.05,
        shadowRadius: 3,
    },
    leftContent: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    textContainer: {
        marginLeft: 12,
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 4,
    },
    description: {
        fontSize: 14,
    },
});
