import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import TabNavigationBar from './tabNaviagtionBar';
import DrawerContent from '../screens/DrawerContent';
const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen name="Home" component={TabNavigationBar} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
