import React, {useEffect, useState} from 'react';
import {
  Alert,
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Colors from '../constants/Colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ButtonIconPapper from '../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';

const ProductDetailsView = ({route}) => {
  const [key, setKey] = useState('');
  const [email, setEmail] = useState('');
  const [listFav, setListFav] = useState([]);

  useEffect(() => {
    _retrieveData();
  }, []);

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
            setListFav(list);
          }
        });
      });
  };
  const _updateDetailes = async => {
    // console.log({listFav});
    firestore()
      .collection('User')
      .doc(key)
      .update({
        listOfFav: [...listFav, productId],
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
  const {product, productId} = route.params;
  return (
    <ScrollView>
      <Image source={{uri: product.imageUrl}} style={styles.image} />
      <View>
        <View style={styles.btn}>
          <Button
            color={Colors.primary}
            title="Add to favourite"
            onPress={() => {
              console.log('Unable to add favourite');
              if (listFav.includes(productId)) {
                Alert.alert(
                  'Unable to add favourite',
                  'Already Exits in the favourite list ',
                  [
                    {
                      text: 'yes',
                      onPress: () => {
                        console.log('okey');
                      },
                    },
                  ],
                );
              } else {
                setListFav(prevState => [...prevState, productId]);
                console.log(listFav);
                _updateDetailes();
              }
            }}
            style={styles.btn}
          />
        </View>
        <Text style={styles.price}>Rs:{product.price}</Text>
        <Text style={styles.description}>{product.description}</Text>
        <Text style={styles.description}>{productId}</Text>
        {listFav.length > 0 ? (
          listFav.map(e => <Text key={e}>{e}</Text>)
        ) : (
          <Text>no Data </Text>
        )}
      </View>
      <View>
        {/*<TouchableOpacity>*/}
        {/*  <ButtonIconPapper iconName={'call'} detail={product.contactNo.toString()}/>*/}
        {/*</TouchableOpacity>*/}
      </View>
    </ScrollView>
  );
};

export default ProductDetailsView;

ProductDetailsView.navigationOptions = data => {
  var d = data.navigation.getParms('productId');
};

const styles = StyleSheet.create({
  image: {width: '100%', height: 300},
  price: {
    textAlign: 'center',
    fontSize: 21,
    color: 'black',
    marginVertical: 10,
  },
  description: {
    textAlign: 'center',
    fontSize: 18,
    paddingHorizontal: 15,
    color: '#888',
  },
  btn: {
    marginVertical: 10,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
  },
});
