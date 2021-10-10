import React, {useEffect, useLayoutEffect, useState} from 'react';
import {Button, FlatList, ScrollView, StyleSheet, View} from 'react-native';
import FavouriteCard from '../components/FavouriteCard';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getProducts} from '../services/productApi';
import {Icon} from 'react-native-elements';

const FavouriteScreen = props => {
  const [key, setKey] = useState('');
  const [email, setEmail] = useState('');
  const [listFav, setListFav] = useState([]);
  const [reload, setReaload] = useState(false);

  useEffect(() => {
    _retrieveData();
  }, []);

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <View style={{marginRight: 20}}>
          <Icon
            name="refresh-outline"
            type="ionicon"
            color="white"
            onPress={() => {
              _retrieveData();
            }}
          />
        </View>
        // <MaterialCommunityIcons name={}
      ),
    });
  });
  const _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('userName');
      if (value !== null) {
        // We have data!!
        let val = typeof value;
        let js = JSON.parse(value);
        console.log('user name:1 ', js.user.email);
        setEmail(js.user.email);
        _getId(js.user.email);
        // console.log(c);
      }
    } catch (error) {
      console.log(error);
      // Error retrieving data
    }
  };
  const _getId = async e => {
    const list = [];
    let l;
    console.log('email is', e);
    firestore()
      .collection('User')
      .where('email', '==', e)
      .get()
      .then(querySnapshot => {
        console.log('Total users:', querySnapshot.size);

        querySnapshot.forEach(documentSnapshot => {
          console.log(
            'User ID: ',
            documentSnapshot.id,
            documentSnapshot.data(),
          );
          setKey(documentSnapshot.id);
          if (documentSnapshot.data().listOfFav.length > 0) {
            documentSnapshot.data().listOfFav.forEach(e => {
              list.push(e);
            });
            setReaload(false);
            setListFav(list);
          }
        });
      });
  };
  return (
    <View>
      <FlatList data={listFav} renderItem={r => <FavouriteCard />} />
    </View>
  );
};

export default FavouriteScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
