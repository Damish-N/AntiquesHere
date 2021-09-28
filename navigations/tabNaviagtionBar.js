import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeStackNavigation from '../navigations/homeScreenNavigation';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import Colors from '../constants/Colors';
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
        name="Detail"
        component={ProductDetailScreen}
        options={{
          tabBarLabel: 'Detail',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="details" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="favourite"
        component={ProductDetailScreen}
        options={{
          tabBarLabel: 'Favourite',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="star" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="profile"
        component={ProductDetailScreen}
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
