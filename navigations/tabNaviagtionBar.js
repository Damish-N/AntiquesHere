import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeStackNavigation from '../navigations/homeScreenNavigation';
import ProductDetailScreen from '../screens/ProductDetailScreen';

const Tab = createBottomTabNavigator();

const TabNavigationBar = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeStackNavigation} />
        <Tab.Screen name="Detail" component={ProductDetailScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default TabNavigationBar;
