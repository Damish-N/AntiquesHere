import React, {useContext, useEffect, useState} from 'react';
import {Text, View, FlatList, Button} from 'react-native';
import {AuthContext} from '../navigations/authentication';
import firestore from '@react-native-firebase/firestore';
import ProductItem from '../components/ProductCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PRODUCTS from '../data/dummy-data';

const HomeScreen = props => {
  const {user} = useContext(AuthContext);
  const [userName, setUserName] = useState('');
  const [item, setItem] = useState([]);
  const [idList, setIdList] = useState([]);

  useEffect(() => {
    firestore()
      .collection('Products')
      .onSnapshot(
        querySnapshot => {
          const list = [];
          const idL = [];
          querySnapshot.forEach(documentSnapshot => {
            console.log(documentSnapshot.data().title);
            list.push(documentSnapshot.data());
            console.log(documentSnapshot.id);
            idL.push(documentSnapshot.id);
          });
          setItem(list);
          setIdList(idL);
        },
        error => {
          console.log(error);
        },
      );
  }, []);

  async function getProductSpeacial() {
    const citiesRef = await firestore().collection('Favourite');

    // Create a query against the collection
    const queryRef = citiesRef.where('email', '==', 'da@gmail.com');
    // [END firestore_query_filter_eq_string]

    const res = await queryRef.get();
    res.forEach(doc => {
      console.log(doc.id, ' => ', doc.email);
    });
  }

  const _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('@MySuperStore:key');
      if (value !== null) {
        // We have data!!
        let val = typeof value;
        let js = JSON.parse(value);
        console.log(js.user.email);
        setUserName(js.user.email);
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  function added() {
    // var rootRef = firestore().collection('Products').ref();
    // CollectionReference Parent => new CollectionReference(_proxy.Parent(), Firestore)
    // console.log(CollectionRe);
    firestore().collection('Favourite').add({
      email: 'd@gmail.com',
      listOfFav: [],
    });
    // return undefined;
  }

  return (
    <View>
      {/*<Button title={'added'} onPress={getProductSpeacial} />*/}
      {/*<Button title={'added2'} onPress={added} />*/}
      <FlatList
        data={item}
        renderItem={itemData => (
          <ProductItem
            image={
              itemData.item.imageUrl
                ? itemData.item.imageUrl
                : 'data:image/jpeg;base64,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'
            }
            title={itemData.item.title ? itemData.item.title : 'no name'}
            price={itemData.item.price ? itemData.item.price : 6000.0}
            onViewDetail={() => {
              props.navigation.navigate('ProductDetailScreenView', {
                product: itemData.item,
                productId: idList[itemData.index],
                disableFav: true,
              });
              // {
              //     productId: itemData.item.id,
              //     productTitle: itemData.item.title,
              //     product: itemData.item,
              console.log('Hello');
              // }
            }}
            onAddToCart={() => {
              console.log(idList[itemData.index]);
            }}
          />
        )}
      />
    </View>
  );
};

export default HomeScreen;
