import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {SettingsStackParams} from '../types/types';
import SettingsScreen from '../screens/SettingsScreen';
import SetCompIDScreen from '../screens/SetCompIDScreen';
import PickVoiceScreen from '../screens/PickVoiceScreen';
import EnterCompIDScreen from '../screens/EnterCompIDScreen';

const SettingsStack = createNativeStackNavigator<SettingsStackParams>();

export default function SettingsBottomSheet() {
  return (
    <SettingsStack.Navigator
      screenOptions={{
        headerShown: true,
      }}>
      <SettingsStack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{headerBackVisible: false}}
      />
      <SettingsStack.Screen name="SetCompanyId" component={SetCompIDScreen} />
      <SettingsStack.Screen name="PickVoice" component={PickVoiceScreen} />
      <SettingsStack.Screen
        name="EnterCompanyId"
        component={EnterCompIDScreen}
      />
    </SettingsStack.Navigator>
  );
}
