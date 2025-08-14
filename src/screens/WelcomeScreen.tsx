import {View, Button, StyleSheet} from 'react-native';
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {OnboardingStackParams} from '../types/types';

type Props = NativeStackScreenProps<OnboardingStackParams, 'Welcome'>;

export default function WelcomeScreen({navigation}: Props) {
  return (
    <View style={styles.container}>
      <Button
        title="Get Started"
        onPress={() => navigation.navigate('EnterCompanyId')}
      />
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
});
