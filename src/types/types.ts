import {NavigatorScreenParams} from '@react-navigation/native';

export type OnboardingStackParams = {
  Welcome: undefined;
  EnterCompanyId: {fromSettings?: boolean} | undefined;
  PickVoice: {fromSettings?: boolean} | undefined;
};

export type RootStackParams = {
  Splash: undefined;
  OnboardingStack: NavigatorScreenParams<OnboardingStackParams>;
  MainStack: {openSettingsOnStart?: boolean; deepLink?: string} | undefined;
  VoicebotModal: undefined;

  SettingsStack: NavigatorScreenParams<SettingsStackParams>;
};

export type SettingsStackParams = {
  Settings: undefined;
  SetCompanyId: undefined;
  EnterCompanyId: {fromSettings?: boolean} | undefined;
  PickVoice: {fromSettings?: boolean} | undefined;
};
