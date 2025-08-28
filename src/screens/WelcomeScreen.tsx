import {View, StyleSheet, Text} from 'react-native';
import React from 'react';
import {OnboardingStackParams} from '../types/types';
import GradientButton from '../components/GradientButton';
import GradientCircles from '../components/GradientCircles';
import {StackScreenProps} from '@react-navigation/stack';

type Props = StackScreenProps<OnboardingStackParams, 'Welcome'>;

export default function WelcomeScreen({navigation}: Props) {
  return (
    <View style={styles.container}>
      <GradientCircles />

      <View style={styles.content}>
        <Text style={styles.title}>Welcome</Text>
        <GradientButton
          text="Get Started"
          onpress={() => navigation.push('EnterCompanyId')}
        />
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
