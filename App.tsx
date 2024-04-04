/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {useColorScheme} from 'react-native';
import {PaperProvider} from 'react-native-paper';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import Route from './src/routes/Route';
import {Provider} from 'react-redux';
import {store} from './src/reducers/store';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <Provider store={store}>
      <PaperProvider>
        <NavigationContainer>
          <Route />
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
}

export default App;
