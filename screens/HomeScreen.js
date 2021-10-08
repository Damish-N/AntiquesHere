import React, {useContext, useEffect, useState} from 'react';
import {Text, View, AsyncStorage, FlatList, Button} from 'react-native';
import {AuthContext} from '../navigations/authentication';
import firestore from '@react-native-firebase/firestore';
const HomeScreen = props => {
  const {user} = useContext(AuthContext);
  const [userName, setuserName] = useState('');
  const [item, setItem] = useState([]);
  useEffect(() => {
    _retrieveData(); // unsubscribe on unmount
  }, []);

  useEffect(() => {
    firestore()
      .collection('Products')
      .onSnapshot(
        querySnapshot => {
          const list = [];
          querySnapshot.forEach(documentSnapshot => {
            console.log(documentSnapshot.data());
            list.push(documentSnapshot.data());
          });
          setItem(list);
        },
        error => {
          console.log(error);
        },
      );
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

  function added() {
    firestore().collection('Products').add({
      name: 'ball',
    });
    return undefined;
  }

  return (
    <View>
      <Text>Home Screen{userName} </Text>
      <Text>{item.toString()}</Text>
      <Button title={'Add it'} onPress={() => added()} />
    </View>
  );
};

export default HomeScreen;
