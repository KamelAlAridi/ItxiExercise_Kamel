import {createStackNavigator} from '@react-navigation/stack';
import React, {useEffect} from 'react';
import {SettingsStackParams} from '../types/types';
import SettingsScreen from '../screens/SettingsScreen';
import SetCompIDScreen from '../screens/SetCompIDScreen';
import PickVoiceScreen from '../screens/PickVoiceScreen';
import EnterCompIDScreen from '../screens/EnterCompIDScreen';
import {NavigationContainer} from '@react-navigation/native';

import {createNavigationContainerRef} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {BackHandler} from 'react-native';
export const settingsNavigationRef =
  createNavigationContainerRef<SettingsStackParams>();

const SettingsStack = createStackNavigator<SettingsStackParams>();

type Props = {
  onNavReady?: () => void;
  onCloseBottomSheet?: () => void;
};

export default function SettingsBottomSheet({
  onNavReady,
  onCloseBottomSheet,
}: Props) {
  useEffect(() => {
    onNavReady?.();
  }, []);

  useEffect(() => {
    const backAction = () => {
      const state = settingsNavigationRef.current?.getState();

      if (state && state.index === 0) {
        onCloseBottomSheet?.();
        return true;
      }

      return false;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [onCloseBottomSheet]);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer ref={settingsNavigationRef} independent={true}>
        <SettingsStack.Navigator
          screenOptions={{
            headerShown: true,
            gestureEnabled: true,
            gestureDirection: 'horizontal',
          }}>
          <SettingsStack.Screen
            name="Settings"
            component={SettingsScreen}
            options={{headerLeft: () => null, gestureEnabled: false}}
          />
          <SettingsStack.Screen
            name="SetCompanyId"
            component={SetCompIDScreen}
          />
          <SettingsStack.Screen
            name="PickVoice"
            component={PickVoiceScreen}
            options={{headerLeft: () => null}}
          />
          <SettingsStack.Screen
            name="EnterCompanyId"
            component={EnterCompIDScreen}
          />
        </SettingsStack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
