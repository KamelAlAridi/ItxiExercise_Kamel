import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  StyleSheet,
  Linking,
} from 'react-native';
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {RootStackParams, SettingsStackParams} from '../types/types';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import Icon from 'react-native-vector-icons/Ionicons';
import SettingsBottomSheet, {
  settingsNavigationRef,
} from '../navigation/SettingsBottomSheet';
import GradientCircles from '../components/GradientCircles';
import GradientButton from '../components/GradientButton';
import {CompositeScreenProps} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';

type Props = CompositeScreenProps<
  StackScreenProps<RootStackParams, 'MainStack'>,
  StackScreenProps<SettingsStackParams>
>;

export default function MainScreen({navigation, route}: Props) {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['100%'], []);

  const openSettingsOnStart = route.params?.openSettingsOnStart === true;

  const initialSheetIndexRef = useRef<number>(openSettingsOnStart ? 0 : -1);
  const [sheetIndex, setSheetIndex] = useState<number>(
    initialSheetIndexRef.current,
  );
  const [sheetClosed, setSheetClosed] = useState<boolean>(true);

  const navigateToSetCompanyId = useCallback(() => {
    const tryNav = () => {
      if (settingsNavigationRef.current) {
        settingsNavigationRef.current.navigate('SetCompanyId');
        return true;
      }
      return false;
    };
    if (!tryNav()) {
      const id = setInterval(() => {
        if (tryNav()) clearInterval(id);
      }, 50);
    }
  }, []);

  const coldHandledRef = useRef(false);
  useEffect(() => {
    if (openSettingsOnStart && !coldHandledRef.current && sheetIndex >= 0) {
      coldHandledRef.current = true;
      navigateToSetCompanyId();
      navigation.setParams({
        openSettingsOnStart: undefined,
        deepLink: undefined,
      });
    }
  }, [openSettingsOnStart, sheetIndex, navigateToSetCompanyId, navigation]);

  const handleWarmDeepLink = useCallback(
    (url: string | null) => {
      if (!url) return;
      if (url.includes('set-company-id')) {
        bottomSheetRef.current?.expand();
        navigateToSetCompanyId();
        navigation.setParams({
          openSettingsOnStart: undefined,
          deepLink: undefined,
        });
      }
    },
    [navigateToSetCompanyId, navigation],
  );

  useEffect(() => {
    const sub = Linking.addEventListener('url', e => handleWarmDeepLink(e.url));
    return () => sub.remove();
  }, [handleWarmDeepLink]);

  const handleOpenSettings = useCallback(() => {
    bottomSheetRef.current?.expand();
    setSheetClosed(false);
  }, []);

  const handleSheetChange = (index: number) => {
    setSheetIndex(index);
    if (index === -1) {
      setSheetClosed(true);
    }
  };

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
      headerLeft: sheetClosed ? HeaderLeftButton : () => <></>,
    });
  }, [navigation, HeaderLeftButton, sheetClosed]);

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
        index={initialSheetIndexRef.current}
        onChange={handleSheetChange}
        snapPoints={snapPoints}
        enablePanDownToClose
        backgroundStyle={styles.bottomSheetBackground}
        handleIndicatorStyle={styles.bottomSheetHandle}>
        <BottomSheetView style={styles.bottomSheetContent}>
          <SettingsBottomSheet />
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
