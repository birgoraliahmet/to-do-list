import { TaskCard } from '@/components/TaskCard';
import { Colors } from '@/constants/theme';
import { useTasks } from '@/context/TaskContext';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { FlatList, StyleSheet, Text, View } from 'react-native';

export default function YearlyScreen() {
    const colorScheme = useColorScheme() ?? 'light';
    const theme = Colors[colorScheme];
    const { tasks, toggleTaskComplete } = useTasks();

    const yearlyTasks = tasks.filter((t) => t.type === 'yearly');

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <FlatList
                data={yearlyTasks}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                renderItem={({ item }) => (
                    <TaskCard
                        task={item}
                        onToggleComplete={toggleTaskComplete}
                        onPress={(task) => console.log('Edit', task.id)}
                    />
                )}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={[styles.emptyText, { color: theme.icon }]}>
                            Bu yıl için planlanmış bir göreviniz yok.
                        </Text>
                    </View>
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    listContent: {
        padding: 20,
        paddingBottom: 100, // accommodate bottom tab & floating buttons
    },
    emptyContainer: {
        padding: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emptyText: {
        fontSize: 16,
        textAlign: 'center',
    },
});
