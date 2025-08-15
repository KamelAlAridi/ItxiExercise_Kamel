import {View, Text, TouchableOpacity, Platform, Button} from 'react-native';
import React, {useCallback, useLayoutEffect, useMemo, useRef} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParams} from '../types/types';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import Icon from 'react-native-vector-icons/Ionicons';
import SettingsBottomSheet from '../navigation/SettingsBottomSheet';

type Props = NativeStackScreenProps<RootStackParams, 'MainStack'>;

export default function MainScreen({navigation}: Props) {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['50%', '95%'], []);

  const handleOpenSettings = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);

  const HeaderLeftButton = useCallback(
    () => (
      <TouchableOpacity onPress={handleOpenSettings} activeOpacity={0.7}>
        <Icon name="settings-outline" size={24} color="#007AFF" />
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
        backgroundColor: '#ffffff',
        ...(Platform.OS === 'android' && {elevation: 0}),
      },
      headerTitleStyle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333333',
      },
      headerLeft: HeaderLeftButton,
    });
  }, [navigation, HeaderLeftButton]);

  return (
    <View style={{flex: 1}}>
      <Text>MainScreen</Text>
      <Button
        title="Voice Bot"
        onPress={() => navigation.navigate('VoicebotModal')}
      />
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose>
        <BottomSheetView style={{flex: 1}}>
          <SettingsBottomSheet />
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
}
