import {ScrollView} from 'react-native';
import {SegmentedButtons, Text} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import {NavigateProps} from '../interfaces/stack';
import {setUnit} from '../reducers/UnitSlice';
import {useAppSelector} from '../reducers/hooks';
import {style} from '../styles';

export default function SettingScreen(navigate: NavigateProps) {
  const unit = useAppSelector(state => state.unit.value);
  const dispatch = useDispatch();
  return (
    <ScrollView style={[style.container, {marginVertical: 10}]}>
      <Text style={style.mainText}>Select Unit</Text>
      <SegmentedButtons
        density="small"
        value={unit}
        onValueChange={value => dispatch(setUnit(value))}
        buttons={[
          {value: 'metric', label: 'Metric'},
          {value: 'standard', label: 'Standard'},
          {value: 'imperial', label: 'Imperial'},
        ]}
      />
    </ScrollView>
  );
}
