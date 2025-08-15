import {View, Text, Button, StyleSheet, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {OnboardingStackParams, RootStackParams} from '../types/types';
import {CompositeScreenProps} from '@react-navigation/native';
import {getDBConnection, setVoice, getVoice} from '../services/database';
import {Picker} from '@react-native-picker/picker';

type Props = CompositeScreenProps<
  NativeStackScreenProps<OnboardingStackParams, 'PickVoice'>,
  NativeStackScreenProps<RootStackParams>
>;

export default function PickVoiceScreen({navigation, route}: Props) {
  const [selectedVoice, setSelectedVoice] = useState<string>('');

  const fromSettings: boolean = route.params?.fromSettings === true;

  useEffect(() => {
    const loadVoice = async () => {
      const db = await getDBConnection();
      const savedVoice = await getVoice(db);
      if (savedVoice) {
        setSelectedVoice(savedVoice);
      }
    };

    loadVoice();
  }, []);

  const handleSaveVoice = async (Voice: string): Promise<void> => {
    setSelectedVoice(Voice);

    if (!Voice) {
      Alert.alert('Please select a Voice');
      return;
    }
    const db = await getDBConnection();
    await setVoice(db, Voice);
  };
  return (
    <View>
      <Text>Pick a Voice</Text>
      <Picker
        selectedValue={selectedVoice}
        onValueChange={(item: string) => handleSaveVoice(item)}>
        <Picker.Item label="select voice" value="" />
        <Picker.Item label="Voice 1" value="Voice 1" />
        <Picker.Item label="Voice 2" value="Voice 2" />
        <Picker.Item label="Voice 3" value="Voice 3" />
        <Picker.Item label="Voice 4" value="Voice 4" />
      </Picker>
      {fromSettings && (
        <Button
          title="Dismiss"
          onPress={() => navigation.navigate('MainStack')}
        />
      )}
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
