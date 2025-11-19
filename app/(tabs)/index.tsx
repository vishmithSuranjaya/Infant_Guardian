import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Dimensions, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
// ThemeContext removed — app uses system color scheme only

const { width } = Dimensions.get('window');

export default function MainScreen() {
  const [fanOn, setFanOn] = useState(false);
  const [cotMobileOn, setCotMobileOn] = useState(false);
  const cardBg = useThemeColor({}, 'background');
  const circleBg = useThemeColor({}, 'background');
  const panelBg = useThemeColor({}, 'card');
  const tint = useThemeColor({}, 'tint');
  return (
    <ThemedView style={styles.container}>
      {/* theme toggle removed; app follows system theme */}
      <View style={styles.centerContent}>
        <ThemedText type="title" style={styles.title} lightColor="#fff">
          InfantGuardian
        </ThemedText>
        <View style={[styles.card, { backgroundColor: panelBg }]}>
          <View style={styles.circleImageWrap}>
            <View style={[styles.circleBorder, { backgroundColor: "#ffffff" }] }>
              <Image
                source={require('@/assets/images/baby_main_page.png')}
                style={[styles.circleImage, { backgroundColor: panelBg }]}
                resizeMode="contain"
              />
            </View>
          </View>

          <View style={[styles.statusPanel, { backgroundColor: panelBg }]}> 
            <ThemedText style={styles.statusText} type="subtitle">
              MONITORING ACTIVE
            </ThemedText>
            <View style={styles.statusRow}>
              <View style={styles.statusItem}>
                <MaterialCommunityIcons name="thermometer" size={22} color="#e57373" style={{marginRight: 4}} />
                <ThemedText style={styles.tempText}>
                  6.7°C
                </ThemedText>
                <ThemedText style={styles.statusLabel}>Temperature</ThemedText>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.controlRow}>
          <TouchableOpacity
            style={[styles.controlButton, fanOn && styles.controlButtonActive]}
            onPress={() => setFanOn(v => !v)}
            activeOpacity={0.85}
          >
            <MaterialCommunityIcons name="fan" size={22} color={fanOn ? '#1b7f5a' : '#888'} style={{marginRight: 8}} />
            <ThemedText style={[styles.controlButtonText, fanOn && styles.controlButtonTextActive]}>
              Fan {fanOn ? 'ON' : 'OFF'}
            </ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.controlButton, cotMobileOn && styles.controlButtonActive]}
            onPress={() => setCotMobileOn(v => !v)}
            activeOpacity={0.85}
          >
            <FontAwesome5 name="baby" size={20} color={cotMobileOn ? '#1b7f5a' : '#888'} style={{marginRight: 8}} />
            <ThemedText style={[styles.controlButtonText, cotMobileOn && styles.controlButtonTextActive]}>
              Cot Mobile {cotMobileOn ? 'ON' : 'OFF'}
            </ThemedText>
          </TouchableOpacity>
        </View>
      </View>
    </ThemedView>
  );
}

const CARD_WIDTH = Math.min(360, width - 32);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerContent: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 108,
    marginTop: -68,
    alignSelf: 'flex-start',
    marginLeft: 24,
  },
  card: {
    width: CARD_WIDTH,
    borderRadius: 28,
    alignItems: 'center',
    paddingVertical: 28,
    paddingHorizontal: 16,
    shadowColor: '#000', // changed the color
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  controlRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 48,
  // removed
    borderRadius: 22,
    paddingVertical: 12,
    paddingHorizontal: 22,
    marginHorizontal: 4,
  },
  controlButton: {
    borderRadius: 22,
    paddingVertical: 12,
    paddingHorizontal: 22,
    marginHorizontal: 4,
    backgroundColor: '#f5f5f5',
    flexDirection: 'row',
    alignItems: 'center',
  },
  controlButtonActive: {
    backgroundColor: '#b2dfdb',
  },
  controlButtonText: {
    fontWeight: '600',
    fontSize: 16,
  },
  controlButtonTextActive: {
    color: '#1b7f5a',
  },
  circleImageWrap: {
    marginBottom: 18,
  },
  circleBorder: {
    borderWidth: 6,
    borderColor: '#4caf50',
    borderRadius: 100,
    padding: 6,
    backgroundColor: '#fff',
  },
  circleImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#fff',
  },
  statusText: {
    fontWeight: '700',
    fontSize: 20,
    marginBottom: 18,
    textAlign: 'center',
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 24,
  },
  statusPanel: {
    width: '92%',
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 10,
    alignItems: 'center',
    marginBottom: 12,
  },
  statusItem: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    maxWidth: 160,
  },
  cryingText: {
    fontWeight: '700',
    color: '#e57373',
    fontSize: 18,
    marginRight: 4,
  },
  statusLabel: {
    fontSize: 13,
    color: '#888',
    marginLeft: 2,
  },
  // deviceButton and deviceButtonText removed
  tempText: {
    fontWeight: '700',
    color: '#e57373',
    fontSize: 18,
    marginRight: 4,
  },
  
});
