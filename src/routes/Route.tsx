import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from '../interfaces/stack';
import HomeScreen from '../screens/HomeScreen';
import SettingScreen from '../screens/SettingScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Route() {
  return (
    <Stack.Navigator>
      {/* {routeList.map((item: StackInterface, key: number) => (
        <Stack.Screen key={key} name={item.name} component={item.component} />
      ))} */}

      {/* <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{headerTitle: props => <HomeHeader />}}
      /> */}
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Setting" component={SettingScreen} />
    </Stack.Navigator>
  );
}
