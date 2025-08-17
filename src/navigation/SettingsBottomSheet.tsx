import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import {SettingsStackParams} from '../types/types';
import SettingsScreen from '../screens/SettingsScreen';
import SetCompIDScreen from '../screens/SetCompIDScreen';
import PickVoiceScreen from '../screens/PickVoiceScreen';
import EnterCompIDScreen from '../screens/EnterCompIDScreen';
import {NavigationContainer} from '@react-navigation/native';

import {createNavigationContainerRef} from '@react-navigation/native';
export const settingsNavigationRef =
  createNavigationContainerRef<SettingsStackParams>();

const SettingsStack = createNativeStackNavigator<SettingsStackParams>();

type Props = {
  onNavReady?: () => void;
};

export default function SettingsBottomSheet({onNavReady}: Props) {
  useEffect(() => {
    onNavReady?.();
  }, []);

  return (
    <NavigationContainer ref={settingsNavigationRef} independent={true}>
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
    </NavigationContainer>
  );
}
