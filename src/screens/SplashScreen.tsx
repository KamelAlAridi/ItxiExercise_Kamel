import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParams} from '../types/types';
import {useEffect} from 'react';
import {
  createTables,
  getCompanies,
  getDBConnection,
  //getVoice,
} from '../services/database';

type Props = NativeStackScreenProps<RootStackParams, 'Splash'>;

export default function SplashScreen({navigation}: Props) {
  useEffect(() => {
    const checkCompany = async () => {
      const startTime = Date.now();

      const db = await getDBConnection();
      await createTables(db);

      const companies = await getCompanies(db);
      //const voice = await getVoice(db);

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
      <View style={styles.background}>
        <View style={styles.gradientCircle} />
        <View style={[styles.gradientCircle, styles.bottomCircle]} />
      </View>
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
  background: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
  gradientCircle: {
    position: 'absolute',
    width: 400,
    height: 400,
    borderRadius: 200,
    backgroundColor: 'rgba(28, 56, 179, 0.05)',
    top: -100,
    left: -100,
  },
  bottomCircle: {
    top: 'auto',
    left: 'auto',
    bottom: -150,
    right: -150,
    backgroundColor: 'rgba(102, 126, 234, 0.03)',
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
