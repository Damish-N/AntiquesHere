import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeStackNavigation from '../navigations/homeScreenNavigation';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import Colors from '../constants/Colors';
import FavouriteStackNavigation from './favouritScreenNavigation';
import ProfileStackNavigation from './profileScreenNavigation';
const Tab = createMaterialBottomTabNavigator();

const TabNavigationBar = () => {
  return (
    <Tab.Navigator
      activeColor="#f0edf6"
      barStyle={{backgroundColor: Colors.primary}}>
      <Tab.Screen
        name="Home"
        component={HomeStackNavigation}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="AddNewProduct"
        component={ProductDetailScreen}
        options={{
          tabBarLabel: 'add new',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="plus-circle"
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="favourite"
        component={FavouriteStackNavigation}
        options={{
          tabBarLabel: 'Favourite',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="star" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="profile"
        component={ProfileStackNavigation}
        options={{
          tabBarLabel: 'profile',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigationBar;
