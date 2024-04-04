import {TouchableOpacity, View} from 'react-native';
import {Icon, IconButton, Text} from 'react-native-paper';
import {NavigateProps} from '../interfaces/stack';
import {style} from '../styles';

export default function HomeHeader({
  navigate,
  currentLocation,
  reloadLocation,
  isLoading,
}: {
  navigate: NavigateProps;
  currentLocation: {lat: number; long: number} | undefined;
  reloadLocation: () => void;
  isLoading: boolean;
}) {
  return (
    <View
      style={[
        style.container,
        {
          flexDirection: 'row',
          gap: 5,
        },
      ]}>
      <View
        style={{flex: 1, flexDirection: 'row', gap: 5, alignItems: 'center'}}>
        <TouchableOpacity onPress={() => reloadLocation()}>
          <Icon source="reload" size={30} />
        </TouchableOpacity>
        {currentLocation && isLoading === false && (
          <Text>
            {currentLocation.lat}, {currentLocation.long}
          </Text>
        )}
        {isLoading && <Text>Loading location ...</Text>}
      </View>
      <IconButton
        icon="cog"
        onPress={() => navigate.navigation.navigate('Setting')}
      />
    </View>
  );
}
