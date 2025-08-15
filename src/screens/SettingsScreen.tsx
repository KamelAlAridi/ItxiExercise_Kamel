import {View, Text, Button} from 'react-native';
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {SettingsStackParams} from '../types/types';

type Props = NativeStackScreenProps<SettingsStackParams, 'Settings'>;

export default function SettingsScreen({navigation}: Props) {
  return (
    <View>
      <Text>SettingsScreen</Text>
      <Button
        title="Set Company Id"
        onPress={() => navigation.navigate('SetCompanyId')}
      />
      <Button
        title="Pick Voice"
        onPress={() => navigation.navigate('PickVoice')}
      />
    </View>
  );
}
