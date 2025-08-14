import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParams} from '../types/types';
import {useEffect} from 'react';
import {
  createTable,
  getCompanyVoice,
  getDBConnection,
} from '../services/database';

type Props = NativeStackScreenProps<RootStackParams, 'Splash'>;

export default function SplashScreen({navigation}: Props) {
  useEffect(() => {
    const checkCompany = async () => {
      const startTime = Date.now();

      const db = await getDBConnection();
      await createTable(db);

      const saved = await getCompanyVoice(db);

      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, 3000 - elapsed);

      setTimeout(() => {
        if (saved) {
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
      <Text style={styles.title}>Splash Screen</Text>
      <ActivityIndicator size="large" color="#000" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
  },
});
