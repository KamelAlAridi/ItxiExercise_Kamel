import {StyleSheet, Text, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParams} from '../types/types';
import {useEffect} from 'react';

type Props = NativeStackScreenProps<RootStackParams, 'Splash'>;

export default function SplashScreen({navigation}: Props) {
  useEffect(() => {
    const timer = setTimeout(
      () => navigation.navigate('OnboardingStack'),
      3000,
    );
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Splash Screen</Text>
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
