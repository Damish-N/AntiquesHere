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
  Linking,
} from 'react-native';
import Colors from '../constants/Colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ButtonIconPapper from '../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import {white} from 'react-native-paper/lib/typescript/styles/colors';

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
  const {product, productId, disableFav} = route.params;
  return (
    <ScrollView>
      <Image source={{uri: product.imageUrl}} style={styles.image} />
      <View>
        {disableFav ? (
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
                        text: 'Okay Got it ',
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
        ) : (
          <Text> </Text>
        )}
        <Text style={styles.price}>Rs:{product.price}</Text>

        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <View style={styles.descriptionCard}>
            <Text style={styles.description1}>{product.description}</Text>
          </View>
        </View>

        <Text style={styles.description}>SELLING ID : {productId}</Text>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-around',
            marginVertical: 10,
          }}>
          <TouchableOpacity
            onPress={() => {
              console.log(product.contactNo);
              Linking.openURL('tel:' + product.contactNo).then(supported => {
                if (!supported) {
                  Alert.alert('Phone number is not available');
                } else {
                  return Linking.openURL('tel:' + product.contactNo);
                }
              });
            }}
            style={{
              width: '30%',
              backgroundColor: Colors.forthly,
              justifyContent: 'center',
              padding: 10,
              borderRadius: 10,
            }}>
            <Text style={{textAlign: 'center', color: Colors.thirdly}}>
              Call
            </Text>
            <Text style={{textAlign: 'center', color: Colors.thirdly}}>
              {product.contactNo}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              console.log(product.contactNo);
              Linking.openURL('sms:' + product.contactNo).then(supported => {
                if (!supported) {
                  Alert.alert('Phone number is not available');
                } else {
                  return Linking.openURL('sms:' + product.contactNo);
                }
              });
            }}
            style={{
              width: '30%',
              backgroundColor: Colors.forthly,
              justifyContent: 'center',
              padding: 10,
              borderRadius: 10,
            }}>
            <Text style={{textAlign: 'center', color: Colors.thirdly}}>
              Message
            </Text>
            <Text style={{textAlign: 'center', color: Colors.thirdly}}>
              {product.contactNo}
            </Text>
          </TouchableOpacity>
        </View>

        {/*{listFav.length > 0 ? (*/}
        {/*  listFav.map(e => <Text key={e}>{e}</Text>)*/}
        {/*) : (*/}
        {/*  <Text>no Data </Text>*/}
        {/*)}*/}
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
  description1: {
    textAlign: 'justify',
    fontSize: 18,
    paddingHorizontal: 15,
    color: '#595656',
  },
  description: {
    textAlign: 'center',
    fontSize: 18,
    paddingHorizontal: 15,
    color: '#595656',
  },
  btn: {
    marginVertical: 10,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
  },
  descriptionCard: {
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#d0cccc',
    padding: 4,
    width: '90%',
    // boxShadow:
    marginBottom: 10,
  },
});
