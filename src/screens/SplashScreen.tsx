import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import GradientCircles from '../components/GradientCircles';

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <GradientCircles />
      <View style={styles.content}>
        <Text style={styles.title}>Getting Started</Text>
        <ActivityIndicator size="large" color="#4A5568" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F9FAFB',
  },
  content: {
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: '300',
    color: '#2D3748',
    marginBottom: 48,
    letterSpacing: 1.5,
    textAlign: 'center',
  },
});
