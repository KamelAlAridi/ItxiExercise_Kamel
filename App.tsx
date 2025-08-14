import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import SplashScreen from './src/screens/SplashScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';
import EnterCompIDScreen from './src/screens/EnterCompIDScreen';
import {NavigationContainer} from '@react-navigation/native';
import {OnboardingStackParams, RootStackParams} from './src/types/types';
import PickVoiceScreen from './src/screens/PickVoiceScreen';
import MainScreen from './src/screens/MainScreen';

const OnboardingStack = createNativeStackNavigator<OnboardingStackParams>();
const RootStack = createNativeStackNavigator<RootStackParams>();

function OnboardingStackScreen() {
  return (
    <OnboardingStack.Navigator initialRouteName="Welcome">
      <OnboardingStack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{headerBackVisible: false}}
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
        }}
      />
    </OnboardingStack.Navigator>
  );
}

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <NavigationContainer>
        <RootStack.Navigator screenOptions={{headerShown: false}}>
          <RootStack.Screen name="Splash" component={SplashScreen} />
          <RootStack.Screen
            name="OnboardingStack"
            component={OnboardingStackScreen}
          />
          <RootStack.Screen name="MainStack" component={MainScreen} />
        </RootStack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

export default App;
