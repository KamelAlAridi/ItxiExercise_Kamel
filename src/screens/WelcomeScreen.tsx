import {View, StyleSheet, Text} from 'react-native';
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {OnboardingStackParams} from '../types/types';
import GradientButton from '../components/GradientButton';

type Props = NativeStackScreenProps<OnboardingStackParams, 'Welcome'>;

export default function WelcomeScreen({navigation}: Props) {
  function handlePress(): void {
    navigation.navigate('EnterCompanyId');
  }
  return (
    <View style={styles.container}>
      <View style={styles.background}>
        <View style={styles.gradientCircle} />
        <View style={[styles.gradientCircle, styles.bottomCircle]} />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Welcome</Text>
        <GradientButton text="Get Started" onpress={handlePress} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
  gradientCircle: {
    position: 'absolute',
    width: 400,
    height: 400,
    borderRadius: 200,
    backgroundColor: 'rgba(102, 126, 234, 0.05)',
    top: -100,
    left: -100,
  },
  bottomCircle: {
    top: 'auto',
    left: 'auto',
    bottom: -150,
    right: -150,
    backgroundColor: 'rgba(118, 75, 162, 0.03)',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  title: {
    fontSize: 36,
    fontWeight: '300',
    color: '#2D3748',
    marginBottom: 16,
    letterSpacing: 1.2,
  },
});
