import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Drawer} from 'react-native-paper';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';

const DrawerContent = props => {
  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <View>
          <Text>Main Content</Text>
        </View>

        <Drawer.Section>
          <DrawerItem
            label="Home"
            onPress={() => {
              props.navigation.navigate('HomeScreen');
            }}
          />
          <DrawerItem
            label="Detail"
            onPress={() => {
              props.navigation.navigate('ProductDetails');
            }}
          />
        </Drawer.Section>
        <Drawer.Section>
          <DrawerItem label="Sign Out" />
        </Drawer.Section>
      </DrawerContentScrollView>
    </View>
  );
};

export default DrawerContent;

const styles = StyleSheet.create({});
