import {View, Text, StyleSheet, Alert, Animated} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {OnboardingStackParams, RootStackParams} from '../types/types';
import {getDBConnection, setVoice, getVoice} from '../services/database';
import {Picker} from '@react-native-picker/picker';
import GradientCircles from '../components/GradientCircles';
import GradientButton from '../components/GradientButton';
import {CompositeScreenProps} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import {Dimensions} from 'react-native';

type Props = CompositeScreenProps<
  StackScreenProps<OnboardingStackParams, 'PickVoice'>,
  StackScreenProps<RootStackParams>
>;

export default function PickVoiceScreen({navigation, route}: Props) {
  const [selectedVoice, setSelectedVoice] = useState<string>('');

  const fromSettings: boolean = route.params?.fromSettings === true;

  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;

  const openAnim = useRef(new Animated.Value(0)).current;
  const closeAnim = useRef(new Animated.Value(0)).current;
  const isClosingRef = useRef(false);

  useEffect(() => {
    Animated.timing(openAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [openAnim]);

  useEffect(() => {
    const beforeRemoveHandler = (e: any) => {
      if (isClosingRef.current) return;
      e.preventDefault();

      isClosingRef.current = true;
      navigation.dispatch(e.data.action);

      Animated.timing(closeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    };
    const unsubscribe = navigation.addListener(
      'beforeRemove',
      beforeRemoveHandler,
    );
    return unsubscribe;
  }, [navigation, closeAnim]);

  const runCloseAndThen = (cb?: () => void) => {
    if (isClosingRef.current) return;
    isClosingRef.current = true;

    if (cb) cb();
    else navigation.goBack();

    Animated.timing(closeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

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

  const translateX = openAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [width, 0],
  });

  const translateY = closeAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, height],
  });

  return (
    <Animated.View
      style={[styles.container, {transform: [{translateX}, {translateY}]}]}>
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
            text="Dismiss"
            onpress={() => {
              runCloseAndThen(() => navigation.navigate('MainStack'));
            }}
          />
        )}
      </View>
    </Animated.View>
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
