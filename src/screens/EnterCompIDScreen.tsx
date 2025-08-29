import {View, Text, StyleSheet, Alert, TextInput} from 'react-native';
import React, {useState} from 'react';
import {OnboardingStackParams, SettingsStackParams} from '../types/types';
import {getDBConnection, addCompany} from '../services/database';
import {CompositeScreenProps} from '@react-navigation/native';
import GradientCircles from '../components/GradientCircles';
import GradientButton from '../components/GradientButton';
import {StackScreenProps} from '@react-navigation/stack';

type Props = CompositeScreenProps<
  StackScreenProps<OnboardingStackParams, 'EnterCompanyId'>,
  StackScreenProps<SettingsStackParams, 'EnterCompanyId'>
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
      navigation.push('PickVoice');
    } else {
      setMessage('Company Id added');
      setCompanyId('');
    }
  };

  return (
    <View style={styles.container}>
      <GradientCircles />
      <View style={styles.content}>
        <Text style={styles.title}>
          {fromSettings ? 'Add New Company' : 'Enter Company ID'}
        </Text>
        {message ? (
          <Text style={styles.message}>{message}</Text>
        ) : (
          <Text style={styles.subtitle}>Format: ABC-1234</Text>
        )}
        <TextInput
          style={styles.input}
          placeholder="Company ID (e.g. ABC-1234)"
          placeholderTextColor="#A0AEC0"
          autoCapitalize="characters"
          value={companyId}
          onChangeText={(text: string) => setCompanyId(text)}
        />
        <GradientButton
          text={fromSettings ? 'Add Company ID' : 'Continue'}
          onpress={handleContinue}
        />
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
    letterSpacing: 0.8,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '300',
    color: '#718096',
    textAlign: 'center',
    marginBottom: 32,
  },
  message: {
    fontSize: 16,
    fontWeight: '400',
    color: '#48BB78',
    textAlign: 'center',
    marginBottom: 32,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 40,
    backgroundColor: '#FFFFFF',
    fontSize: 16,
    color: '#1A202C',
    textAlign: 'center',
    letterSpacing: 1,
  },
});
