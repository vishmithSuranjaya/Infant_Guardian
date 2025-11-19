import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const tabBackground = Colors[(colorScheme as 'light' | 'dark') ?? 'light'].background;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          backgroundColor: tabBackground,
          borderTopWidth: 0,
          opacity: 1,
          elevation: 0,
          shadowColor: 'transparent',
          height: 64,
          position: 'absolute',
          bottom: 28,
          left: 12,
          right: 12,
          borderRadius: 16,
          paddingBottom: 6,
        },
        tabBarActiveTintColor: '#ffffff',
        tabBarInactiveTintColor: 'rgba(255,255,255,0.7)',
        tabBarLabelStyle: { color: '#ffffff' },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            <IconSymbol size={28} name="house.fill" color={focused ? '#ffffff' : 'rgba(255,255,255,0.7)'} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Events',
          tabBarIcon: ({ focused }) => (
            <IconSymbol size={28} name="calendar" color={focused ? '#ffffff' : 'rgba(255,255,255,0.7)'} />
          ),
        }}
      />
    </Tabs>
  );
}
