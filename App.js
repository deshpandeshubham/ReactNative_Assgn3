import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import QuizScreen from './screens/QuizScreen';

const Stack = createStackNavigator();
class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="HomeScreen">
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="QuizScreen" component={QuizScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;