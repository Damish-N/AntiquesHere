import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Colors from '../constants/Colors';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import ProductDetailScreenView from '../screens/ProductDetailScreenView';
import FavouriteScreen from '../screens/FovouriteScreen';
import { Icon } from 'react-native-elements'
import {Button, View} from "react-native";
import {IconButton} from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Stack = createStackNavigator();
const FavouriteStackNavigation = () => {
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
        name="FavouriteList"
        component={FavouriteScreen}
        options={{
          title: 'Favourite List',
          headerLeft: () => null,

        }}
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

export default FavouriteStackNavigation;
