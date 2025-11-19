import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import React from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';

const { width } = Dimensions.get('window');

export default function LoadingScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title} lightColor="#ffffff">
        InfantGuardian
      </ThemedText>

      <View style={styles.imageWrap}>
        <Image
          source={require('../assets/images/onboarding_baby.png')}
          style={styles.image}
          resizeMode="contain"
        />
        <View style={styles.loadingWrap}>
          <ThemedText style={styles.loadingText} lightColor="#083f47">
            Loading...
          </ThemedText>
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingBottom: 40,
    // background is provided by ThemedView
  },
  title: {
    color: '#ffffff',
    fontSize: 36,
    fontWeight: '700',
  },
  imageWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    position: 'relative',
  },
  image: {
    width: Math.min(360, width - 60),
    height: Math.min(360, width - 60),
  },
  loadingWrap: {
    position: 'absolute',
    bottom: 12,
    left: '50%',
    transform: [{ translateX: -0.5 * (width * 0.8) }],
    width: '80%',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: 'rgba(255,255,255,0.55)',
    borderRadius: 30,
    zIndex: 2,
  },
  loadingText: {
    fontWeight: '700',
    color: '#083f47',
    fontSize: 18,
  },
});
