import { Task } from '@/components/TaskCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface TaskContextType {
    tasks: Task[];
    addTask: (task: Omit<Task, 'id'>) => void;
    updateTask: (updatedTask: Task) => void;
    deleteTask: (id: string) => void;
    toggleTaskComplete: (id: string, currentStatus: boolean) => void;
    isLoading: boolean;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

const TASKS_STORAGE_KEY = '@todo_app_tasks';

export function TaskProvider({ children }: { children: React.ReactNode }) {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadTasks();
    }, []);

    const loadTasks = async () => {
        try {
            const storedTasks = await AsyncStorage.getItem(TASKS_STORAGE_KEY);
            if (storedTasks) {
                setTasks(JSON.parse(storedTasks));
            }
        } catch (e) {
            console.error('Failed to load tasks from storage', e);
        } finally {
            setIsLoading(false);
        }
    };

    const saveTasks = async (newTasks: Task[]) => {
        try {
            const jsonValue = JSON.stringify(newTasks);
            await AsyncStorage.setItem(TASKS_STORAGE_KEY, jsonValue);
        } catch (e) {
            console.error('Failed to save tasks to storage', e);
        }
    };

    const addTask = (taskOutput: Omit<Task, 'id'>) => {
        const newTask: Task = { ...taskOutput, id: Date.now().toString() };
        const updatedTasks = [...tasks, newTask];
        setTasks(updatedTasks);
        saveTasks(updatedTasks);
    };

    const updateTask = (updatedTask: Task) => {
        const updatedTasks = tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t));
        setTasks(updatedTasks);
        saveTasks(updatedTasks);
    };

    const deleteTask = (id: string) => {
        const updatedTasks = tasks.filter((t) => t.id !== id);
        setTasks(updatedTasks);
        saveTasks(updatedTasks);
    };

    const toggleTaskComplete = (id: string, currentStatus: boolean) => {
        const updatedTasks = tasks.map((t) =>
            t.id === id ? { ...t, completed: !currentStatus } : t
        );
        setTasks(updatedTasks);
        saveTasks(updatedTasks);
    };

    return (
        <TaskContext.Provider
            value={{ tasks, addTask, updateTask, deleteTask, toggleTaskComplete, isLoading }}
        >
            {children}
        </TaskContext.Provider>
    );
}

export function useTasks() {
    const context = useContext(TaskContext);
    if (context === undefined) {
        throw new Error('useTasks must be used within a TaskProvider');
    }
    return context;
}
