import React, {useContext, useEffect, useState} from 'react';
import {Text, View, AsyncStorage} from 'react-native';
import {AuthContext} from '../navigations/authentication';

const HomeScreen = props => {
  const {user} = useContext(AuthContext);
  const [userName, setuserName] = useState('');
  //    {
  //      user.uid;
  //    }
  useEffect(() => {
    _retrieveData(); // unsubscribe on unmount
  }, []);
  const _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('@MySuperStore:key');
      if (value !== null) {
        // We have data!!
        let val = typeof value;
        let js = JSON.parse(value);
        console.log(js.user.email);
        setuserName(js.user.email);
      }
    } catch (error) {
      // Error retrieving data
    }
  };
  return (
    <View>
      <Text>Home Screen{userName} </Text>
    </View>
  );
};

export default HomeScreen;
