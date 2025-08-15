import {View, Text, StyleSheet, Button, Alert, TextInput} from 'react-native';
import React, {useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {OnboardingStackParams, SettingsStackParams} from '../types/types';
import {getDBConnection, addCompany} from '../services/database';
import {CompositeScreenProps} from '@react-navigation/native';

type Props = CompositeScreenProps<
  NativeStackScreenProps<OnboardingStackParams, 'EnterCompanyId'>,
  NativeStackScreenProps<SettingsStackParams, 'EnterCompanyId'>
>;

export default function EnterCompIDScreen({navigation, route}: Props) {
  const [companyId, setCompanyId] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const companyIdPattern: RegExp = /^[A-Z]{3}-\d{4}$/;

  const fromSettings: boolean = route.params?.fromSettings === true;

  const handleContinue = async (): Promise<void> => {
    const trimmedId: string = companyId.trim();

    if (!companyIdPattern.test(trimmedId)) {
      Alert.alert('Please enter a valid company ID (e.g. ABC-1234)');
      return;
    }

    const db = await getDBConnection();
    const wasAdded = await addCompany(db, companyId);

    if (!wasAdded) {
      Alert.alert('This company ID already exists.');
      setMessage('');
      return;
    }

    if (!fromSettings) {
      navigation.navigate('PickVoice');
    } else {
      setMessage('Company Id added');
      setCompanyId('');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Enter Company ID</Text>
      <Text>{message}</Text>
      <TextInput
        placeholder="Company ID (e.g. ABC-1234)"
        autoCapitalize="characters"
        value={companyId}
        onChangeText={(text: string) => setCompanyId(text)}
      />
      <Button
        title={fromSettings ? 'Add Company ID' : 'Continue'}
        onPress={handleContinue}
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
