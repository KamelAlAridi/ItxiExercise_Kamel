import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {OnboardingStackParams} from '../types/types';

type Props = NativeStackScreenProps<OnboardingStackParams, 'EnterCompanyId'>;

export default function EnterCompIDScreen({navigation}: Props) {
  return (
    <View style={styles.container}>
      <Text>EnterCompIDScreen</Text>
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
