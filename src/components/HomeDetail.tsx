import {View, Text} from 'react-native';
import {style, colors} from '../styles';

export default function HomeDetail({
  wind,
  humidity,
  uvIndex,
  pressure,
  visibility,
  dewPoint,
}: {
  wind: string;
  humidity: string;
  uvIndex?: number;
  pressure: string;
  visibility: string;
  dewPoint: string;
}) {
  return (
    <View style={{flexDirection: 'column'}}>
      <View
        style={[
          style.box,
          {
            flexWrap: 'wrap',
            flexDirection: 'row',
            backgroundColor: colors.gray[400],
            justifyContent: 'space-between',
            gap: 5,
          },
        ]}>
        <Text style={[style.mainText]}>Wind: {wind}</Text>
        <Text style={[style.mainText]}>Humidity: {humidity}</Text>
        <Text style={[style.mainText]}>UV index: {uvIndex}</Text>
        <Text style={[style.mainText]}>Pressure: {pressure}</Text>
        <Text style={[style.mainText]}>Visibility: {visibility}</Text>
        <Text style={[style.mainText]}>Dew point: {dewPoint}</Text>
      </View>
    </View>
  );
}
