import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import SplashScreen from './src/screens/SplashScreen';

import {NavigationContainer} from '@react-navigation/native';
import {RootStackParams} from './src/types/types';

import MainScreen from './src/screens/MainScreen';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import OnboardingStackScreen from './src/navigation/OnboardingStack';
import VoicebotScreen from './src/screens/VoicebotScreen';
import PickVoiceScreen from './src/screens/PickVoiceScreen';

const RootStack = createNativeStackNavigator<RootStackParams>();

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaView style={backgroundStyle}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <NavigationContainer>
          <RootStack.Navigator>
            <RootStack.Screen
              name="Splash"
              component={SplashScreen}
              options={{headerShown: false}}
            />
            <RootStack.Screen
              name="OnboardingStack"
              component={OnboardingStackScreen}
              options={{headerShown: false}}
            />
            <RootStack.Screen
              name="PickVoice"
              component={PickVoiceScreen}
              options={{
                title: 'Select Voice',
                headerBackTitle: 'Back',
                presentation: 'modal',
                animation: 'slide_from_bottom',
              }}
            />
            <RootStack.Screen name="MainStack" component={MainScreen} />
            <RootStack.Screen
              name="VoicebotModal"
              component={VoicebotScreen}
              options={{
                headerTitle: 'Voice bot',
                presentation: 'modal',
                animation: 'none',
              }}
            />
          </RootStack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

export default App;
