import WelcomeScreen from '../screens/WelcomeScreen';
import EnterCompIDScreen from '../screens/EnterCompIDScreen';
import PickVoiceScreen from '../screens/PickVoiceScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {OnboardingStackParams} from '../types/types';
import React from 'react';

const OnboardingStack = createNativeStackNavigator<OnboardingStackParams>();

export default function OnboardingStackScreen() {
  return (
    <OnboardingStack.Navigator initialRouteName="Welcome">
      <OnboardingStack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{headerBackVisible: false, headerShown: false}}
      />
      <OnboardingStack.Screen
        name="EnterCompanyId"
        component={EnterCompIDScreen}
        options={{title: 'Enter Company ID'}}
      />
    </OnboardingStack.Navigator>
  );
}
