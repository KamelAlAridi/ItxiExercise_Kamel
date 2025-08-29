import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import React, {useRef} from 'react';
import {
  DeviceEventEmitter,
  Linking,
  SafeAreaView,
  StatusBar,
  useColorScheme,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import SplashScreen from './src/screens/SplashScreen';

import {LinkingOptions, NavigationContainer} from '@react-navigation/native';
import {RootStackParams} from './src/types/types';

import MainScreen from './src/screens/MainScreen';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import OnboardingStackScreen from './src/navigation/OnboardingStack';
import VoicebotScreen from './src/screens/VoicebotScreen';

const RootStack = createStackNavigator<RootStackParams>();

const linking: LinkingOptions<RootStackParams> = {
  prefixes: ['itxiexercise://'],
  config: {
    screens: {
      Splash: 'splash',
      OnboardingStack: 'onboarding',
      MainStack: 'main',
    },
  },
};

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const navigationRef = useRef<any>(null);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  const handleNavReady = async () => {
    const url = await Linking.getInitialURL();
    if (url?.includes('set-company-id')) {
      navigationRef.current?.navigate('MainStack');

      setTimeout(() => {
        DeviceEventEmitter.emit('coldDeepLink', url);
      }, 100);
    }
  };

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaView style={backgroundStyle}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <NavigationContainer
          linking={linking}
          ref={navigationRef}
          onReady={handleNavReady}>
          <RootStack.Navigator>
            <RootStack.Screen
              name="Splash"
              component={SplashScreen}
              options={{headerShown: false}}
            />
            <RootStack.Screen
              name="OnboardingStack"
              component={OnboardingStackScreen}
              options={{
                headerShown: false,
              }}
            />
            <RootStack.Screen name="MainStack" component={MainScreen} />
            <RootStack.Screen
              name="VoicebotModal"
              component={VoicebotScreen}
              options={{
                headerTitle: 'Voice bot',
                //fix
              }}
            />
          </RootStack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

export default App;
