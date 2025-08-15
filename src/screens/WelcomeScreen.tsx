import {View, StyleSheet, Text} from 'react-native';
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {OnboardingStackParams} from '../types/types';
import GradientButton from '../components/GradientButton';
import GradientCircles from '../components/GradientCircles';

type Props = NativeStackScreenProps<OnboardingStackParams, 'Welcome'>;

export default function WelcomeScreen({navigation}: Props) {
  function handlePress(): void {
    navigation.navigate('EnterCompanyId');
  }
  return (
    <View style={styles.container}>
      <GradientCircles />

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
