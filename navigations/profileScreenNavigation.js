import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Colors from '../constants/Colors';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import ProductDetailScreenView from '../screens/ProductDetailScreenView';
import FavouriteScreen from '../screens/FovouriteScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createStackNavigator();
const ProfileStackNavigation = () => {
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
        name="ProfileScreen"
        component={ProfileScreen}
        options={{title: 'Profile', headerLeft: () => null}}
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

export default ProfileStackNavigation;
