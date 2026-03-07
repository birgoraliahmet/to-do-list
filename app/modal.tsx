import { Colors } from '@/constants/theme';
import { useTasks } from '@/context/TaskContext';
import { useColorScheme } from '@/hooks/use-color-scheme';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Notifications from 'expo-notifications';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function ModalScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];
  const { addTask } = useTasks();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [type, setType] = useState<'daily' | 'monthly' | 'yearly'>('daily');

  useEffect(() => {
    requestPermissions();
  }, []);

  const requestPermissions = async () => {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      console.warn('Notification permissions not granted!');
    }
  };

  const scheduleNotification = async (taskTitle: string, taskDate: Date) => {
    // Sadece gelecek zamansa planla
    if (taskDate.getTime() > Date.now()) {
      try {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: "Görev Vakti! ⏰",
            body: taskTitle,
            sound: true,
          },
          trigger: {
            type: Notifications.SchedulableTriggerInputTypes.DATE,
            date: taskDate,
          },
        });
      } catch (err) {
        console.error("Failed to schedule notification", err);
      }
    }
  };

  const handleSave = async () => {
    await scheduleNotification(title, date);

    addTask({
      title,
      description,
      date: date.toISOString(),
      type,
      completed: false,
    });
    router.back();
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.label, { color: theme.text }]}>Başlık</Text>
      <TextInput
        style={[styles.input, { color: theme.text, borderColor: theme.border }]}
        placeholder="Görev Başlığı"
        placeholderTextColor={theme.icon}
        value={title}
        onChangeText={setTitle}
      />

      <Text style={[styles.label, { color: theme.text }]}>Açıklama (İsteğe Bağlı)</Text>
      <TextInput
        style={[styles.input, { color: theme.text, borderColor: theme.border, height: 80 }]}
        placeholder="Görev Detayları"
        placeholderTextColor={theme.icon}
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <Text style={[styles.label, { color: theme.text }]}>Görev Türü</Text>
      <View style={styles.segmentedControl}>
        {(['daily', 'monthly', 'yearly'] as const).map((t) => (
          <TouchableOpacity
            key={t}
            style={[
              styles.segmentBtn,
              { borderColor: theme.tint },
              type === t && { backgroundColor: theme.tint },
            ]}
            onPress={() => setType(t)}
          >
            <Text
              style={[
                styles.segmentText,
                { color: type === t ? '#fff' : theme.tint },
              ]}
            >
              {t === 'daily' ? 'Günlük' : t === 'monthly' ? 'Aylık' : 'Yıllık'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={[styles.label, { color: theme.text }]}>Tarih & Saat</Text>
      <View style={{ flexDirection: 'row', gap: 12 }}>
        <TouchableOpacity
          style={[styles.dateButton, { borderColor: theme.border, flex: 1 }]}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={{ color: theme.text }}>{date.toLocaleDateString()}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.dateButton, { borderColor: theme.border, flex: 1 }]}
          onPress={() => setShowTimePicker(true)}
        >
          <Text style={{ color: theme.text }}>
            {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Text>
        </TouchableOpacity>
      </View>

      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) {
              const newDate = new Date(date);
              newDate.setFullYear(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate());
              setDate(newDate);
            }
          }}
        />
      )}

      {showTimePicker && (
        <DateTimePicker
          value={date}
          mode="time"
          display="default"
          onChange={(event, selectedDate) => {
            setShowTimePicker(false);
            if (selectedDate) {
              const newDate = new Date(date);
              newDate.setHours(selectedDate.getHours(), selectedDate.getMinutes(), 0);
              setDate(newDate);
            }
          }}
        />
      )}

      <TouchableOpacity
        style={[styles.saveButton, { backgroundColor: theme.tint }]}
        onPress={handleSave}
      >
        <Text style={styles.saveButtonText}>Kaydet</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  segmentedControl: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  segmentBtn: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  segmentText: {
    fontWeight: '600',
  },
  dateButton: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  saveButton: {
    marginTop: 32,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
