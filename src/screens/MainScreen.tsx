import {View, Text} from 'react-native';
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParams} from '../types/types';

type Props = NativeStackScreenProps<RootStackParams, 'MainStack'>;

export default function MainScreen({navigation}: Props) {
  return (
    <View>
      <Text>MainScreen</Text>
    </View>
  );
}
