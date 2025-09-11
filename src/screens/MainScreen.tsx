// MainScreen.tsx
import {View, Text, TouchableOpacity, Platform, StyleSheet} from 'react-native';
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {RootStackParams, SettingsStackParams} from '../types/types';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
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
  const bottomSheetModalRef = useRef<BottomSheetModal | null>(null);
  const snapPoints = useMemo(() => ['95%'], []);

  const openSettingsOnStart = route.params?.openSettingsOnStart === true;

  const [sheetClosed, setSheetClosed] = useState<boolean>(true);

  const navigateToSetCompanyId = useCallback(() => {
    const tryNav = () => {
      if (settingsNavigationRef.current) {
        settingsNavigationRef.current.navigate('SetCompanyId');
        setSheetClosed(false);
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

  const safePresent = useCallback(() => {
    if (bottomSheetModalRef.current?.present) {
      bottomSheetModalRef.current.present();
      setSheetClosed(false);
    }
  }, []);

  useEffect(() => {
    if (openSettingsOnStart) {
      safePresent();
      setTimeout(() => {
        navigateToSetCompanyId();
      }, 300);

      navigation.setParams({
        openSettingsOnStart: undefined,
        deepLink: undefined,
      });
    }
  }, [openSettingsOnStart, navigation, navigateToSetCompanyId, safePresent]);

  const handleOpenSettings = useCallback(() => {
    safePresent();
  }, [safePresent]);

  const handleDismiss = useCallback(() => {
    setSheetClosed(true);
  }, []);

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

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        pressBehavior="close"
      />
    ),
    [],
  );

  const handleCloseBottomSheet = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
  }, []);

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

      <BottomSheetModal
        ref={bottomSheetModalRef}
        snapPoints={snapPoints}
        onDismiss={handleDismiss}
        backdropComponent={renderBackdrop}
        enablePanDownToClose
        enableContentPanningGesture
        backgroundStyle={styles.bottomSheetBackground}
        handleIndicatorStyle={styles.bottomSheetHandle}>
        <BottomSheetView style={styles.bottomSheetContent}>
          <SettingsBottomSheet onCloseBottomSheet={handleCloseBottomSheet} />
        </BottomSheetView>
      </BottomSheetModal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#F9FAFB'},
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
  settingsButton: {marginLeft: 15},
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
  bottomSheetContent: {flex: 1},
});
