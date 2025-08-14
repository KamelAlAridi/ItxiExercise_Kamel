import {View, Text, Button, StyleSheet} from 'react-native';
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {OnboardingStackParams, RootStackParams} from '../types/types';
import {CompositeScreenProps} from '@react-navigation/native';

type Props = CompositeScreenProps<
  NativeStackScreenProps<OnboardingStackParams, 'PickVoice'>,
  NativeStackScreenProps<RootStackParams>
>;

export default function PickVoiceScreen({navigation}: Props) {
  return (
    <View>
      <Text>PickVoiceScreen</Text>
      <Button
        title="Dismiss"
        onPress={() => navigation.navigate('MainStack')}
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
