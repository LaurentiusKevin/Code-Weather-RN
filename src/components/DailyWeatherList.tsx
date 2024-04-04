import {TouchableOpacity, View, Text} from 'react-native';
import {Icon} from 'react-native-paper';
import {colors, style} from '../styles';

export default function DailyWeatherList({
  day,
  temprature,
  icon,
}: {
  day: string;
  temprature: string;
  icon: string;
}) {
  return (
    <View>
      <TouchableOpacity style={{marginTop: 15}}>
        <View
          style={{
            flexDirection: 'row',
            gap: 15,
            marginBottom: 10,
            paddingHorizontal: 5,
            alignItems: 'center',
          }}>
          <Text style={[style.mainText, {flex: 1}]}>{day}</Text>
          <Text style={[style.mainText]}>{temprature}</Text>
          <Icon source={icon} size={25} />
          <Icon source="chevron-right" size={20} color={colors.gray[600]} />
        </View>
      </TouchableOpacity>
      <View
        style={{
          borderBottomWidth: 1,
          borderBottomColor: 'black',
          borderStyle: 'solid',
        }}
      />
    </View>
  );
}
