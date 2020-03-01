import 'react-native-gesture-handler';
import * as React from 'react';

import {PersonListScreen, PersonScreen} from './сomponents'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Hall of Fame">
        <Stack.Screen name="Hall of Fame" component={PersonListScreen} />
        <Stack.Screen name="Person" component={PersonScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;