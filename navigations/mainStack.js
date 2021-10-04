import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SignUpScreen from '../screens/SignUpScreen';
import SignInScreen from '../screens/SignInScreen';
import DrawerNavigation from './drawerNavigation';
const Stack = createStackNavigator();

const MainStack = props => {
  return (
    <Stack.Navigator
      initialRouteName={props.intialPage}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{headerBackVisible: false}}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{headerBackVisible: false}}
      />
      <Stack.Screen
        name="HomePageScreen"
        component={DrawerNavigation}
        options={{headerBackVisible: false}}
      />
    </Stack.Navigator>
  );
};
export default MainStack;
