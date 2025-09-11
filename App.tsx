// App.tsx
import {createStackNavigator} from '@react-navigation/stack';
import React, {useEffect, useRef, useState} from 'react';
import {Linking, SafeAreaView, StatusBar, useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import SplashScreen from './src/screens/SplashScreen';
import {CommonActions, NavigationContainer} from '@react-navigation/native';
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

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const navigationRef = useRef<any>(null);
  const [loading, setLoading] = useState(true);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  useEffect(() => {
    let mounted = true;
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
          if (!mounted) return;
          navigationRef.current?.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: nextRoute, params}],
            }),
          );
          setLoading(false);
        }, 2000);
      } catch (error) {
        console.log('Init error', error);
        setLoading(false);
      }
    };

    init();
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    const handleUrl = (incomingUrl: string | null) => {
      if (!incomingUrl) return;

      if (incomingUrl.includes('set-company-id')) {
        const state = navigationRef.current?.getRootState?.();
        const hasMain =
          state?.routes?.some((r: any) => {
            return r.name === 'MainStack';
          }) ?? false;

        const params = {openSettingsOnStart: true, deepLink: incomingUrl};

        if (hasMain) {
          navigationRef.current?.navigate('MainStack' as any, params);
        } else {
          navigationRef.current?.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: 'MainStack', params}],
            }),
          );
        }
      }
    };

    const subscription = Linking.addEventListener('url', event => {
      handleUrl(event.url);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaView style={backgroundStyle}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <NavigationContainer ref={navigationRef}>
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
                options={{headerShown: false}}
              />
              <RootStack.Screen name="MainStack" component={MainScreen} />
              <RootStack.Screen
                name="VoicebotModal"
                component={VoicebotScreen}
                options={{headerTitle: 'Voice bot', animationEnabled: false}}
              />
            </RootStack.Navigator>
          </BottomSheetModalProvider>
        </NavigationContainer>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

export default App;
