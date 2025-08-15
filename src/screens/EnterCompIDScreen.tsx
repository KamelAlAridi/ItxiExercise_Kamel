import {View, Text, StyleSheet, Button, Alert, TextInput} from 'react-native';
import React, {useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {OnboardingStackParams} from '../types/types';
import {getDBConnection, saveCompanyVoice} from '../services/database';

type Props = NativeStackScreenProps<OnboardingStackParams, 'EnterCompanyId'>;

export default function EnterCompIDScreen({navigation}: Props) {
  const [companyId, setCompanyId] = useState<string>('');

  const companyIdPattern: RegExp = /^[A-Z]{3}-\d{4}$/;

  const handleContinue = async (): Promise<void> => {
    const trimmedId: string = companyId.trim();

    if (!companyIdPattern.test(trimmedId)) {
      Alert.alert('Please enter a valid company ID (e.g. ABC-1234)');
      return;
    }

    const db = await getDBConnection();
    await saveCompanyVoice(db, companyId, '');
    navigation.navigate('PickVoice');
  };

  return (
    <View style={styles.container}>
      <Text>Enter Company ID</Text>
      <TextInput
        placeholder="Company ID (e.g. ABC-1234)"
        autoCapitalize="characters"
        value={companyId}
        onChangeText={(text: string) => setCompanyId(text)}
      />
      <Button title="Continue" onPress={handleContinue} />
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
