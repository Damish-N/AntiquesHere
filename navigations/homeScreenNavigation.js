import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import Colors from '../constants/Colors';
import ProductDetailScreenView from '../screens/ProductDetailScreenView';

const Stack = createStackNavigator();

const HomeStackNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.primary,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{title: 'All Antiques', headerLeft: () => null}}
      />
      <Stack.Screen
        name="ProductDetails"
        component={ProductDetailScreen}
        options={{title: 'products Details'}}
      />
      <Stack.Screen
        name={'ProductDetailScreenView'}
        component={ProductDetailScreenView}
        options={{title: 'products Details'}}
      />
    </Stack.Navigator>
  );
};

export default HomeStackNavigation;
