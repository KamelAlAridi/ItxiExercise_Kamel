import {View, StyleSheet} from 'react-native';
import React from 'react';
import {SettingsStackParams} from '../types/types';
import GradientCircles from '../components/GradientCircles';
import GradientButton from '../components/GradientButton';
import {StackScreenProps} from '@react-navigation/stack';

type Props = StackScreenProps<SettingsStackParams, 'Settings'>;

export default function SettingsScreen({navigation}: Props) {
  return (
    <View style={styles.container}>
      <GradientCircles />
      <View style={styles.content}>
        <GradientButton
          text="Set Company Id"
          onpress={() => navigation.navigate('SetCompanyId')}
        />
        <GradientButton
          text="Pick Voice"
          onpress={() => navigation.navigate('PickVoice', {fromSettings: true})}
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
    padding: 40,
  },
});
