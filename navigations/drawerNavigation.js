import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import TabNavigationBar from './tabNaviagtionBar';
import DrawerContent from '../screens/DrawerContent';
const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        drawerContent={props => <DrawerContent {...props} />}>
        <Drawer.Screen name="Home" component={TabNavigationBar} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default DrawerNavigation;
