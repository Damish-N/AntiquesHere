import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
  Alert,
  Button,
  FlatList,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import FavouriteCard from '../components/FavouriteCard';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getProducts} from '../services/productApi';
import {Icon} from 'react-native-elements';
import async from 'async';

const FavouriteScreen = props => {
  const [key, setKey] = useState('');
  const [email, setEmail] = useState('');
  const [listFav, setListFav] = useState([]);
  const [post, setPosts] = useState([]);
  const [reload, setReaload] = useState(false);

  useEffect(() => {
    setPosts([]);
    _retrieveData();
  }, []);
  //
  useEffect(() => {
    // _getPostOfFavourite();
  });

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <View style={{marginRight: 20}}>
          <Icon
            name="refresh-outline"
            type="ionicon"
            color="white"
            onPress={() => {
              setPosts([]);
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
              _getPostOfFavourite(e);
            });
            setReaload(false);
            setListFav(list);
          }
        });
      });
    _getPostOfFavourite();
  };
  const _getPostOfFavourite = async e => {
    const posts = [];
    // if (listFav.length > 0) {
    // for (let i = 0; i < listFav.length; i++) {
    firestore()
      .collection('Products')
      .doc(e)
      .get()
      .then(documentSnapshot => {
        console.log('User exists: ', documentSnapshot.exists);

        if (documentSnapshot.exists) {
          console.log('User data: ', documentSnapshot.data());
          setPosts(prevState => [...prevState, documentSnapshot.data()]);
          // posts.push(documentSnapshot.data());
        }
      });
    // }
    // setPosts(posts);
    // }
  };

  function clickHere(k, index) {
    console.log('click the delete' + post[0].title.toString());
    // listFav.reduce()
    const deleteVal = listFav[index];
    const delPost = post.filter((p, indexNumber) => indexNumber != index);
    const delList = listFav.filter(p => p !== k);

    setPosts(delPost);
    setListFav(delList);
    _updateDetailes(deleteVal);
  }

  const _updateDetailes = async deleteValue => {
    // console.log({listFav});
    firestore()
      .collection('User')
      .doc(key)
      .update({
        listOfFav: firestore.FieldValue.arrayRemove(deleteValue),
      })
      .then(() => {
        // setLoadingUpdate(false);
        Alert.alert(
          'Added to Favourite',
          'Successfully added to favourite list',
          [
            {
              text: 'Okey',
              onPress: () => {
                console.log('okey');
              },
            },
          ],
        );
        console.log('User updated!');
      });
  };
  return (
    <View>
      <FlatList
        data={post}
        renderItem={r => (
          <FavouriteCard
            title={r.item.title}
            onClick={() => clickHere(listFav[r.index], r.index)}
          />
        )}
      />
      {/*<Button title={'get'} onPress={() => _getPostOfFavourite()} />*/}
    </View>
  );
};

export default FavouriteScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
