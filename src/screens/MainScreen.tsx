import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  StyleSheet,
  Linking,
  DeviceEventEmitter,
} from 'react-native';
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParams, SettingsStackParams} from '../types/types';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import Icon from 'react-native-vector-icons/Ionicons';
import SettingsBottomSheet, {
  settingsNavigationRef,
} from '../navigation/SettingsBottomSheet';
import GradientCircles from '../components/GradientCircles';
import GradientButton from '../components/GradientButton';
import {CompositeScreenProps} from '@react-navigation/native';

type Props = CompositeScreenProps<
  NativeStackScreenProps<RootStackParams, 'MainStack'>,
  NativeStackScreenProps<SettingsStackParams>
>;

export default function MainScreen({navigation}: Props) {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['50%', '95%'], []);

  const [pendingDeepLink, setPendingDeepLink] = useState<string | null>(null);
  const [navReady, setNavReady] = useState<boolean>(false);

  const handleOpenSettings = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);

  const handleDeepLink = useCallback(
    (url: string | null) => {
      if (!url) return;
      if (url.includes('set-company-id')) {
        if (navReady) {
          bottomSheetRef.current?.expand();
          const interval = setInterval(() => {
            if (settingsNavigationRef.current) {
              settingsNavigationRef.current.navigate('SetCompanyId');
              clearInterval(interval);
            }
          }, 50);
        } else {
          setPendingDeepLink(url);
        }
      }
    },
    [navReady],
  );

  useEffect(() => {
    const subscription = Linking.addEventListener('url', event =>
      handleDeepLink(event.url),
    );
    const emitterSubscription = DeviceEventEmitter.addListener(
      'coldDeepLink',
      handleDeepLink,
    );

    Linking.getInitialURL().then(url => {
      if (url) handleDeepLink(url);
    });

    return () => {
      subscription.remove();
      emitterSubscription.remove();
    };
  }, [handleDeepLink]);

  useEffect(() => {
    if (navReady && pendingDeepLink) {
      handleDeepLink(pendingDeepLink);
      setPendingDeepLink(null);
    }
  }, [navReady, pendingDeepLink, handleDeepLink]);

  const HeaderLeftButton = useCallback(
    () => (
      <TouchableOpacity
        onPress={handleOpenSettings}
        activeOpacity={0.7}
        style={styles.settingsButton}>
        <Icon name="settings-outline" size={24} color="#667eea" />
      </TouchableOpacity>
    ),
    [handleOpenSettings],
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: 'Home',
      headerTitleAlign: 'center',
      headerStyle: {
        borderBottomWidth: 0,
        shadowColor: 'transparent',
        backgroundColor: '#ffffff',
        ...(Platform.OS === 'android' && {elevation: 0}),
      },
      headerTitleStyle: {
        fontSize: 18,
        fontWeight: '300',
        color: '#2D3748',
        letterSpacing: 0.5,
      },
      headerLeft: HeaderLeftButton,
    });
  }, [navigation, HeaderLeftButton]);

  return (
    <View style={styles.container}>
      <GradientCircles />
      <View style={styles.content}>
        <Text style={styles.description}>
          Tap below to start interacting with the voice assistant
        </Text>
        <GradientButton
          text="Launch Voicebot"
          onpress={() => navigation.navigate('VoicebotModal')}
        />
      </View>
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose
        backgroundStyle={styles.bottomSheetBackground}
        handleIndicatorStyle={styles.bottomSheetHandle}>
        <BottomSheetView style={styles.bottomSheetContent}>
          <SettingsBottomSheet onNavReady={() => setNavReady(true)} />
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  description: {
    fontSize: 18,
    fontWeight: '300',
    color: '#718096',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 26,
    maxWidth: 300,
  },
  settingsButton: {
    marginLeft: 15,
  },
  bottomSheetBackground: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  bottomSheetHandle: {
    backgroundColor: '#E2E8F0',
    width: 40,
    height: 4,
    borderRadius: 2,
  },
  bottomSheetContent: {
    flex: 1,
  },
});
