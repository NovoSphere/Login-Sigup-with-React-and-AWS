import React from 'react';
import { Provider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { theme } from './src/core/theme';
import {
  StartScreen,
  LoginScreen,
  RegisterScreen,
  ResetPasswordScreen,
  Dashboard,
  OTP
} from './src/screens';
import { AppRegistry } from 'react-native';
import { AuthProvider } from './context/AuthContext';

const Stack = createStackNavigator();

export default function MyApp() {
  return (
    <AuthProvider>
      <Provider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="StartScreen"
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="StartScreen" component={StartScreen} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="OTP" component={OTP} />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
            <Stack.Screen name="Dashboard" component={Dashboard} />
            <Stack.Screen
              name="ResetPasswordScreen"
              component={ResetPasswordScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </AuthProvider>
  );
}

AppRegistry.registerComponent('MyApp', () => MyApp);
