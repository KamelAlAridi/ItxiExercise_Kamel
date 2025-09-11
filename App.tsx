import {createStackNavigator} from '@react-navigation/stack';
import React, {useEffect, useRef, useState} from 'react';
import {Linking, SafeAreaView, StatusBar, useColorScheme} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import SplashScreen from './src/screens/SplashScreen';

import {
  CommonActions,
  LinkingOptions,
  NavigationContainer,
} from '@react-navigation/native';
import {RootStackParams} from './src/types/types';

import MainScreen from './src/screens/MainScreen';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import OnboardingStackScreen from './src/navigation/OnboardingStack';
import VoicebotScreen from './src/screens/VoicebotScreen';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {
  createTables,
  getCompanies,
  getDBConnection,
} from './src/services/database';

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

  const [loading, setLoading] = useState(true);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  useEffect(() => {
    const init = async () => {
      try {
        const db = await getDBConnection();
        await createTables(db);
        const companies = await getCompanies(db);

        let nextRoute: keyof RootStackParams =
          companies.length > 0 ? 'MainStack' : 'OnboardingStack';
        let params: any = {};

        const url = await Linking.getInitialURL();
        if (url && url.includes('set-company-id')) {
          nextRoute = 'MainStack';
          params = {openSettingsOnStart: true, deepLink: url};
        }

        setTimeout(() => {
          navigationRef.current?.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: nextRoute, params}],
            }),
          );
          setLoading(false);
        }, 3000);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    init();
  }, []);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaView style={backgroundStyle}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <NavigationContainer linking={linking} ref={navigationRef}>
          <BottomSheetModalProvider>
            <RootStack.Navigator>
              {loading && (
                <RootStack.Screen
                  name="Splash"
                  component={SplashScreen}
                  options={{headerShown: false}}
                />
              )}
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
                  animationEnabled: false,
                }}
              />
            </RootStack.Navigator>
          </BottomSheetModalProvider>
        </NavigationContainer>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

export default App;
