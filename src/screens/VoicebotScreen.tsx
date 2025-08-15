import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getDBConnection, getVoice} from '../services/database';
import GradientCircles from '../components/GradientCircles';

export default function VoicebotScreen() {
  const [voice, setVoice] = useState<string>('');

  useEffect(() => {
    const loadVoice = async (): Promise<void> => {
      const db = await getDBConnection();
      const voice = await getVoice(db);
      setVoice(voice);
    };
    loadVoice();
  }, []);

  return (
    <View style={styles.container}>
      <GradientCircles />
      <View style={styles.content}>
        <Text style={styles.title}>Voice used is: {voice}</Text>
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
    padding: 40,
  },
  title: {
    fontSize: 30,
    fontWeight: '300',
    color: '#2D3748',
    marginBottom: 16,
    letterSpacing: 1.2,
  },
});
