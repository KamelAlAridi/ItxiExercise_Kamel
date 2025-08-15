import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {OnboardingStackParams} from '../types/types';
import {LinearGradient} from 'react-native-linear-gradient';

type Props = NativeStackScreenProps<OnboardingStackParams, 'Welcome'>;

export default function WelcomeScreen({navigation}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.background}>
        <View style={styles.gradientCircle} />
        <View style={[styles.gradientCircle, styles.bottomCircle]} />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Welcome</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('EnterCompanyId')}>
          <LinearGradient
            colors={['#667eea', '#764ba2']}
            style={styles.gradient}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}>
            <Text style={styles.buttonText}>Get Started</Text>
          </LinearGradient>
        </TouchableOpacity>
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
  button: {
    width: 280,
    borderRadius: 30,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#764ba2',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  gradient: {
    paddingVertical: 16,
    paddingHorizontal: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
    letterSpacing: 1,
  },
});
