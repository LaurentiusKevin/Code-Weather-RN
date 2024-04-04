import {View, Text} from 'react-native';
import {Icon} from 'react-native-paper';
import {style} from '../styles';

export default function HomeSummary({
  icon,
  cloud,
  air,
  temprature,
  tempratureSecondary,
}: {
  icon: string;
  cloud?: number;
  air?: number;
  temprature?: number;
  tempratureSecondary?: number;
}) {
  return (
    <View
      style={{
        flexDirection: 'column',
        alignItems: 'center',
        paddingVertical: 20,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 10,
        }}>
        <Icon
          source={cloud || 0 > 10 ? 'weather-cloudy' : 'weather-sunny'}
          size={35}
        />
        <View
          style={{
            flexDirection: 'column',
          }}>
          <Text style={[style.mainText]}>Cloudines: {cloud}%</Text>
          <Text style={[style.mainSubText]}>{air} m/s</Text>
        </View>
      </View>
      <Text style={[style.heroTitle]}>
        {Math.round(temprature ?? 0)} &deg;C
      </Text>
      <Text
        style={[
          style.mainText,
          {
            paddingVertical: 5,
          },
        ]}>
        Feels like {Math.round(tempratureSecondary ?? 0) || 0} &deg;C
      </Text>
    </View>
  );
}
