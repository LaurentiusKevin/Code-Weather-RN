import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: undefined;
  Setting: undefined;
};

export type NavigateProps = NativeStackScreenProps<
  RootStackParamList,
  'Home',
  'Setting'
>;

export interface StackInterface {
  name: string;
  component: () => JSX.Element;
}
