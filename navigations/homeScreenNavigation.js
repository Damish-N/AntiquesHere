import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import Colors from '../constants/Colors';

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
        options={{title: 'All products', headerLeft: () => null}}
      />
      <Stack.Screen
        name="ProductDetails"
        component={ProductDetailScreen}
        options={{title: 'products Deatials'}}
      />
    </Stack.Navigator>
  );
};

export default HomeStackNavigation;
