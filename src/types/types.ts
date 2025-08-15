import {NavigatorScreenParams} from '@react-navigation/native';

export type OnboardingStackParams = {
  Welcome: undefined;
  EnterCompanyId: undefined;
  PickVoice: undefined;
};

export type RootStackParams = {
  Splash: undefined;
  OnboardingStack: NavigatorScreenParams<OnboardingStackParams>;
  MainStack: undefined;
  VoicebotModal: undefined;
  SettingsStack: NavigatorScreenParams<SettingsStackParams>;
};

export type SettingsStackParams = {
  Settings: undefined;
  SetCompanyId: undefined;
  EnterCompanyId: undefined;
  PickVoice: undefined;
};
