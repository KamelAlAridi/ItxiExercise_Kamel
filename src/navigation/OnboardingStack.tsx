import WelcomeScreen from '../screens/WelcomeScreen';
import EnterCompIDScreen from '../screens/EnterCompIDScreen';
import PickVoiceScreen from '../screens/PickVoiceScreen';
import {
  CardStyleInterpolators,
  createStackNavigator,
  TransitionSpecs,
} from '@react-navigation/stack';
import {OnboardingStackParams} from '../types/types';
import React from 'react';

const OnboardingStack = createStackNavigator<OnboardingStackParams>();

export default function OnboardingStackScreen() {
  return (
    <OnboardingStack.Navigator
      initialRouteName="Welcome"
      screenOptions={{
        gestureDirection: 'vertical',
        ...TransitionSpecs.TransitionIOSSpec,
      }}>
      <OnboardingStack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{headerShown: false}}
      />
      <OnboardingStack.Screen
        name="EnterCompanyId"
        component={EnterCompIDScreen}
        options={{title: 'Enter Company ID'}}
      />
      <OnboardingStack.Screen
        name="PickVoice"
        component={PickVoiceScreen}
        options={{
          title: 'Select Voice',
          headerBackTitle: 'Back',
          gestureEnabled: false,
          animationEnabled: false,
          cardStyleInterpolator: CardStyleInterpolators.forNoAnimation,
        }}
      />
    </OnboardingStack.Navigator>
  );
}
