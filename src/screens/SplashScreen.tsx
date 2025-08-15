import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParams} from '../types/types';
import React from 'react';
import {useEffect} from 'react';
import {
  createTables,
  getCompanies,
  getDBConnection,
} from '../services/database';
import GradientCircles from '../components/GradientCircles';

type Props = NativeStackScreenProps<RootStackParams, 'Splash'>;

export default function SplashScreen({navigation}: Props) {
  useEffect(() => {
    const checkCompany = async () => {
      const startTime = Date.now();

      const db = await getDBConnection();
      await createTables(db);

      const companies = await getCompanies(db);

      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, 3000 - elapsed);

      setTimeout(() => {
        if (companies.length > 0) {
          navigation.navigate('MainStack');
        } else {
          navigation.navigate('OnboardingStack');
        }
      }, remaining);
    };

    checkCompany();
  }, [navigation]);

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
