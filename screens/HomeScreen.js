import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

const HomeScreen = props => {
  return (
    <View>
      <Text>Home Screen</Text>
      <Button
        onPress={() => props.navigation.navigate('ProductDetails')}
        title=" Go to the Detail page"
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
