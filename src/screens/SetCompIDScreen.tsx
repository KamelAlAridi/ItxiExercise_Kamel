import {View, Text, Button} from 'react-native';
import React from 'react';
import {SettingsStackParams} from '../types/types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<SettingsStackParams, 'Settings'>;

export default function SetCompIDScreen({navigation}: Props) {
  return (
    <View>
      <Text>SetCompIDScreen</Text>
      <Button
        title="Enter company Id"
        onPress={() =>
          navigation.navigate('EnterCompanyId', {fromSettings: true})
        }
      />
    </View>
  );
}
