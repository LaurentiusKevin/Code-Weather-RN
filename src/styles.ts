import {StyleSheet} from 'react-native';

export const colors = {
  gray: {
    100: '#f5f5f5',
    200: '#eeeeee',
    300: '#e0e0e0',
    400: '#bdbdbd',
    500: '#9e9e9e',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
  },
};

export const style = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  mainText: {
    color: colors.gray[900],
    fontSize: 14,
    fontWeight: '400',
  },
  mainSubText: {
    color: colors.gray[700],
    fontSize: 12,
    fontWeight: '300',
  },
  heroTitle: {
    color: colors.gray[900],
    fontSize: 60,
  },
  box: {
    borderRadius: 10,
    margin: 10,
    padding: 10,
  },
});
