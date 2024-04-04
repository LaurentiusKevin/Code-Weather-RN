import Geolocation from '@react-native-community/geolocation';
import {useEffect, useMemo, useState} from 'react';
import {Dimensions, ScrollView, View} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import {Text} from 'react-native-paper';
import getWeather from '../api/weather';
import DailyWeatherList from '../components/DailyWeatherList';
import HomeDetail from '../components/HomeDetail';
import HomeHeader from '../components/HomeHeader';
import HomeSummary from '../components/HomeSummary';
import Weather from '../components/Weather';
import {NavigateProps} from '../interfaces/stack';
import {Minutely, WeatherResponse} from '../interfaces/weather';
import {useAppSelector} from '../reducers/hooks';
import {colors, style} from '../styles';
import {convertDate, convertTime} from '../utils/dateUtils';

export default function HomeScreen(navigate: NavigateProps) {
  const unit = useAppSelector(state => state.unit.value);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentLocation, setCurrentLocation] = useState<
    {lat: number; long: number} | undefined
  >();
  const [weatherInfo, setWeatherInfo] = useState<WeatherResponse>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const precipitation = useMemo(() => {
    let preci = 0;
    let total = 0;
    weatherInfo?.minutely?.forEach(item => {
      preci += item.precipitation;
      total++;
    });

    return preci / total;
  }, [weatherInfo]);

  const windDeg = useMemo(() => {
    if (weatherInfo) {
      switch (true) {
        case weatherInfo.current.wind_deg === 0:
          return 'N';

        case weatherInfo.current.wind_deg > 0 &&
          weatherInfo.current.wind_deg < 90:
          return 'NE';

        case weatherInfo.current.wind_deg === 90:
          return 'E';

        case weatherInfo.current.wind_deg > 90 &&
          weatherInfo.current.wind_deg < 180:
          return 'SE';

        case weatherInfo.current.wind_deg === 180:
          return 'S';

        case weatherInfo.current.wind_deg > 180 &&
          weatherInfo.current.wind_deg < 270:
          return 'SW';

        case weatherInfo.current.wind_deg === 270:
          return 'W';

        default:
          return 'NE';
      }
    }
    return '';
  }, [weatherInfo]);

  const weather = async () => {
    const weather = await getWeather({
      lat: currentLocation?.lat || -6.98,
      lon: currentLocation?.long || 110.41,
      unit: unit,
    });
    setWeatherInfo(weather);
    setIsLoading(false);
  };

  const precipitationHourly = (weatherMinutely: Minutely[]) => {
    let precipitation: {hour: string; precipitation: number}[] = [];

    weatherMinutely.forEach(item => {
      const hour = new Date(item.dt * 1000);
      if (
        precipitation[precipitation.length - 1]?.hour !==
        String(hour.getHours()).padStart(2, '0')
      ) {
        precipitation.push({
          hour: String(hour.getHours()).padStart(2, '0'),
          precipitation: item.precipitation,
        });
      } else {
        precipitation[precipitation.length - 1].precipitation +=
          item.precipitation;
        precipitation[precipitation.length - 1].precipitation /= 2;
      }
    });

    return precipitation;
  };

  const isPrecipitationExists = (weatherMinutely: Minutely[]) => {
    let hourlyData = precipitationHourly(weatherMinutely);
    return hourlyData[hourlyData.length - 1].precipitation;
  };

  const initLocation = () => {
    setIsLoading(true);
    Geolocation.getCurrentPosition(info => {
      setCurrentLocation({
        lat: info.coords.latitude,
        long: info.coords.longitude,
      });
    });
  };

  useEffect(() => {
    initLocation();
  }, []);

  useEffect(() => {
    if (currentLocation) {
      weather();
    }
  }, [currentLocation]);

  return (
    <View>
      <HomeHeader
        navigate={navigate}
        currentLocation={currentLocation}
        reloadLocation={initLocation}
        isLoading={isLoading}
      />
      <ScrollView>
        <HomeSummary
          icon="weather-sunny"
          cloud={weatherInfo?.current.clouds}
          air={weatherInfo?.current.wind_speed}
          temprature={weatherInfo?.current.temp}
          tempratureSecondary={weatherInfo?.current.feels_like}
        />
        <View
          style={[
            style.container,
            {flexDirection: 'column', alignItems: 'center'},
          ]}>
          {weatherInfo && (
            <Text style={style.mainText}>
              {isPrecipitationExists(weatherInfo.minutely) > 0
                ? isPrecipitationExists(weatherInfo.minutely) + ' precipitation'
                : 'No precipitation within an hour'}
            </Text>
          )}
          {weatherInfo && (
            <LineChart
              data={{
                labels: precipitationHourly(weatherInfo.minutely).map(
                  item => item.hour,
                ),
                datasets: [
                  {
                    data: precipitationHourly(weatherInfo.minutely).map(
                      item => item.precipitation,
                    ),
                  },
                ],
              }}
              width={Dimensions.get('window').width - 40} // from react-native
              height={100}
              yAxisInterval={1} // optional, defaults to 1
              chartConfig={{
                // backgroundColor: colors.gray[900],
                backgroundGradientFrom: colors.gray[200],
                backgroundGradientTo: colors.gray[200],
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 1) => colors.gray[900],
                labelColor: (opacity = 1) => colors.gray[800],
                style: {
                  borderRadius: 16,
                },
              }}
              bezier
              style={{
                // marginVertical: 8,
                borderRadius: 16,
              }}
            />
          )}
        </View>
        {weatherInfo && (
          <HomeDetail
            wind={weatherInfo.current.wind_speed + 'km/h ' + windDeg}
            humidity={weatherInfo.current.humidity + '%'}
            uvIndex={weatherInfo.current.uvi}
            pressure={weatherInfo.current.pressure + 'inHg'}
            visibility={weatherInfo.current.visibility / 1000 + 'km'}
            dewPoint={`${weatherInfo.current.dew_point} °C`}
          />
        )}
        <View style={[style.container]}>
          <ScrollView horizontal>
            {weatherInfo?.hourly.map((item, key) => (
              <Weather
                key={key}
                direction="column"
                hour={convertTime(item.dt)}
                temprature={Math.round(item.temp) + '°C'}
                icon="cloudy"
              />
            ))}
          </ScrollView>
        </View>
        <View style={{marginHorizontal: 10, marginTop: 10}}>
          {weatherInfo?.daily.map((item, key) => (
            <DailyWeatherList
              key={key}
              day={convertDate(item.dt)}
              temprature={
                Math.round(item.temp.min) +
                '/' +
                Math.round(item.temp.max) +
                ' °C'
              }
              icon="weather-sunny"
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
