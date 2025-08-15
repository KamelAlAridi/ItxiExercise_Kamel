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
    </GestureHandlerRootView>
  );
}

export default App;
