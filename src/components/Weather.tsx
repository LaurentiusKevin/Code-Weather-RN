import {View} from 'react-native';
import {Icon, Text} from 'react-native-paper';
import {style} from '../styles';
import {useMemo} from 'react';

export default function Weather({
  direction,
  hour,
  temprature,
  icon,
}: {
  direction?: 'column' | 'row';
  hour?: string;
  temprature?: number | string;
  icon?: 'cloudy' | 'sunny' | 'rain';
}) {
  const weatherIcon = useMemo(() => {
    switch (icon) {
      case 'cloudy':
        return 'weather-rainy';

      case 'sunny':
        return 'weather-sunny';

      case 'rain':
        return 'weather-lightning-rain';
    }
  }, [icon]);

  return (
    <View
      style={{
        flexDirection: direction || 'row',
        alignItems: 'center',
        gap: 5,
        marginRight: 20,
      }}>
      {hour && <Text style={[style.mainSubText]}>{hour}</Text>}
      {icon && <Icon source={weatherIcon} size={40} />}
      {temprature && <Text style={[style.mainText]}>{temprature}</Text>}
    </View>
  );
}
