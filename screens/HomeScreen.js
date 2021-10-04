import React, {useContext} from 'react';
import {Text, View} from 'react-native';
import {AuthContext} from '../navigations/authentication';

const HomeScreen = props => {
  const {user} = useContext(AuthContext);
  return (
    <View>
      <Text>Home Screen  {user.uid}</Text>
    </View>
  );
};

export default HomeScreen;
