import React from 'react';
import {Button, Text, View} from 'react-native';

const SignInScreen = props => {
  return (
    <View>
      <Text>Sign In Page</Text>
      <Button
        title="Login"
        onPress={() => {
          props.navigation.replace('HomePageScreen');
        }}
      />
    </View>
  );
};

export default SignInScreen;
