import {View, Text, Button, StyleSheet, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {OnboardingStackParams, RootStackParams} from '../types/types';
import {CompositeScreenProps} from '@react-navigation/native';
import {getDBConnection, setVoice, getVoice} from '../services/database';
import {Picker} from '@react-native-picker/picker';
import GradientCircles from '../components/GradientCircles';
import GradientButton from '../components/GradientButton';

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
    <View style={styles.container}>
      <GradientCircles />
      <View style={styles.content}>
        <Text style={styles.title}>Pick a Voice</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedVoice}
            onValueChange={(item: string) => handleSaveVoice(item)}
            style={styles.picker}
            dropdownIconColor="#667eea"
            mode="dropdown">
            <Picker.Item
              label="select voice"
              value=""
              style={styles.pickerItem}
            />
            <Picker.Item
              label="Voice 1"
              value="Voice 1"
              style={styles.pickerItem}
            />
            <Picker.Item
              label="Voice 2"
              value="Voice 2"
              style={styles.pickerItem}
            />
            <Picker.Item
              label="Voice 3"
              value="Voice 3"
              style={styles.pickerItem}
            />
            <Picker.Item
              label="Voice 4"
              value="Voice 4"
              style={styles.pickerItem}
            />
          </Picker>
        </View>
        {!fromSettings && (
          <GradientButton
            text="Continue"
            onpress={() => navigation.navigate('MainStack')}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '300',
    color: '#2D3748',
    marginBottom: 8,
    textAlign: 'center',
  },
  pickerContainer: {
    borderWidth: 1,
    width: '100%',
    marginVertical: 40,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  picker: {
    height: 52,
    width: '100%',
    color: '#1A202C',
  },
  pickerItem: {
    fontSize: 16,
    color: '#1A202C',
  },
});
