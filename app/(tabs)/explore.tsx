import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';
import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
// ThemeContext removed — app follows system theme

export default function EventsScreen() {
  // For now we'll show a placeholder last-fed time. This can be replaced
  // with real data from storage or an API later.
  const initial = new Date();

  // Keep the full Date in state. The date portion is taken from device automatically.
  const [lastFed, setLastFed] = useState<Date>(initial);
  const [editing, setEditing] = useState(false);
  // draftTime stores only the time string (HH:MM)
  const pad = (n: number) => String(n).padStart(2, '0');
  const formatTime = (d: Date) => `${pad(d.getHours())}:${pad(d.getMinutes())}`;
  const formatDisplay = (d: Date) => `${d.toLocaleDateString()} ${formatTime(d)}`;

  const [draftTime, setDraftTime] = useState(formatTime(initial));
  // Use the theme 'card' color for the Last fed item so it appears white in light mode
  const cardAlt = useThemeColor({}, 'card');
  // Use the alternate card color for inputs (slightly different surface)
  const inputBg = useThemeColor({}, 'cardAlt');
  const tint = useThemeColor({}, 'tint');

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Events
      </ThemedText>

      {/* theme toggle removed; app follows system theme */}

      <View style={[styles.card, { backgroundColor: cardAlt }] }>
        <ThemedText type="subtitle" style={styles.eventLabel}>
          Last fed
        </ThemedText>

        {editing ? (
          <>
            <TextInput
              style={[styles.input, { backgroundColor: inputBg }]}
              value={draftTime}
              onChangeText={setDraftTime}
              placeholder={formatTime(new Date())}
              placeholderTextColor="#999"
              keyboardType="numeric"
            />
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={[styles.smallButton, styles.saveButton]}
                onPress={() => {
                  // parse HH:MM
                  const parts = (draftTime || '').split(':').map(p => parseInt(p, 10));
                  const hours = Number.isFinite(parts[0]) ? parts[0] : new Date().getHours();
                  const minutes = Number.isFinite(parts[1]) ? parts[1] : new Date().getMinutes();
                  const newDate = new Date(lastFed);
                  newDate.setHours(hours, minutes, 0, 0);
                  setLastFed(newDate);
                  setEditing(false);
                }}
              >
                <ThemedText style={styles.smallButtonText}>Save</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.smallButton, styles.cancelButton]}
                onPress={() => {
                  setDraftTime(formatTime(lastFed));
                  setEditing(false);
                }}
              >
                <ThemedText style={styles.smallButtonText}>Cancel</ThemedText>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <View style={styles.eventRow}>
            <ThemedText style={styles.eventDate}>{lastFed.toLocaleDateString()}</ThemedText>
            <TouchableOpacity onPress={() => { setDraftTime(formatTime(lastFed)); setEditing(true); }} activeOpacity={0.8}>
              <ThemedText style={styles.eventTime}>{formatTime(lastFed)}</ThemedText>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    paddingTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 16,
  },
  card: {
    padding: 16,
    borderRadius: 12,
  },
  eventLabel: {
    fontSize: 16,
    marginBottom: 8,
  },
  eventValue: {
    fontSize: 18,
    fontWeight: '700',
  },
  eventRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  eventDate: {
    fontSize: 16,
  },
  eventTime: {
    fontSize: 18,
    fontWeight: '700',
  },
  input: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    fontSize: 16,
    color: '#222',
    marginBottom: 12,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  smallButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginRight: 12,
  },
  saveButton: {
    backgroundColor: '#1b7f5a',
  },
  cancelButton: {
    backgroundColor: '#ccc',
  },
  smallButtonText: {
    color: '#fff',
    fontWeight: '700',
  },
  
});
